# NexusApp Backend

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB running locally
- npm or yarn

### Installation

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create .env file with your configuration:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Seed the database:
\`\`\`bash
npm run seed
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Notes (Protected Routes)
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### User
- `GET /api/user/profile` - Get user profile

### Health Check
- `GET /api/health` - Server health status

## 🔐 Authentication
All protected routes require Bearer token in Authorization header:
\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

## 📊 Database Models

### User
\`\`\`javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Note
\`\`\`javascript
{
  title: String,
  content: String,
  category: String,
  userId: ObjectId (ref: User),
  starred: Boolean,
  createdAt: Date,
  updatedAt: Date
}
