import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const MONGODB_URI = "mongodb://notionuseransh:Ansh*2003@localhost:27017/Notion-Clone?authSource=Notion-Clone"
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!client) {
  client = new MongoClient(MONGODB_URI)
  clientPromise = client.connect()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, email, password, name } = body

    const client = await clientPromise
    const db = client.db("Notion-Clone")
    const users = db.collection("users")

    if (action === "signup") {
      // Check if user already exists
      const existingUser = await users.findOne({ email })
      if (existingUser) {
        return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Create user
      const newUser = {
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await users.insertOne(newUser)

      // Generate JWT token
      const token = jwt.sign({ userId: result.insertedId, email }, JWT_SECRET, { expiresIn: "7d" })

      return NextResponse.json({
        success: true,
        token,
        user: { id: result.insertedId, name, email },
      })
    } else if (action === "login") {
      // Find user
      const user = await users.findOne({ email })
      if (!user) {
        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 400 })
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 400 })
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" })

      return NextResponse.json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email },
      })
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 })
  }
}
