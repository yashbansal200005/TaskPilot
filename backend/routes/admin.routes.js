import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  addAgent,
  getAgents,
  deleteAgent,
  taskDistributor,
  getTasksByAdminId,
  getTasksByAgentId
} from '../controller/admin.controller.js';

import { adminProtect } from '../middleware/adminAuth.js';
import multer from 'multer';

const adminrouter = express.Router();

// File upload config using multer
const upload = multer({ dest: 'uploads/' });

// Auth routes
adminrouter.post('/register', registerAdmin);
adminrouter.post('/login', loginAdmin);
adminrouter.get('/logout', adminProtect, logoutAdmin);

// Agent management
adminrouter.post('/add-agent', adminProtect, addAgent);
adminrouter.get('/agents', adminProtect, getAgents);
adminrouter.delete('/agent/:id', adminProtect, deleteAgent);

// Task distribution and fetching
adminrouter.post('/upload', adminProtect, upload.single('file'), taskDistributor);
adminrouter.get('/tasks', adminProtect, getTasksByAdminId);
adminrouter.get('/tasks/agent/:agentId', adminProtect, getTasksByAgentId);

export default adminrouter;
