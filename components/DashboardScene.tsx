"use client"

import { useState, useEffect } from "react"

export default function DashboardScene() {
  const [isClient, setIsClient] = useState(false)
  const [ThreeComponents, setThreeComponents] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Dynamically import Three.js components only on client side
    const loadThreeComponents = async () => {
      try {
        const { Canvas } = await import("@react-three/fiber")
        const { OrbitControls, Text, Float, Environment } = await import("@react-three/drei")
        
        const FloatingText = () => (
          <Float speed={1.4} rotationIntensity={0.5} floatIntensity={2}>
            <Text fontSize={0.5} color="#8b5cf6" anchorX="center" anchorY="middle">
              Your Ideas
            </Text>
          </Float>
        )

        const SceneContent = () => (
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} />
            <FloatingText />
            <Environment preset="sunset" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        )

        setThreeComponents(() => SceneContent)
      } catch (error) {
        console.error("Failed to load Three.js components:", error)
        // Fallback to a simple animated background
        setThreeComponents(() => () => (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20 animate-pulse">
            <div className="w-full h-full flex items-center justify-center opacity-30">
              <div className="text-purple-300 text-2xl font-bold animate-pulse">Your Ideas</div>
            </div>
          </div>
        ))
      }
    }

    if (isClient) {
      loadThreeComponents()
    }
  }, [isClient])

  if (!isClient || !ThreeComponents) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-900/10 to-pink-900/10 animate-pulse">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-purple-300 text-sm opacity-50">Loading dashboard scene...</div>
        </div>
      </div>
    )
  }

  return <ThreeComponents />
}