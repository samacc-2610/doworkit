"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import LandingPage from "./pages/LandingPage"
import AuthPage from "./pages/AuthPage"
import Dashboard from "./pages/Dashboard"
import WorkspacePage from "./pages/WorkspacePage"
import PageEditor from "./pages/PageEditor"
import LoadingSpinner from "./components/LoadingSpinner"
import { Toaster } from "./components/ui/Toaster"

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
          <Route path="/workspace/:workspaceId" element={user ? <WorkspacePage /> : <Navigate to="/auth" />} />
          <Route path="/page/:pageId" element={user ? <PageEditor /> : <Navigate to="/auth" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
