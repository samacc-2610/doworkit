@echo off
echo.
echo ========================================
echo  NexusApp - GitHub Setup Script
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
git commit -m "Initial commit: NexusApp - 3D Productivity Platform"

echo.
echo ========================================
echo  Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Create a new repository on GitHub.com
echo 2. Run these commands (replace 'yourusername'):
echo.
echo    git remote add origin https://github.com/yourusername/nexusapp.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Then deploy to Render using the blueprint
echo.
echo See GITHUB_SETUP.md for detailed instructions
echo.
pause