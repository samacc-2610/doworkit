"use client"

import { useState, useEffect } from "react"

export default function Scene3D() {
  const [isClient, setIsClient] = useState(false)
  const [ThreeComponents, setThreeComponents] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Dynamically import Three.js components only on client side
    const loadThreeComponents = async () => {
      try {
        const { Canvas } = await import("@react-three/fiber")
        const { OrbitControls, Sphere, MeshDistortMaterial, Environment, Float } = await import("@react-three/drei")
        
        const AnimatedSphere = () => (
          <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1, 100, 200]} scale={2.4}>
              <MeshDistortMaterial color="#8b5cf6" attach="material" distort={0.3} speed={1.5} roughness={0} />
            </Sphere>
          </Float>
        )

        const SceneContent = () => (
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedSphere />
            <Environment preset="sunset" />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        )

        setThreeComponents(() => SceneContent)
      } catch (error) {
        console.error("Failed to load Three.js components:", error)
        // Fallback to a simple animated background
        setThreeComponents(() => () => (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-pink-900/30 animate-pulse">
            <div className="w-full h-full flex items-center justify-center opacity-50">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin" style={{animationDuration: '10s'}} />
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
          <div className="text-purple-300 text-sm">Loading 3D Scene...</div>
        </div>
      </div>
    )
  }

  return <ThreeComponents />
}