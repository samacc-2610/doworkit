import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

// MongoDB connection string (replace with your actual connection string)
const MONGODB_URI = "mongodb://notionuseransh:Ansh*2003@localhost:27017/Notion-Clone?authSource=Notion-Clone"

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!client) {
  client = new MongoClient(MONGODB_URI)
  clientPromise = client.connect()
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("Notion-Clone")
    const notes = await db.collection("notes").find({}).toArray()

    return NextResponse.json({ success: true, notes })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch notes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, category, userId } = body

    const client = await clientPromise
    const db = client.db("Notion-Clone")

    const newNote = {
      title,
      content,
      category,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      starred: false,
    }

    const result = await db.collection("notes").insertOne(newNote)

    return NextResponse.json({
      success: true,
      note: { ...newNote, _id: result.insertedId },
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to create note" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, content, category, starred } = body

    const client = await clientPromise
    const db = client.db("Notion-Clone")

    const result = await db.collection("notes").updateOne(
      { _id: id },
      {
        $set: {
          title,
          content,
          category,
          starred,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to update note" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    const client = await clientPromise
    const db = client.db("Notion-Clone")

    const result = await db.collection("notes").deleteOne({ _id: id })

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete note" }, { status: 500 })
  }
}
