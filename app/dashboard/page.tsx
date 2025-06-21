"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreVertical, FileText, Folder, Star, Clock, User, Settings, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Dynamically import Three.js components to avoid SSR issues
const DashboardScene = dynamic(() => import("@/components/DashboardScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-purple-900/10 animate-pulse" />
})

interface Note {
  id: string
  title: string
  content: string
  category: string
  createdAt: string
  starred: boolean
}



export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Welcome to NexusApp",
      content: "This is your first note in the 3D productivity space. Start creating amazing content!",
      category: "Personal",
      createdAt: "2024-01-15",
      starred: true,
    },
    {
      id: "2",
      title: "Project Ideas",
      content: "Brainstorming session for the next big project. Think about innovative solutions.",
      category: "Work",
      createdAt: "2024-01-14",
      starred: false,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newNote, setNewNote] = useState({ title: "", content: "", category: "Personal" })

  const categories = ["All", "Personal", "Work", "Ideas", "Projects"]

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || note.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateNote = () => {
    if (newNote.title.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        category: newNote.category,
        createdAt: new Date().toISOString().split("T")[0],
        starred: false,
      }
      setNotes([note, ...notes])
      setNewNote({ title: "", content: "", category: "Personal" })
      setShowCreateModal(false)
    }
  }

  const toggleStar = (id: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, starred: !note.starred } : note)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-10">
        <DashboardScene />
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 z-20">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">NexusApp</span>
          </div>

          <nav className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <Folder className="w-4 h-4 inline mr-2" />
                {category}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                <User className="w-4 h-4 mr-2" />
                John Doe
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/80 backdrop-blur-lg border-white/20">
              <DropdownMenuItem className="text-white hover:bg-white/10">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-300">Manage your notes in 3D space</p>
          </div>

          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note, index) => (
            <Card
              key={note.id}
              className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg">{note.title}</CardTitle>
                  <CardDescription className="text-gray-300 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {note.createdAt}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => toggleStar(note.id)}
                    className={`p-1 rounded ${note.starred ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"}`}
                  >
                    <Star className="w-4 h-4" fill={note.starred ? "currentColor" : "none"} />
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black/80 backdrop-blur-lg border-white/20">
                      <DropdownMenuItem className="text-white hover:bg-white/10">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-white/10">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-3 line-clamp-3">{note.content}</p>
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                  {note.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Note Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Create New Note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Note title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Textarea
                placeholder="Write your note content..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
              />
              <select
                value={newNote.category}
                onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                className="w-full p-2 rounded-md bg-white/10 border border-white/20 text-white"
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Ideas">Ideas</option>
                <option value="Projects">Projects</option>
              </select>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateNote}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Create
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
