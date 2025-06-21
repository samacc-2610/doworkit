@echo off
echo.
echo ========================================
echo  NexusApp - Local Development Setup
echo ========================================
echo.

echo 📦 Installing Frontend Dependencies...
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo ❌ Frontend installation failed
    pause
    exit /b 1
)

echo.
echo 📦 Installing Backend Dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ❌ Backend installation failed
    pause
    exit /b 1
)

echo.
echo 🔧 Testing Database Connection...
call npm run test-db
if errorlevel 1 (
    echo ❌ Database connection failed
    echo Check your MongoDB connection string in backend/.env
    pause
    exit /b 1
)

cd ..
echo.
echo ========================================
echo  ✅ Setup Complete!
echo ========================================
echo.
echo 🚀 To start development:
echo.
echo Terminal 1: npm run dev          (Frontend on :3000)
echo Terminal 2: cd backend && npm run dev  (Backend on :5000)
echo.
echo 🌐 Your app will be at: http://localhost:3000
echo 🔧 API will be at: http://localhost:5000
echo.
pause