-- MongoDB setup script (run these commands in MongoDB shell)

-- Switch to the Notion-Clone database
use('Notion-Clone');

-- Create users collection with indexes
db.createCollection('users');
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "createdAt": 1 });

-- Create notes collection with indexes
db.createCollection('notes');
db.notes.createIndex({ "userId": 1 });
db.notes.createIndex({ "createdAt": -1 });
db.notes.createIndex({ "category": 1 });
db.notes.createIndex({ "starred": 1 });

-- Insert sample data
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6uk6L7Q1NO", // password: "password123"
  createdAt: new Date(),
  updatedAt: new Date()
});

-- Get the user ID for sample notes
var userId = db.users.findOne({email: "john@example.com"})._id;

-- Insert sample notes
db.notes.insertMany([
  {
    title: "Welcome to NexusApp",
    content: "This is your first note in the 3D productivity space. Start creating amazing content with our immersive interface!",
    category: "Personal",
    userId: userId,
    starred: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Project Planning",
    content: "Use this space to plan your projects. The 3D environment helps you visualize your ideas better.",
    category: "Work",
    userId: userId,
    starred: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Creative Ideas",
    content: "Brainstorm your creative ideas here. The floating 3D elements inspire creativity and innovation.",
    category: "Ideas",
    userId: userId,
    starred: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print("Database setup completed successfully!");
print("Collections created: users, notes");
print("Sample data inserted");
