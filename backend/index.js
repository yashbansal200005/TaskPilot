// index.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';  // ✅ Import CORS

// ✅ Import admin and agent routes
import adminrouter from './routes/admin.routes.js';
import agentRouter from './routes/agent.routes.js';

dotenv.config();

// ✅ Initialize app BEFORE middlewares
const app = express();

// ✅ Connect Database
connectDB();

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',  // ✅ Frontend URL
    credentials: true,                // ✅ Allow cookies
  })
);

// ✅ Register routes
app.use('/api/admin', adminrouter);
app.use('/api/agent', agentRouter);

// ✅ Default Route
app.get('/', (req, res) => {
  res.send('API is running and connected to MongoDB!');
});

// ✅ Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
