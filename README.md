# NexusApp - 3D Productivity Platform

A modern fullstack productivity application featuring interactive 3D scenes built with Next.js, React Three Fiber, Node.js, and MongoDB.

![NexusApp](https://img.shields.io/badge/Next.js-14.2.16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.160.1-brightgreen?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)

## ✨ Features

- **🎨 Interactive 3D Scenes**: Powered by React Three Fiber and Three.js
- **📝 Note Management**: Create, edit, and organize your notes
- **🔐 Authentication**: Secure login and registration system
- **📱 Responsive Design**: Works seamlessly on desktop and mobile
- **🎯 Modern UI**: Built with Tailwind CSS and Radix UI components
- **⚡ Real-time Updates**: Live note synchronization
- **🚀 Production Ready**: Optimized for deployment on Render

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React Three Fiber** - 3D graphics in React
- **Three.js** - 3D graphics library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **TypeScript** - Type safety

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB instance (local or Atlas)
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nexusapp.git
   cd nexusapp
   ```

2. **Install frontend dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create `.env.local` in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
   
   Create `backend/.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/nexusapp
   JWT_SECRET=your-super-secret-jwt-key-here
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Start the development servers**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📦 Project Structure

```
nexusapp/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   └── page.tsx           # Home page
├── backend/               # Express.js backend
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Environment variables template
├── components/            # React components
│   ├── ui/                # UI components
│   ├── AuthScene.tsx      # 3D authentication scene
│   ├── DashboardScene.tsx # 3D dashboard scene
│   └── Scene3D.tsx        # Main 3D scene component
├── lib/                   # Utility functions
├── public/                # Static assets
├── styles/                # CSS styles
├── render.yaml            # Render deployment config
└── README.md              # This file
```

## 🌐 Deployment

This project is configured for easy deployment on Render.com:

1. **Push to GitHub** (see instructions below)
2. **Connect to Render**
3. **Deploy using Blueprint** (`render.yaml`)

See `RENDER_DEPLOYMENT.md` for detailed deployment instructions.

## 🎮 Usage

1. **Authentication**: Register or login to access the app
2. **Dashboard**: View your notes in an interactive 3D environment
3. **Create Notes**: Add new notes with categories and content
4. **3D Interaction**: Navigate through 3D scenes using mouse/touch controls
5. **Responsive Design**: Access from any device

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) for 3D graphics
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) for React integration
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible components

## 📧 Contact

For questions or support, please open an issue in this repository.

---

**Built with ❤️ using Next.js, Three.js, and modern web technologies**