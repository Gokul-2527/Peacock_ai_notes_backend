# AI Notes App Backend (Hono + TypeScript)

This is the **backend API** for the AI Notes App, built using **Hono.js** with **TypeScript** and **MongoDB**.  
It provides user authentication, note management, and AI-powered features like summaries, improved content, and tag suggestions.

---

## Features

- **User Authentication**
  - Register new users
  - Login with JWT authentication
  - Passwords hashed with bcrypt
- **Notes Management**
  - Create, Read, Update, Delete (CRUD) notes
- **AI Integration**
  - Generate summaries for notes
  - Improve note content
  - Suggest relevant tags
- **Secure API**
  - JWT-based authentication
  - Middleware for route protection

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Hono.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **AI Services**: Custom AI endpoints
- **Environment Management**: dotenv

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Peacock_ai_notes_backend.git
cd Peacock_ai_notes_backend/server

2. Install dependencies:
npm install

3.Configure environment variables:
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-notes-app
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key # if using AI features

4.Run the development server:
npm run dev



Folder Structure
backend/
│
├─ src/
│   ├─ controllers/       # Route logic (auth, notes, AI)
│   ├─ models/            # Mongoose models (User, Note)
│   ├─ routes/            # Hono route handlers
│   ├─ middleware/        # Auth and error handling middleware
│   ├─ lib/               # DB and environment configuration
│   └─ index.ts           # Entry point
├─ tsconfig.json
├─ package.json
└─ .env
