const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nexusapp"

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err))

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}))
app.use(express.json())

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const User = mongoose.model("User", userSchema)

// Note Schema
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: "Personal" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  starred: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Note = mongoose.model("Note", noteSchema)

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ success: false, error: "Access token required" })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, error: "Invalid token" })
    }
    req.user = user
    next()
  })
}

// AUTH ROUTES

// Register User
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already exists" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" })

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ success: false, error: "Registration failed" })
  }
})

// Login User
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid credentials" })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({ success: false, error: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" })

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ success: false, error: "Login failed" })
  }
})

// NOTES ROUTES

// Get all notes for authenticated user
app.get("/api/notes", authenticateToken, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId }).sort({ createdAt: -1 })

    res.json({ success: true, notes })
  } catch (error) {
    console.error("Get notes error:", error)
    res.status(500).json({ success: false, error: "Failed to fetch notes" })
  }
})

// Create new note
app.post("/api/notes", authenticateToken, async (req, res) => {
  try {
    const { title, content, category } = req.body

    const note = new Note({
      title,
      content,
      category,
      userId: req.user.userId,
    })

    await note.save()

    res.status(201).json({ success: true, note })
  } catch (error) {
    console.error("Create note error:", error)
    res.status(500).json({ success: false, error: "Failed to create note" })
  }
})

// Update note
app.put("/api/notes/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { title, content, category, starred } = req.body

    const note = await Note.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { title, content, category, starred, updatedAt: new Date() },
      { new: true },
    )

    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" })
    }

    res.json({ success: true, note })
  } catch (error) {
    console.error("Update note error:", error)
    res.status(500).json({ success: false, error: "Failed to update note" })
  }
})

// Delete note
app.delete("/api/notes/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    const note = await Note.findOneAndDelete({ _id: id, userId: req.user.userId })

    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" })
    }

    res.json({ success: true, message: "Note deleted successfully" })
  } catch (error) {
    console.error("Delete note error:", error)
    res.status(500).json({ success: false, error: "Failed to delete note" })
  }
})

// Get user profile
app.get("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password")
    res.json({ success: true, user })
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({ success: false, error: "Failed to get profile" })
  }
})

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running!" })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
