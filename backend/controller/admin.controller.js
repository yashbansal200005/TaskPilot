import Admin from '../models/admin.models.js';
import Agent from '../models/agent.models.js';
import Task from '../models/task.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import csv from 'csvtojson';
import fs from 'fs';

// ====================== TOKEN GENERATION ======================
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// ====================== ADMIN AUTH ======================
export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  const admin = await Admin.create({ email, password });

  if (admin) {
    generateToken(res, admin._id);
    res.status(201).json({
      _id: admin._id,
      email: admin.email,
    });
  } else {
    res.status(400).json({ message: 'Invalid admin data' });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id);
    res.json({
      _id: admin._id,
      email: admin.email,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

export const logoutAdmin = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// ====================== AGENT MANAGEMENT ======================
export const addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const agentExists = await Agent.findOne({ email });
  if (agentExists) {
    return res.status(400).json({ message: 'Agent already exists' });
  }

  const agent = await Agent.create({
    name,
    email,
    mobile,
    password,
    adminId: req.admin._id,
  });

  res.status(201).json({ message: 'Agent created successfully', agent });
};

export const getAgents = async (req, res) => {
  const agents = await Agent.find({ adminId: req.admin._id }).select('-password');
  res.json(agents);
};

export const deleteAgent = async (req, res) => {
  const agent = await Agent.findOne({
    _id: req.params.id,
    adminId: req.admin._id,
  });

  if (!agent) {
    return res.status(404).json({ message: 'Agent not found' });
  }

  await agent.deleteOne();
  res.json({ message: 'Agent deleted successfully' });
};

// ====================== TASK DISTRIBUTION ======================
export const taskDistributor = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const agents = await Agent.find({ adminId: req.admin._id });

    if (agents.length === 0) {
      fs.unlinkSync(file.path);
      return res.status(400).json({ message: 'No agents found' });
    }

    const jsonArray = await csv().fromFile(file.path);

    const tasks = jsonArray.map((item, index) => ({
      firstName: item.FirstName||item.firstName,
      phone: item.Phone||item.phone,
      notes: item.Notes || ''||item.notes,
      adminId: req.admin._id,
      agentId: agents[index % agents.length]._id,
    }));

    await Task.insertMany(tasks);

    fs.unlinkSync(file.path); // Remove uploaded file after processing

    res.json({
      message: 'Tasks distributed successfully',
      totalTasks: tasks.length,
      agentsAssigned: agents.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====================== TASK FETCHING ======================
export const getTasksByAdminId = async (req, res) => {
  const tasks = await Task.find({ adminId: req.admin._id }).populate('agentId', 'name email');
  res.json(tasks);
};

export const getTasksByAgentId = async (req, res) => {
  const { agentId } = req.params;

  const agent = await Agent.findOne({
    _id: agentId,
    adminId: req.admin._id,
  });

  if (!agent) {
    return res.status(404).json({ message: 'Agent not found' });
  }

  const tasks = await Task.find({
    adminId: req.admin._id,
    agentId: agentId,
  });

  res.json(tasks);
};
