"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react"

let toastId = 0
const toasts = []
const listeners = []

export const toast = {
  success: (message) => addToast({ type: "success", message }),
  error: (message) => addToast({ type: "error", message }),
  warning: (message) => addToast({ type: "warning", message }),
  info: (message) => addToast({ type: "info", message }),
}

function addToast(toast) {
  const id = toastId++
  const newToast = { id, ...toast, createdAt: Date.now() }
  toasts.push(newToast)
  listeners.forEach((listener) => listener([...toasts]))

  // Auto remove after 5 seconds
  setTimeout(() => removeToast(id), 5000)
}

function removeToast(id) {
  const index = toasts.findIndex((toast) => toast.id === id)
  if (index > -1) {
    toasts.splice(index, 1)
    listeners.forEach((listener) => listener([...toasts]))
  }
}

export function Toaster() {
  const [toastList, setToastList] = useState([])

  useEffect(() => {
    listeners.push(setToastList)
    return () => {
      const index = listeners.indexOf(setToastList)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />
      case "error":
        return <XCircle className="w-5 h-5" />
      case "warning":
        return <AlertCircle className="w-5 h-5" />
      default:
        return <AlertCircle className="w-5 h-5" />
    }
  }

  const getColors = (type) => {
    switch (type) {
      case "success":
        return "from-green-500 to-emerald-500 text-white"
      case "error":
        return "from-red-500 to-pink-500 text-white"
      case "warning":
        return "from-yellow-500 to-orange-500 text-white"
      default:
        return "from-blue-500 to-cyan-500 text-white"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toastList.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.5 }}
            className={`bg-gradient-to-r ${getColors(toast.type)} p-4 rounded-xl shadow-2xl backdrop-blur-sm border border-white/20 max-w-sm`}
          >
            <div className="flex items-center space-x-3">
              {getIcon(toast.type)}
              <p className="flex-1 font-medium">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
