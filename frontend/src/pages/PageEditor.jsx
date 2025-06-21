"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Text, Environment, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { doc, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase"
import { useAuth } from "../contexts/AuthContext"
import {
  ArrowLeft,
  Share,
  MoreHorizontal,
  Type,
  ImageIcon,
  List,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Plus,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "../components/ui/Toaster"

function FloatingText3D() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <Text fontSize={0.3} color="#8b5cf6" anchorX="center" anchorY="middle" position={[0, 0, 0]}>
        Create
      </Text>
    </Float>
  )
}

function EditorScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <FloatingText3D />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <Sphere args={[0.3, 32, 32]} position={[-2, 1, -1]}>
          <MeshDistortMaterial color="#ec4899" attach="material" distort={0.3} speed={1} roughness={0} />
        </Sphere>
      </Float>
      <Environment preset="dawn" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </Canvas>
  )
}

const BlockTypes = {
  PARAGRAPH: "paragraph",
  HEADING1: "heading1",
  HEADING2: "heading2",
  HEADING3: "heading3",
  BULLET_LIST: "bullet_list",
  NUMBERED_LIST: "numbered_list",
  QUOTE: "quote",
  CODE: "code",
  IMAGE: "image",
}

export default function PageEditor() {
  const { pageId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [page, setPage] = useState(null)
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeBlock, setActiveBlock] = useState(null)
  const [showBlockMenu, setShowBlockMenu] = useState(false)
  const [blockMenuPosition, setBlockMenuPosition] = useState({ x: 0, y: 0 })

  const editorRef = useRef(null)
  const saveTimeoutRef = useRef(null)

  // Listen to page changes
  useEffect(() => {
    if (!pageId) return

    const unsubscribe = onSnapshot(doc(db, "pages", pageId), (doc) => {
      if (doc.exists()) {
        const pageData = { id: doc.id, ...doc.data() }
        setPage(pageData)
        setBlocks(pageData.content?.blocks || [])
      }
      setLoading(false)
    })

    return unsubscribe
  }, [pageId])

  // Auto-save functionality
  const saveContent = async () => {
    if (!page || !user) return

    setSaving(true)
    try {
      await updateDoc(doc(db, "pages", pageId), {
        content: { blocks },
        updatedAt: serverTimestamp(),
      })
    } catch (error) {
      toast.error("Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  // Debounced save
  const debouncedSave = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    saveTimeoutRef.current = setTimeout(saveContent, 1000)
  }

  useEffect(() => {
    if (blocks.length > 0) {
      debouncedSave()
    }
  }, [blocks])

  const updateBlock = (blockId, updates) => {
    setBlocks((prev) => prev.map((block) => (block.id === blockId ? { ...block, ...updates } : block)))
  }

  const addBlock = (type = BlockTypes.PARAGRAPH, afterBlockId = null) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      content: "",
      properties: {},
    }

    if (afterBlockId) {
      const index = blocks.findIndex((block) => block.id === afterBlockId)
      setBlocks((prev) => [...prev.slice(0, index + 1), newBlock, ...prev.slice(index + 1)])
    } else {
      setBlocks((prev) => [...prev, newBlock])
    }

    setActiveBlock(newBlock.id)
    setShowBlockMenu(false)
  }

  const deleteBlock = (blockId) => {
    setBlocks((prev) => prev.filter((block) => block.id !== blockId))
  }

  const handleKeyDown = (e, blockId) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      addBlock(BlockTypes.PARAGRAPH, blockId)
    } else if (e.key === "Backspace") {
      const block = blocks.find((b) => b.id === blockId)
      if (block && block.content === "") {
        e.preventDefault()
        deleteBlock(blockId)
      }
    } else if (e.key === "/" && e.target.value === "") {
      e.preventDefault()
      setShowBlockMenu(true)
      const rect = e.target.getBoundingClientRect()
      setBlockMenuPosition({ x: rect.left, y: rect.bottom })
    }
  }

  const renderBlock = (block) => {
    const commonProps = {
      value: block.content,
      onChange: (e) => updateBlock(block.id, { content: e.target.value }),
      onKeyDown: (e) => handleKeyDown(e, block.id),
      onFocus: () => setActiveBlock(block.id),
      className:
        "w-full bg-transparent border-none outline-none resize-none text-white placeholder-gray-400 leading-relaxed",
      placeholder: getPlaceholder(block.type),
    }

    switch (block.type) {
      case BlockTypes.HEADING1:
        return <input {...commonProps} className={`${commonProps.className} text-4xl font-bold mb-4`} />
      case BlockTypes.HEADING2:
        return <input {...commonProps} className={`${commonProps.className} text-3xl font-semibold mb-3`} />
      case BlockTypes.HEADING3:
        return <input {...commonProps} className={`${commonProps.className} text-2xl font-medium mb-2`} />
      case BlockTypes.QUOTE:
        return (
          <div className="border-l-4 border-purple-500 pl-4 my-4">
            <textarea
              {...commonProps}
              className={`${commonProps.className} italic text-gray-300`}
              rows={1}
              style={{ minHeight: "1.5rem" }}
            />
          </div>
        )
      case BlockTypes.CODE:
        return (
          <div className="bg-gray-900 rounded-lg p-4 my-4 font-mono">
            <textarea {...commonProps} className={`${commonProps.className} font-mono text-green-400`} rows={3} />
          </div>
        )
      case BlockTypes.BULLET_LIST:
        return (
          <div className="flex items-start space-x-3 my-2">
            <span className="text-white mt-2">•</span>
            <textarea {...commonProps} rows={1} style={{ minHeight: "1.5rem" }} />
          </div>
        )
      case BlockTypes.NUMBERED_LIST:
        const index = blocks.filter((b) => b.type === BlockTypes.NUMBERED_LIST).indexOf(block) + 1
        return (
          <div className="flex items-start space-x-3 my-2">
            <span className="text-white mt-2">{index}.</span>
            <textarea {...commonProps} rows={1} style={{ minHeight: "1.5rem" }} />
          </div>
        )
      default:
        return (
          <textarea
            {...commonProps}
            rows={1}
            style={{ minHeight: "1.5rem" }}
            className={`${commonProps.className} my-2`}
          />
        )
    }
  }

  const getPlaceholder = (type) => {
    switch (type) {
      case BlockTypes.HEADING1:
        return "Heading 1"
      case BlockTypes.HEADING2:
        return "Heading 2"
      case BlockTypes.HEADING3:
        return "Heading 3"
      case BlockTypes.QUOTE:
        return "Quote"
      case BlockTypes.CODE:
        return "Code"
      case BlockTypes.BULLET_LIST:
        return "List item"
      case BlockTypes.NUMBERED_LIST:
        return "List item"
      default:
        return "Type '/' for commands"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading page...</div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Page not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-10">
        <EditorScene />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-6 border-b border-white/10 backdrop-blur-sm"
      >
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{page.icon}</span>
              <input
                value={page.title}
                onChange={(e) => updateBlock("title", { content: e.target.value })}
                className="text-2xl font-bold text-white bg-transparent border-none outline-none"
                placeholder="Untitled"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              {saving ? (
                <>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Saved</span>
                </>
              )}
            </div>

            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Share className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>

            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Editor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 max-w-4xl mx-auto p-6"
        ref={editorRef}
      >
        <div className="space-y-2">
          {blocks.map((block) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`group relative ${activeBlock === block.id ? "ring-1 ring-purple-500/50 rounded-lg" : ""}`}
            >
              {renderBlock(block)}

              {/* Block Actions */}
              <div className="absolute left-0 top-0 -ml-12 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    setShowBlockMenu(true)
                    const rect = editorRef.current.getBoundingClientRect()
                    setBlockMenuPosition({ x: rect.left, y: rect.top })
                  }}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </motion.div>
          ))}

          {blocks.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Start writing</h3>
              <p className="text-gray-400 mb-4">Type '/' to see all available blocks</p>
              <button
                onClick={() => addBlock()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Add your first block
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Block Menu */}
      <AnimatePresence>
        {showBlockMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed z-50 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-2xl"
            style={{
              left: blockMenuPosition.x,
              top: blockMenuPosition.y,
            }}
          >
            <div className="space-y-1">
              {[
                { type: BlockTypes.PARAGRAPH, icon: Type, label: "Text" },
                { type: BlockTypes.HEADING1, icon: Heading1, label: "Heading 1" },
                { type: BlockTypes.HEADING2, icon: Heading2, label: "Heading 2" },
                { type: BlockTypes.HEADING3, icon: Heading3, label: "Heading 3" },
                { type: BlockTypes.BULLET_LIST, icon: List, label: "Bullet List" },
                { type: BlockTypes.NUMBERED_LIST, icon: List, label: "Numbered List" },
                { type: BlockTypes.QUOTE, icon: Quote, label: "Quote" },
                { type: BlockTypes.CODE, icon: Code, label: "Code" },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => addBlock(item.type)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-white/10 rounded-lg transition-colors text-white"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close menu */}
      {showBlockMenu && <div className="fixed inset-0 z-40" onClick={() => setShowBlockMenu(false)} />}
    </div>
  )
}
