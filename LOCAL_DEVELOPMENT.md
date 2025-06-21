# 🏠 Local Development Guide - Run NexusApp on Your Computer

Run your full 3D productivity app locally with your cloud MongoDB database - **completely free!**

## 🚀 Quick Start (3 Commands)

### **Method 1: Automated Setup**
```bash
# 1. Run setup (installs everything and tests database)
./local-setup.bat

# 2. Start backend (Terminal 1)
./start-backend.bat

# 3. Start frontend (Terminal 2) 
./start-frontend.bat
```

### **Method 2: Manual Setup**
```bash
# 1. Install dependencies
npm install --legacy-peer-deps
cd backend && npm install && cd ..

# 2. Test database connection
cd backend && npm run test-db && cd ..

# 3. Start backend (Terminal 1)
cd backend && npm run dev

# 4. Start frontend (Terminal 2)
npm run dev
```

## 🌐 Your Local URLs

After starting both servers:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🔧 Environment Configuration

### **Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NODE_ENV=development
```

### **Backend (backend/.env):**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://samacc2610:SAMacC*2610@doworkit.pm2txqe.mongodb.net/nexusapp?retryWrites=true&w=majority&appName=DoWorkIt
JWT_SECRET=5623qmHUC4e4AdpCaskbhMJABJgWhuQU
CORS_ORIGIN=http://localhost:3000
```

## 🗄️ Database Setup

✅ **Using Your Cloud MongoDB Atlas (Free)**
- Your database is already configured
- 512MB free storage
- No local MongoDB installation needed
- Data persists between sessions

## 🎮 Testing Your Local App

1. **Visit**: http://localhost:3000
2. **Register** a new account
3. **Login** with your credentials
4. **Navigate** the 3D scenes
5. **Create notes** and test functionality
6. **Check API** at: http://localhost:5000/api/health

## 🛠️ Development Features

### **Hot Reload**
- ✅ Frontend auto-reloads on changes
- ✅ Backend restarts on changes (with nodemon)
- ✅ 3D scenes update instantly

### **Development Tools**
- ✅ React DevTools
- ✅ Browser dev console
- ✅ Network inspection
- ✅ Database test script

### **File Structure**
```
nexusapp/
├── app/                    # Next.js app routes
├── components/             # React components  
├── backend/               # Express.js API
│   ├── server.js          # Main server
│   ├── .env              # Backend environment
│   └── test-db.js        # Database test
├── .env.local            # Frontend environment
└── package.json          # Frontend dependencies
```

## ⚡ Development Commands

```bash
# Frontend
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Backend  
cd backend
npm run dev             # Start with auto-reload
npm run start           # Start production server
npm run test-db         # Test database connection
npm run seed            # Seed sample data
```

## 🔍 Troubleshooting

### **Database Connection Issues**
```bash
cd backend
npm run test-db
```
If this fails:
- Check your internet connection
- Verify MongoDB Atlas cluster is running
- Confirm IP address is whitelisted (0.0.0.0/0)

### **Port Already in Use**
```bash
# Kill processes on ports
netstat -ano | findstr :3000
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F
```

### **3D Scenes Not Loading**
- Check browser console for errors
- Ensure all dependencies installed
- Try different browser (Chrome recommended)

### **API Connection Failed**
- Verify backend is running on :5000
- Check CORS configuration
- Confirm environment variables

## 💡 Pro Development Tips

1. **Use Two Terminals**: One for frontend, one for backend
2. **Browser DevTools**: F12 for debugging 3D scenes
3. **Network Tab**: Monitor API calls
4. **Console Logs**: Check for Three.js warnings
5. **Hot Reload**: Save files to see instant changes

## 🎯 Ready for Production?

When your local development is complete:
1. **Push changes** to GitHub
2. **Deploy to Render** (free tier)
3. **Same database** works for both local and production
4. **Environment variables** automatically switch

---

**🎊 Happy coding! Your 3D productivity app is ready for development!**