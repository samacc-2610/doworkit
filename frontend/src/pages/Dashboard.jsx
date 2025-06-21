"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Float, Environment, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { Plus, Search, Settings, Bell, User, LogOut, Folder, FileText, Star, Clock, MoreHorizontal } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useWorkspace } from "../contexts/WorkspaceContext"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "../components/ui/Toaster"

function FloatingOrbs() {
  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.5}>
        <Sphere args={[0.5, 32, 32]} position={[-3, 2, -2]}>
          <MeshDistortMaterial color="#8b5cf6" attach="material" distort={0.4} speed={1.5} roughness={0} />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={2}>
        <Sphere args={[0.3, 32, 32]} position={[3, -1, -1]}>
          <MeshDistortMaterial color="#ec4899" attach="material" distort={0.6} speed={2} roughness={0.1} />
        </Sphere>
      </Float>

      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={3}>
        <Text fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle" position={[0, 0, 0]}>
          Your Workspace
        </Text>
      </Float>
    </group>
  )
}

function DashboardScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <FloatingOrbs />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  )
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { workspaces, pages, createWorkspace, createPage, loading } = useWorkspace()
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createType, setCreateType] = useState("workspace") // "workspace" or "page"
  const [formData, setFormData] = useState({ name: "", description: "" })
  const [selectedWorkspace, setSelectedWorkspace] = useState(null)

  useEffect(() => {
    if (workspaces.length > 0 && !selectedWorkspace) {
      setSelectedWorkspace(workspaces[0])
    }
  }, [workspaces, selectedWorkspace])

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      toast.success("Logged out successfully!")
      navigate("/")
    }
  }

  const handleCreate = async () => {
    if (!formData.name.trim()) return

    try {
      let result
      if (createType === "workspace") {
        result = await createWorkspace(formData.name, formData.description)
      } else {
        result = await createPage(formData.name, selectedWorkspace?.id)
      }

      if (result.success) {
        toast.success(`${createType === "workspace" ? "Workspace" : "Page"} created successfully!`)
        setShowCreateModal(false)
        setFormData({ name: "", description: "" })
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.content?.blocks?.some((block) => block.content?.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <DashboardScene />
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed left-0 top-0 h-full w-80 bg-black/20 backdrop-blur-2xl border-r border-white/10 z-20 overflow-y-auto"
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Nexus Notion</span>
          </div>

          {/* User Profile */}
          <div className="bg-white/5 rounded-2xl p-4 mb-6 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">{user?.displayName}</p>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 text-gray-300 hover:text-white py-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3 mb-8">
            <button
              onClick={() => {
                setCreateType("workspace")
                setShowCreateModal(true)
              }}
              className="w-full flex items-center space-x-3 text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-300 group"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span>New Workspace</span>
            </button>

            <button
              onClick={() => {
                setCreateType("page")
                setShowCreateModal(true)
              }}
              disabled={!selectedWorkspace}
              className="w-full flex items-center space-x-3 text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span>New Page</span>
            </button>
          </div>

          {/* Workspaces */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Folder className="w-4 h-4 mr-2" />
              Workspaces
            </h3>
            <div className="space-y-2">
              {workspaces.map((workspace) => (
                <motion.button
                  key={workspace.id}
                  onClick={() => setSelectedWorkspace(workspace)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                    selectedWorkspace?.id === workspace.id
                      ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30"
                      : "hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{workspace.icon}</span>
                    <div className="flex-1">
                      <p className="text-white font-medium">{workspace.name}</p>
                      <p className="text-gray-400 text-sm">{workspace.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Recent Pages */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Recent Pages
            </h3>
            <div className="space-y-2">
              {pages.slice(0, 5).map((page) => (
                <Link
                  key={page.id}
                  to={`/page/${page.id}`}
                  className="block p-3 hover:bg-white/10 rounded-xl transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{page.icon}</span>
                    <div className="flex-1">
                      <p className="text-white font-medium group-hover:text-purple-300 transition-colors">
                        {page.title}
                      </p>
                      <p className="text-gray-400 text-sm">{new Date(page.updatedAt?.toDate()).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="ml-80 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 border-b border-white/10 backdrop-blur-sm"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {selectedWorkspace ? selectedWorkspace.name : "Dashboard"}
              </h1>
              <p className="text-gray-300">
                {selectedWorkspace ? selectedWorkspace.description : "Welcome to your 3D workspace"}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-3 hover:bg-white/10 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
              <button className="p-3 hover:bg-white/10 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Pages Grid */}
        <div className="p-6">
          {filteredPages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPages.map((page, index) => (
                <motion.div
                  key={page.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Link to={`/page/${page.id}`}>
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{page.icon}</span>
                          <div>
                            <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                              {page.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {new Date(page.updatedAt?.toDate()).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/10 rounded-lg transition-all duration-300">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>

                      <div className="text-gray-300 text-sm line-clamp-3">
                        {page.content?.blocks?.[0]?.content || "No content yet..."}
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-400 text-sm">You</span>
                        </div>
                        <Star className="w-4 h-4 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{searchTerm ? "No pages found" : "No pages yet"}</h3>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                {searchTerm
                  ? "Try adjusting your search terms or create a new page"
                  : "Create your first page to start building your knowledge base"}
              </p>
              <button
                onClick={() => {
                  setCreateType("page")
                  setShowCreateModal(true)
                }}
                disabled={!selectedWorkspace}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Your First Page
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Create New {createType === "workspace" ? "Workspace" : "Page"}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    {createType === "workspace" ? "Workspace" : "Page"} Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={`Enter ${createType} name`}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  />
                </div>

                {createType === "workspace" && (
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Description (Optional)</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter workspace description"
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                      rows={3}
                    />
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={handleCreate}
                    disabled={!formData.name.trim() || loading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Creating..." : "Create"}
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateModal(false)
                      setFormData({ name: "", description: "" })
                    }}
                    className="flex-1 border border-white/20 text-white hover:bg-white/10 py-4 rounded-xl font-semibold transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
