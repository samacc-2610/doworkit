"use client"

import { useState, useEffect } from "react"

export default function AuthScene() {
  const [isClient, setIsClient] = useState(false)
  const [ThreeComponents, setThreeComponents] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Dynamically import Three.js components only on client side
    const loadThreeComponents = async () => {
      try {
        const { Canvas } = await import("@react-three/fiber")
        const { OrbitControls, Box, MeshWobbleMaterial } = await import("@react-three/drei")
        
        const FloatingCube = () => (
          <Box args={[1, 1, 1]} rotation={[0.4, 0.2, 0]}>
            <MeshWobbleMaterial color="#8b5cf6" attach="material" factor={1} speed={2} roughness={0} />
          </Box>
        )

        const SceneContent = () => (
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FloatingCube />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        )

        setThreeComponents(() => SceneContent)
      } catch (error) {
        console.error("Failed to load Three.js components:", error)
        // Fallback to a simple animated background
        setThreeComponents(() => () => (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-pink-900/30 animate-pulse">
            <div className="w-full h-full flex items-center justify-center opacity-50">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce rounded-lg" />
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
      <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20 animate-pulse">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-purple-300 text-sm opacity-50">Loading auth scene...</div>
        </div>
      </div>
    )
  }

  return <ThreeComponents />
}