"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Text3D, Environment, MeshTransmissionMaterial, Sphere } from "@react-three/drei"
import { Link } from "react-router-dom"
import { ArrowRight, Sparkles, Users, Zap, Globe, Database, Layers } from "lucide-react"
import { motion } from "framer-motion"

function FloatingElements() {
  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={2}>
        <Sphere args={[0.8, 64, 64]} position={[-2, 1, 0]}>
          <MeshTransmissionMaterial
            color="#8b5cf6"
            thickness={0.2}
            roughness={0}
            transmission={1}
            ior={1.2}
            chromaticAberration={0.02}
            backside
          />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1.5}>
        <Sphere args={[0.5, 32, 32]} position={[2, -1, -1]}>
          <MeshTransmissionMaterial
            color="#ec4899"
            thickness={0.3}
            roughness={0.1}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.03}
          />
        </Sphere>
      </Float>

      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={3}>
        <Text3D font="/fonts/Inter_Bold.json" size={0.3} height={0.1} position={[0, 0, 0]}>
          Nexus
          <meshStandardMaterial color="#ffffff" />
        </Text3D>
      </Float>
    </group>
  )
}

function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <FloatingElements />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-40">
        <Scene3D />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: mousePosition.x * (20 + i * 0.1),
              y: mousePosition.y * (20 + i * 0.1),
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Nexus Notion</span>
          </motion.div>

          <div className="flex space-x-6">
            <Link to="/auth" className="text-white hover:text-purple-300 transition-colors font-medium">
              Login
            </Link>
            <Link
              to="/auth"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-5xl mx-auto">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-9xl font-bold text-white mb-8 leading-tight"
          >
            Think in
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              {" "}
              3D Space
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
          >
            The future of collaborative note-taking is here. Experience Notion in an immersive 3D environment
            <br />
            where ideas flow naturally and creativity knows no bounds.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/auth">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 text-lg rounded-xl font-semibold group shadow-2xl"
              >
                Start Creating
                <ArrowRight className="ml-3 w-5 h-5 inline group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-10 py-4 text-lg rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 py-32 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-5xl font-bold text-white text-center mb-20"
          >
            Powered by Next-Gen Technology
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-10 h-10" />,
                title: "3D Workspace",
                description:
                  "Immersive Three.js environment that transforms how you interact with your notes and ideas",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Database className="w-10 h-10" />,
                title: "Real-time Sync",
                description: "Firebase-powered real-time collaboration with instant updates across all devices",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Team Collaboration",
                description: "Work together seamlessly with live cursors, comments, and shared workspaces",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: "Lightning Fast",
                description: "Optimized performance with instant loading and smooth 3D animations",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: <Layers className="w-10 h-10" />,
                title: "Rich Content",
                description: "Support for text, images, embeds, and interactive 3D elements in your pages",
                color: "from-red-500 to-pink-500",
              },
              {
                icon: <Sparkles className="w-10 h-10" />,
                title: "AI-Powered",
                description: "Smart suggestions, auto-formatting, and intelligent content organization",
                color: "from-indigo-500 to-purple-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500 h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="relative z-10 py-32 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="text-5xl font-bold text-white mb-8"
          >
            Ready to Transform Your Workflow?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="text-xl text-gray-300 mb-12"
          >
            Join thousands of teams already using Nexus Notion to revolutionize their productivity
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            <Link to="/auth">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-5 text-xl rounded-2xl font-bold shadow-2xl"
              >
                Get Started for Free
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
