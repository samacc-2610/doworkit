// Node.js script to seed the database with sample data
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

const MONGODB_URI = "mongodb://notionuseransh:Ansh*2003@localhost:27017/Notion-Clone?authSource=Notion-Clone"

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("Notion-Clone")

    // Clear existing data
    await db.collection("users").deleteMany({})
    await db.collection("notes").deleteMany({})

    // Create sample users
    const hashedPassword = await bcrypt.hash("password123", 12)

    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const userResult = await db.collection("users").insertMany(users)
    console.log(`${userResult.insertedCount} users created`)

    // Get user IDs
    const johnId = userResult.insertedIds[0]
    const janeId = userResult.insertedIds[1]

    // Create sample notes
    const notes = [
      {
        title: "Welcome to NexusApp",
        content:
          "This is your first note in the 3D productivity space. Explore the immersive interface and start creating amazing content!",
        category: "Personal",
        userId: johnId,
        starred: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Project Roadmap 2024",
        content:
          "Q1: Research and Development\nQ2: Prototype Development\nQ3: Testing and Refinement\nQ4: Launch and Marketing",
        category: "Work",
        userId: johnId,
        starred: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Creative Brainstorming",
        content:
          "Ideas for the next big innovation:\n- AI-powered productivity tools\n- 3D collaborative workspaces\n- Voice-controlled interfaces",
        category: "Ideas",
        userId: johnId,
        starred: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Meeting Notes",
        content:
          "Team meeting discussion points:\n- New feature requirements\n- Timeline adjustments\n- Resource allocation",
        category: "Work",
        userId: janeId,
        starred: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Learning Goals",
        content:
          "Skills to develop this year:\n- Advanced Three.js techniques\n- MongoDB optimization\n- UI/UX design principles",
        category: "Personal",
        userId: janeId,
        starred: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const notesResult = await db.collection("notes").insertMany(notes)
    console.log(`${notesResult.insertedCount} notes created`)

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
