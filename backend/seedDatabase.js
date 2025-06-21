const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// MongoDB Connection
const MONGODB_URI = "mongodb://notionuseransh:Ansh*2003@localhost:27017/Notion-Clone?authSource=Notion-Clone"

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

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("✅ Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Note.deleteMany({})
    console.log("🗑️ Cleared existing data")

    // Create sample users
    const hashedPassword = await bcrypt.hash("password123", 12)

    const users = await User.insertMany([
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
      },
    ])

    console.log(`👥 Created ${users.length} users`)

    // Create sample notes
    const sampleNotes = [
      {
        title: "Welcome to NexusApp",
        content:
          "This is your first note in the 3D productivity space. Explore the immersive interface and start creating amazing content!",
        category: "Personal",
        userId: users[0]._id,
        starred: true,
      },
      {
        title: "Project Roadmap 2024",
        content:
          "Q1: Research and Development\nQ2: Prototype Development\nQ3: Testing and Refinement\nQ4: Launch and Marketing",
        category: "Work",
        userId: users[0]._id,
        starred: false,
      },
      {
        title: "Creative Brainstorming",
        content:
          "Ideas for the next big innovation:\n- AI-powered productivity tools\n- 3D collaborative workspaces\n- Voice-controlled interfaces",
        category: "Ideas",
        userId: users[0]._id,
        starred: true,
      },
      {
        title: "Meeting Notes",
        content:
          "Team meeting discussion points:\n- New feature requirements\n- Timeline adjustments\n- Resource allocation",
        category: "Work",
        userId: users[1]._id,
        starred: false,
      },
      {
        title: "Learning Goals",
        content:
          "Skills to develop this year:\n- Advanced Three.js techniques\n- MongoDB optimization\n- UI/UX design principles",
        category: "Personal",
        userId: users[1]._id,
        starred: true,
      },
    ]

    const notes = await Note.insertMany(sampleNotes)
    console.log(`📝 Created ${notes.length} notes`)

    console.log("🎉 Database seeded successfully!")
    console.log("📧 Test credentials: john@example.com / password123")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
  } finally {
    await mongoose.connection.close()
    console.log("🔌 Database connection closed")
  }
}

seedDatabase()
