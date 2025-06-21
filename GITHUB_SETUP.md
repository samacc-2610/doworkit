# 📚 Complete GitHub Setup Guide

Follow these steps to upload your NexusApp project to GitHub and then deploy to Render.

## 🔧 Step 1: Initialize Git Repository

Open your terminal/PowerShell in the project directory and run:

```bash
cd d:/Movies/fullstack-3d-app

# Initialize git repository
git init

# Add all files to staging
git add .

# Make your first commit
git commit -m "Initial commit: NexusApp - 3D Productivity Platform"
```

## 🌐 Step 2: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)
1. Go to [github.com](https://github.com)
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `nexusapp` (or your preferred name)
   - **Description**: `3D Productivity Platform built with Next.js and Three.js`
   - **Visibility**: Public or Private (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Option B: Using GitHub CLI (Alternative)
If you have GitHub CLI installed:
```bash
gh repo create nexusapp --public --description "3D Productivity Platform built with Next.js and Three.js"
```

## 🔗 Step 3: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote origin (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/nexusapp.git

# Set the main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example with actual username:**
```bash
git remote add origin https://github.com/johnsmith/nexusapp.git
git branch -M main
git push -u origin main
```

## ✅ Step 4: Verify Upload

1. Go to your GitHub repository URL
2. You should see all your project files
3. Check that the README.md displays properly
4. Verify that sensitive files (like .env) are NOT uploaded (they should be in .gitignore)

## 🚀 Step 5: Deploy to Render

Now that your project is on GitHub, you can deploy to Render:

### Quick Deploy Method:
1. Go to [render.com](https://render.com)
2. Sign up/login (you can use your GitHub account)
3. Click "New" → "Blueprint"
4. Connect your GitHub account if not already connected
5. Select your `nexusapp` repository
6. Render will detect the `render.yaml` file
7. Review the services that will be created:
   - **nexusapp-frontend** (Next.js app)
   - **nexusapp-backend** (Express API)  
   - **nexusapp-mongodb** (Database)
8. Click "Apply"

### Environment Variables Setup:
After deployment starts, you'll need to set these environment variables:

**For Backend Service:**
- `NODE_ENV`: `production`
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Generate a secure secret (32+ characters)
- `CORS_ORIGIN`: Your frontend URL (will be provided by Render)

**For Frontend Service:**
- `NEXT_PUBLIC_API_URL`: Your backend URL (will be provided by Render)

## 🔐 MongoDB Database Setup

### Option A: MongoDB Atlas (Free, Recommended)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user
4. Set network access to 0.0.0.0/0 (allow all IPs)
5. Get the connection string
6. Add it as `MONGODB_URI` in Render

### Option B: Use Render's PostgreSQL (Alternative)
If you prefer SQL database, you can modify the backend to use PostgreSQL instead.

## 🔍 Troubleshooting

### Common Issues:

1. **Git not recognized**
   ```bash
   # Install Git from https://git-scm.com/
   # Or use GitHub Desktop for GUI
   ```

2. **Authentication issues**
   ```bash
   # Use personal access token instead of password
   # Go to GitHub → Settings → Developer settings → Personal access tokens
   ```

3. **Repository already exists**
   ```bash
   # If you need to start over
   git remote remove origin
   # Then add the correct origin
   ```

4. **Large files error**
   ```bash
   # Remove large files and add to .gitignore
   git rm --cached large-file.zip
   git commit -m "Remove large file"
   ```

## 📋 Checklist

- [ ] Git repository initialized
- [ ] All files committed
- [ ] GitHub repository created
- [ ] Local repo connected to GitHub
- [ ] Files successfully pushed
- [ ] Repository is accessible on GitHub
- [ ] Ready to deploy to Render

## 🎯 Next Steps

Once your project is on GitHub:
1. Deploy to Render using the blueprint
2. Set up your MongoDB database
3. Configure environment variables
4. Test your deployed application

## 💡 Pro Tips

1. **Keep your repository updated**: Push changes regularly
2. **Use meaningful commit messages**: Describe what you changed
3. **Branch for features**: Create branches for new features
4. **Monitor deployments**: Check Render dashboard for deployment status

---

**Your project will be live at**: `https://nexusapp-frontend.onrender.com`

Need help? Check the troubleshooting section or create an issue in your repository!