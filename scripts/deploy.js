#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 NexusApp Deployment Script')
console.log('==============================')

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from the project root directory')
  process.exit(1)
}

// Check if render.yaml exists
if (!fs.existsSync('render.yaml')) {
  console.error('❌ render.yaml not found. Please make sure the render configuration exists.')
  process.exit(1)
}

console.log('✅ Render configuration found')

// Check if backend directory exists
if (!fs.existsSync('backend')) {
  console.error('❌ Backend directory not found')
  process.exit(1)
}

console.log('✅ Backend directory found')

// Install dependencies
console.log('📦 Installing frontend dependencies...')
try {
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' })
  console.log('✅ Frontend dependencies installed')
} catch (error) {
  console.error('❌ Failed to install frontend dependencies:', error.message)
  process.exit(1)
}

console.log('📦 Installing backend dependencies...')
try {
  execSync('cd backend && npm install', { stdio: 'inherit' })
  console.log('✅ Backend dependencies installed')
} catch (error) {
  console.error('❌ Failed to install backend dependencies:', error.message)
  process.exit(1)
}

// Test build
console.log('🔨 Testing production build...')
try {
  execSync('npm run build', { stdio: 'inherit' })
  console.log('✅ Production build successful')
} catch (error) {
  console.error('❌ Production build failed:', error.message)
  process.exit(1)
}

console.log('')
console.log('🎉 Deployment preparation complete!')
console.log('')
console.log('Next steps:')
console.log('1. Push your code to GitHub')
console.log('2. Go to render.com and connect your repository')
console.log('3. Select "Deploy from Blueprint" and use render.yaml')
console.log('4. Set up your environment variables')
console.log('')
console.log('📖 See deploy.md for detailed instructions')