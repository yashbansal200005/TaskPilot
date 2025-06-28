# TaskPilot - Task Management System
*Streamline your task assignments and boost productivity*

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [API Endpoints](#api-endpoints)


## Introduction
TaskPilot is a comprehensive task management system designed to help administrators distribute tasks efficiently among agents. The system features separate interfaces for administrators and agents, with secure authentication and task distribution capabilities.

![Admin Dashboard](https://via.placeholder.com/600x400?text=Admin+Dashboard)

## Features

### Admin Panel
- Register and login for administrators
- Add, view, and delete agents
- Upload tasks via CSV/XLSX files
- Automatic task distribution among agents
- View all tasks and agent-specific tasks

### Agent Panel
- Secure agent login
- View assigned tasks
- Clean interface for task management

![Agent Interface](https://via.placeholder.com/600x400?text=Agent+Interface)

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- CSV parser for task distribution

### Frontend
- React.js
- Redux for state management
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

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

4. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. Start the development servers:
   ```bash
   # In backend directory
   npm run dev

   # In frontend directory
   npm run dev
   ```

![Installation Process](https://via.placeholder.com/600x400?text=Installation+Process)

## Usage

1. **Admin Access**:
   - Register as an admin at `/admin/register`
   - Login at `/admin/login`
   - Add agents through the dashboard
   - Upload tasks via CSV/XLSX files

2. **Agent Access**:
   - Agents can login at `/agent/login`
   - View assigned tasks on their dashboard

3. **Task Distribution**:
   - Upload a CSV file with tasks (FirstName, Phone, Notes columns)
   - Tasks will be automatically distributed among available agents

![Task Distribution](https://via.placeholder.com/600x400?text=Task+Distribution)

## Screenshots

1. Admin Dashboard  
   ![Admin Dashboard](https://via.placeholder.com/600x400?text=Admin+Dashboard+View)

2. Task Upload Interface  
   ![Upload Interface](https://via.placeholder.com/600x400?text=Task+Upload+Screen)

## API Endpoints

### Admin Routes
- `POST /admin/register` - Register new admin
- `POST /admin/login` - Admin login
- `POST /admin/add-agent` - Add new agent
- `GET /admin/agents` - Get all agents
- `DELETE /admin/agent/:id` - Delete agent
- `POST /admin/upload` - Upload tasks (CSV/XLSX)
- `GET /admin/tasks` - Get all tasks
- `GET /admin/tasks/agent/:agentId` - Get tasks by agent

### Agent Routes
- `POST /agent/login` - Agent login
- `GET /agent/my-tasks` - Get agent's tasks

