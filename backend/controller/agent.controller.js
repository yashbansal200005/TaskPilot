import Agent from '../models/agent.models.js';
import Task from '../models/task.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Token generator for agents
const generateAgentToken = (res, agentId) => {
  const token = jwt.sign({ id: agentId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('agentJwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// ===== Agent Login =====
export const loginAgent = async (req, res) => {
  const { email, password } = req.body;

  const agent = await Agent.findOne({ email });

  if (agent && (await bcrypt.compare(password, agent.password))) {
    generateAgentToken(res, agent._id);
    res.json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      mobile: agent.mobile,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// ===== Agent Logout =====
export const logoutAgent = (req, res) => {
  res.cookie('agentJwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Agent logged out successfully' });
};

// ===== Get Agent's Own Tasks =====
export const getMyTasks = async (req, res) => {
  const tasks = await Task.find({ agentId: req.agent._id });
  res.json(tasks);
};
