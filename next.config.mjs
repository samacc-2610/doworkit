/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  // Optimize for production
  swcMinify: true,
  // Handle Three.js dependencies
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Better performance for 3D apps
  experimental: {
    // Removed optimizeCss to prevent build errors
  }
}

export default nextConfig
