# NexusApp - Render Deployment Guide

## Quick Deploy

1. **Push to GitHub**: Make sure your code is pushed to a GitHub repository
2. **Connect to Render**: Go to [render.com](https://render.com) and connect your GitHub repository
3. **Deploy using Blueprint**: Select "Deploy from Blueprint" and use the `render.yaml` file

## Manual Deployment (Alternative)

### Backend Service
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - **Name**: `nexusapp-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV`: `production`
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Generate a secure secret
     - `CORS_ORIGIN`: Your frontend URL

### Frontend Service
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - **Name**: `nexusapp-frontend`
   - **Root Directory**: `.` (root)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV`: `production`
     - `NEXT_PUBLIC_API_URL`: Your backend URL

### Database
1. Create a PostgreSQL database (or use MongoDB Atlas)
2. Update the MONGODB_URI environment variable

## Environment Variables Setup

### Backend (.env)
```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secure_jwt_secret
CORS_ORIGIN=https://your-frontend-url.onrender.com
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

## Post-Deployment
1. Test all endpoints
2. Verify 3D scenes load correctly
3. Check authentication flow
4. Test note creation and management

## Troubleshooting
- If 3D scenes don't load, check browser console for Three.js errors
- Ensure CORS is properly configured
- Verify all environment variables are set correctly