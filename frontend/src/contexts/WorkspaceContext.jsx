"use client"

import { createContext, useContext, useState, useEffect } from "react"
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../config/firebase"
import { useAuth } from "./AuthContext"

const WorkspaceContext = createContext()

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext)
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider")
  }
  return context
}

export const WorkspaceProvider = ({ children }) => {
  const { user } = useAuth()
  const [workspaces, setWorkspaces] = useState([])
  const [pages, setPages] = useState([])
  const [currentWorkspace, setCurrentWorkspace] = useState(null)
  const [loading, setLoading] = useState(false)

  // Listen to user's workspaces
  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, "workspaces"),
      where("members", "array-contains", user.uid),
      orderBy("updatedAt", "desc"),
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const workspaceData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setWorkspaces(workspaceData)
    })

    return unsubscribe
  }, [user])

  // Listen to pages in current workspace
  useEffect(() => {
    if (!currentWorkspace) return

    const q = query(
      collection(db, "pages"),
      where("workspaceId", "==", currentWorkspace.id),
      orderBy("updatedAt", "desc"),
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pageData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setPages(pageData)
    })

    return unsubscribe
  }, [currentWorkspace])

  const createWorkspace = async (name, description = "") => {
    if (!user) return { success: false, error: "User not authenticated" }

    try {
      setLoading(true)
      const workspaceData = {
        name,
        description,
        owner: user.uid,
        members: [user.uid],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        icon: "🚀",
      }

      const docRef = await addDoc(collection(db, "workspaces"), workspaceData)
      return { success: true, id: docRef.id }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const createPage = async (title, workspaceId, parentId = null) => {
    if (!user) return { success: false, error: "User not authenticated" }

    try {
      setLoading(true)
      const pageData = {
        title,
        content: {
          blocks: [
            {
              id: Date.now().toString(),
              type: "heading",
              content: title,
              level: 1,
            },
          ],
        },
        workspaceId,
        parentId,
        author: user.uid,
        collaborators: [user.uid],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        icon: "📄",
      }

      const docRef = await addDoc(collection(db, "pages"), pageData)
      return { success: true, id: docRef.id }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const updatePage = async (pageId, updates) => {
    try {
      await updateDoc(doc(db, "pages", pageId), {
        ...updates,
        updatedAt: serverTimestamp(),
      })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const deletePage = async (pageId) => {
    try {
      await deleteDoc(doc(db, "pages", pageId))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    workspaces,
    pages,
    currentWorkspace,
    setCurrentWorkspace,
    loading,
    createWorkspace,
    createPage,
    updatePage,
    deletePage,
  }

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}
