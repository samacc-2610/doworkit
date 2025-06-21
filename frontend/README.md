# Nexus Notion - Frontend

A stunning 3D collaborative workspace built with React, Three.js, and Firebase.

## 🚀 Features

### 3D Experience
- **Immersive Landing Page** with floating 3D elements
- **Interactive Authentication** with wobbling cubes
- **Dynamic Dashboard** with floating orbs and text
- **Creative Page Editor** with 3D background scenes

### Modern UI/UX
- **Glassmorphism Design** with backdrop blur effects
- **Smooth Animations** powered by Framer Motion
- **Responsive Layout** that works on all devices
- **Custom Components** with unique styling

### Collaboration Features
- **Real-time Sync** with Firebase Firestore
- **Multi-user Workspaces** with shared access
- **Live Page Editing** with auto-save
- **Rich Text Editor** with multiple block types

## 🛠 Tech Stack

- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Firebase** - Backend-as-a-Service
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 📁 Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   └── ui/             # Base UI components
├── contexts/           # React contexts
│   ├── AuthContext.jsx # Authentication state
│   └── WorkspaceContext.jsx # Workspace management
├── pages/              # Page components
│   ├── LandingPage.jsx # 3D landing page
│   ├── AuthPage.jsx    # Login/signup with 3D
│   ├── Dashboard.jsx   # Main dashboard
│   └── PageEditor.jsx  # Rich text editor
├── config/             # Configuration files
│   └── firebase.js     # Firebase setup
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
\`\`\`

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project

### Installation

1. **Navigate to frontend directory:**
\`\`\`bash
cd frontend
\`\`\`

2. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

3. **Configure Firebase:**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Copy your config to \`src/config/firebase.js\`

4. **Start development server:**
\`\`\`bash
npm run dev
\`\`\`

5. **Open your browser:**
   Visit http://localhost:3000

## 🎨 Key Components

### 3D Scenes
Each page features unique 3D elements:

- **Landing Page**: Floating spheres with transmission materials
- **Auth Page**: Wobbling rounded boxes with auto-rotation
- **Dashboard**: Distorted spheres with floating text
- **Editor**: Minimal floating elements for focus

### Block Editor
Rich text editing with multiple block types:

- **Text Blocks**: Paragraphs with smart formatting
- **Headings**: H1, H2, H3 with proper hierarchy
- **Lists**: Bullet and numbered lists
- **Quotes**: Styled blockquotes with left border
- **Code**: Syntax-highlighted code blocks

### Real-time Features
- **Auto-save**: Changes saved automatically every second
- **Live Updates**: Real-time synchronization across devices
- **Collaborative Editing**: Multiple users can edit simultaneously

## 🎯 Usage

### Getting Started
1. **Create Account**: Sign up with email or Google
2. **Create Workspace**: Organize your content
3. **Add Pages**: Start writing and collaborating
4. **Invite Team**: Share workspaces with others

### Editor Commands
- **Type '/'**: Open block menu
- **Enter**: Create new paragraph
- **Backspace**: Delete empty blocks
- **Tab**: Indent list items

### Keyboard Shortcuts
- **Cmd/Ctrl + S**: Manual save
- **Cmd/Ctrl + /**: Toggle block menu
- **Esc**: Close modals and menus

## 🎨 Customization

### Colors
Modify the color palette in \`tailwind.config.js\`:
\`\`\`javascript
colors: {
  purple: { /* custom purple shades */ },
  pink: { /* custom pink shades */ }
}
\`\`\`

### 3D Scenes
Customize 3D elements in page components:
- Adjust materials and lighting
- Change camera positions
- Add new 3D objects

### Animations
Modify animations in component files:
- Framer Motion variants
- CSS keyframe animations
- Three.js animations

## 🚀 Build & Deploy

### Development
\`\`\`bash
npm run dev
\`\`\`

### Production Build
\`\`\`bash
npm run build
\`\`\`

### Deploy to Vercel
\`\`\`bash
vercel --prod
\`\`\`

### Deploy to Netlify
\`\`\`bash
netlify deploy --prod --dir=dist
\`\`\`

## 📱 Mobile Support

The app is fully responsive and works great on:
- **Desktop**: Full 3D experience
- **Tablet**: Optimized touch interactions
- **Mobile**: Simplified 3D for performance

## 🔐 Security

- **Firebase Auth**: Secure authentication
- **Firestore Rules**: Database security
- **Input Validation**: XSS protection
- **HTTPS Only**: Secure connections

## 🐛 Troubleshooting

### Common Issues

1. **3D Elements Not Loading**
   - Check WebGL support in browser
   - Update graphics drivers
   - Try different browser

2. **Firebase Connection Issues**
   - Verify config in \`firebase.js\`
   - Check Firebase project settings
   - Ensure Firestore is enabled

3. **Build Errors**
   - Clear node_modules: \`rm -rf node_modules && npm install\`
   - Update dependencies: \`npm update\`
   - Check Node.js version

## 📈 Performance

### Optimization Features
- **Code Splitting**: Lazy loading of routes
- **Tree Shaking**: Remove unused code
- **Asset Optimization**: Compressed images and fonts
- **3D Optimization**: Efficient Three.js rendering

### Best Practices
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Optimize 3D scenes with LOD (Level of Detail)
- Use Web Workers for heavy computations

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit changes: \`git commit -m 'Add amazing feature'\`
4. Push to branch: \`git push origin feature/amazing-feature\`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
\`\`\`

## Firebase Configuration & Setup
