# JudixTask - Full-Stack Task Management Application

> A modern, secure, and scalable task management application built for the Judix Full-Stack Developer Assignment.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwind-css)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Security Features](#-security-features)
- [Contributing](#-contributing)

## ✨ Features

### Core Functionality
- 🔐 **Secure Authentication** - JWT-based login/register with bcrypt password hashing
- ✅ **Task Management** - Full CRUD operations on tasks
- 🔍 **Search & Filter** - Real-time task search and status filtering
- 👤 **Profile Management** - Update name, email, and password
- 📊 **Statistics Dashboard** - Visual task completion tracking
- 🌓 **Theme Support** - Light, Dark, and System theme modes
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS

### Security Features
- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected API routes with middleware
- HTTP-only token storage
- Input validation on client and server

### UX Features
- Instant feedback with toast notifications
- Loading states on all async operations
- Form validation with helpful error messages
- Smooth transitions and animations
- Keyboard shortcuts (Enter to submit)

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Theme**: next-themes

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Environment**: dotenv
- **CORS**: cors

## 📁 Project Structure

```
judix-task-manager/
├── client/                    # Frontend (Next.js)
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx      # Main dashboard
│   │   ├── login/
│   │   │   └── page.tsx      # Login page
│   │   ├── register/
│   │   │   └── page.tsx      # Register page
│   │   ├── globals.css       # Global styles + theme
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Landing page
│   ├── components/           # Reusable components
│   │   ├── AddTaskInput.tsx
│   │   ├── CircularProgress.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── SettingsForm.tsx
│   │   ├── StatsCards.tsx
│   │   ├── TabSwitcher.tsx
│   │   ├── TaskFilters.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskList.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   ├── context/
│   │   └── AuthContext.tsx   # Authentication state
│   ├── lib/
│   │   ├── axios.ts          # API client with interceptors
│   │   └── validation.js     # Zod schemas
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   └── .env.local            # Frontend environment variables
│
├── server/                    # Backend (Express)
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js # Auth logic
│   │   └── taskController.js # Task logic
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Task.js           # Task schema
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   └── taskRoutes.js     # Task endpoints
│   ├── .env                  # Backend environment variables
│   └── index.js              # Server entry point
│
├── README.md                  # This file
├── SCALING.md                 # Scaling documentation
└── POSTMAN_COLLECTION.json    # API collection
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/vikramsingh-786/CRUD_APPLICATION.git
```

### Step 2: Setup Backend
```bash
cd server
npm install
```

Create `.env` file in `server/` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/crudclusters
JWT_SECRET=your_super_secret_jwt_key_here
```

Start the backend:
```bash
npm start
```

Server will run on `http://localhost:5000`

### Step 3: Setup Frontend
```bash
cd ../client
npm install
```

Create `.env.local` file in `client/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

Application will open on `http://localhost:3000`

### Step 4: Verify Installation
1. Navigate to `http://localhost:3000`
2. Click "Start for free" to register
3. Fill in the registration form
4. You should be redirected to the dashboard

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "_id": "64abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "_id": "64abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}

Response:
{
  "_id": "64abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Updated",
  "email": "johnupdated@example.com",
  "password": "newpassword123"  // optional
}

Response:
{
  "_id": "64abc123...",
  "name": "John Updated",
  "email": "johnupdated@example.com"
}
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer {token}

Response:
[
  {
    "_id": "64xyz789...",
    "title": "Complete project documentation",
    "description": "Write comprehensive README",
    "status": "pending",
    "user": "64abc123...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "New task title",
  "description": "Optional description"
}

Response:
{
  "_id": "64xyz789...",
  "title": "New task title",
  "description": "Optional description",
  "status": "pending",
  "user": "64abc123...",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "completed"
}

Response:
{
  "_id": "64xyz789...",
  "title": "New task title",
  "status": "completed",
  ...
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer {token}

Response:
{
  "message": "Task removed"
}
```

### Error Responses
All endpoints return consistent error formats:
```json
{
  "message": "Error description here"
}
```

Common status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000                                          # Server port
MONGO_URI=mongodb://127.0.0.1:27017/crudclusters # MongoDB connection
JWT_SECRET=your_super_secret_jwt_key_here        # JWT signing secret
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api    # Backend API URL
```

**Important**: Never commit `.env` files to version control!

## 📜 Scripts

### Frontend (client/)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Backend (server/)
```bash
npm start            # Start server with node
npm run dev          # Start with nodemon (auto-reload)
```

## 🔒 Security Features

### Password Security
- Passwords hashed using bcrypt with 10 salt rounds
- Never stored in plain text
- Minimum 6 characters enforced

### JWT Authentication
- Tokens expire after 30 days
- Stored in localStorage (consider httpOnly cookies for production)
- Verified on every protected route

### Input Validation
- Client-side validation with Zod
- Server-side validation in controllers
- Email format verification
- SQL injection protection via Mongoose

### CORS Configuration
- Configured to accept requests from frontend origin
- Can be restricted in production

## 🎨 Design Features

### Theme System
The application supports three theme modes:
- **Light Mode**: Clean, professional appearance
- **Dark Mode**: Eye-friendly for low-light environments
- **System**: Automatically matches OS preference

Themes are powered by CSS custom properties for instant switching.

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`
- Touch-friendly UI elements
- Optimized for all screen sizes

## 🧪 Testing the Application

### Manual Testing Checklist
- [ ] Register a new account
- [ ] Login with credentials
- [ ] Create a task
- [ ] Mark task as completed
- [ ] Search for a task
- [ ] Filter by status (all/pending/completed)
- [ ] Update profile information
- [ ] Change password
- [ ] Toggle theme (light/dark/system)
- [ ] Logout and verify token removal
- [ ] Try accessing dashboard without login (should redirect)

### Test Credentials
For quick testing, you can create a test account:
```
Email: test@example.com
Password: test123
```

## 📊 Performance Optimizations

- React components are properly memoized where needed
- Images and assets are optimized
- Tailwind CSS purges unused styles in production
- MongoDB indexes on frequently queried fields
- Axios interceptors reduce code duplication
- Debounced search input (if implemented)

## 🐛 Known Issues & Future Improvements

### Known Issues
- None currently reported

### Future Enhancements
- [ ] Add task due dates
- [ ] Email verification
- [ ] Forgot password flow
- [ ] Task categories/tags
- [ ] Drag-and-drop task reordering
- [ ] Export tasks to CSV/PDF
- [ ] Real-time updates with WebSockets
- [ ] Task sharing between users
- [ ] Mobile app (React Native)

## 📝 Assignment Completion Checklist

### ✅ Frontend Requirements
- [x] Built with Next.js (preferred framework)
- [x] Responsive design using Tailwind CSS
- [x] Forms with client-side validation
- [x] Protected routes (login required)

### ✅ Backend Requirements
- [x] Node.js/Express backend
- [x] User signup/login with JWT
- [x] Profile fetching/updating
- [x] CRUD operations on tasks
- [x] MongoDB database integration

### ✅ Dashboard Features
- [x] Display user profile
- [x] CRUD operations on tasks
- [x] Search and filter UI
- [x] Logout flow

### ✅ Security & Scalability
- [x] Password hashing (bcrypt)
- [x] JWT authentication middleware
- [x] Error handling & validation
- [x] Modular, scalable code structure

### ✅ Deliverables
- [x] GitHub repository with code
- [x] Functional authentication system
- [x] Dashboard with CRUD-enabled tasks
- [x] API documentation
- [x] Scaling documentation (SCALING.md)

## 👨‍💻 Developer Information

**Developed by**: Vikram Singh
**Email**: becomerdeveloper@gmail.com 
**Assignment**: Full-Stack Developer Intern  
**Submission Date**: January 2026

## 📄 License

This project was created as part of the Judix Full-Stack Developer Assignment.

## 🙏 Acknowledgments

- Judix for the assignment opportunity
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- MongoDB for the flexible database solution

---

**Note**: For detailed information about scaling this application for production, please refer to [SCALING.md](./SCALING.md).

For API testing, import the provided Postman collection: `POSTMAN_COLLECTION.json`
