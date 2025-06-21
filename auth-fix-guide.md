# 🔐 GitHub Authentication Fix Guide

## Issue: Permission denied to samacc-2610/doworkit.git

You're authenticated as `anshpatel-2503` but trying to push to `samacc-2610/doworkit`.

## Solution Options:

### Option 1: Use Personal Access Token (Recommended)

1. **Generate Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Give it a name: "NexusApp Deployment"
   - Select scopes: `repo` (full control of private repositories)
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

2. **Update Git remote with token:**
   ```bash
   git remote remove origin
   git remote add origin https://YOUR_TOKEN@github.com/samacc-2610/doworkit.git
   git push -u origin main
   ```

### Option 2: Switch GitHub Account

1. **Configure Git with correct account:**
   ```bash
   git config --global user.name "samacc-2610"
   git config --global user.email "your-samacc-email@example.com"
   ```

2. **Clear stored credentials:**
   - Windows: Go to Control Panel → User Accounts → Credential Manager
   - Remove GitHub credentials
   - Or use: `git config --global --unset credential.helper`

3. **Push again:**
   ```bash
   git push -u origin main
   ```

### Option 3: Use SSH (Alternative)

1. **Generate SSH key:**
   ```bash
   ssh-keygen -t ed25519 -C "your-samacc-email@example.com"
   ```

2. **Add SSH key to GitHub:**
   - Copy the public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key" and paste

3. **Update remote to use SSH:**
   ```bash
   git remote remove origin
   git remote add origin git@github.com:samacc-2610/doworkit.git
   git push -u origin main
   ```

## Quick Commands for Option 1 (Token Method):

```bash
cd d:/Movies/fullstack-3d-app

# Replace YOUR_TOKEN with your actual token
git remote remove origin
git remote add origin https://YOUR_TOKEN@github.com/samacc-2610/doworkit.git
git push -u origin main
```

## After Successful Push:

✅ Your project will be at: https://github.com/samacc-2610/doworkit
✅ Ready to deploy to Render using the repository