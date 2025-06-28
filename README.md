![image](https://github.com/user-attachments/assets/4c11da20-4237-4de6-b977-cf6073fcd1af)# TaskPilot - Task Management System
*Streamline your task assignments and boost productivity*

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Pages](#pages)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [API Endpoints](#api-endpoints)


## Introduction
**TaskPilot** is a full-stack task management system that allows administrators to assign tasks efficiently to agents. It features secure authentication and dynamic task distribution.

---

## Features

### ✅ Admin Panel
- Register and login as admin
- Add and manage agents
- Upload tasks via CSV/XLSX files
- View all tasks and agent-specific tasks
- Automatic task distribution logic

### ✅ Agent Panel
- Secure agent login
- View assigned tasks in a clean dashboard

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| 🏠 Home Page | `/` | Entry point of the app with navigation options |
| 🔐 Admin Login | `/admin/login` | Login page for admin |
| 🔐 Agent Login | `/agent/login` | Login page for agents |
| 📊 Admin Dashboard | `/admin/dashboard` | Admin area to manage agents and tasks |
| 📋 Agent Dashboard | `/agent/dashboard` | Interface for agents to view their assigned tasks |

---

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- CSV/XLSX parser for task distribution

### Frontend
- React.js
- Redux for state management
- Tailwind CSS for responsive UI
- React Router for page navigation
- Axios for API communication

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskpilot.git
   cd taskpilot
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. Run the development servers:
   ```bash
   # In backend
   npm run dev

   # In frontend
   npm run dev
   ```

---

## Usage

- Visit the **Home Page** at `/`
- Admins:
  - Register/Login via `/admin/login`
  - Access dashboard at `/admin/dashboard`
  - Add agents, upload tasks, and monitor task status
- Agents:
  - Login via `/agent/login`
  - Access dashboard at `/agent/dashboard`
  - View and manage assigned tasks

---

## Screenshots

- **Home Page**  
  ![Home Page](https://github.com/yashbansal200005/TaskPilot/blob/main/assets/Screenshot%202025-06-28%20172133.png?raw=true)

- **Admin Login**  
  ![Admin Login](https://github.com/yashbansal200005/TaskPilot/blob/main/assets/Screenshot%202025-06-28%20172147.png?raw=true)

- **Agent Login**  
  ![Agent Login](https://github.com/yashbansal200005/TaskPilot/blob/main/assets/Screenshot%202025-06-28%20172208.png?raw=true)

- **Admin Dashboard**  
  ![Admin Dashboard](https://github.com/yashbansal200005/TaskPilot/blob/main/assets/Screenshot%202025-06-28%20172456.png?raw=true)

- **Agent Dashboard**  
  ![Agent Dashboard](https://github.com/yashbansal200005/TaskPilot/blob/main/assets/Screenshot%202025-06-28%20172419.png?raw=true)

---

## API Endpoints

### Admin Routes
- `POST /admin/register` - Register new admin
- `POST /admin/login` - Admin login
- `POST /admin/add-agent` - Add new agent
- `GET /admin/agents` - Get list of agents
- `DELETE /admin/agent/:id` - Delete an agent
- `POST /admin/upload` - Upload tasks via CSV/XLSX
- `GET /admin/tasks` - View all tasks
- `GET /admin/tasks/agent/:agentId` - View agent-specific tasks

### Agent Routes
- `POST /agent/login` - Agent login
- `GET /agent/my-tasks` - Get logged-in agent's tasks

---
