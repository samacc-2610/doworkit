@echo off
echo.
echo ========================================
echo  NexusApp - Push to samacc-2610/doworkit
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo ✅ Git is installed
echo.

REM Initialize git repository
echo 📁 Initializing Git repository...
git init

REM Add all files
echo 📦 Adding all files...
git add .

REM Make initial commit
echo 💾 Making initial commit...
git commit -m "Add NexusApp - 3D Productivity Platform"

REM Add your specific repository
echo 🔗 Connecting to samacc-2610/doworkit...
git remote add origin https://github.com/samacc-2610/doworkit.git

REM Set main branch
echo 🌿 Setting up main branch...
git branch -M main

REM Push to your repository
echo 🚀 Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo  Upload Complete!
echo ========================================
echo.
echo ✅ Your project is now on GitHub at:
echo    https://github.com/samacc-2610/doworkit
echo.
echo 🚀 Next: Deploy to Render
echo    1. Go to render.com
echo    2. New → Blueprint
echo    3. Select: samacc-2610/doworkit
echo    4. Apply the render.yaml configuration
echo.
pause