import jwt from 'jsonwebtoken';
import Agent from '../models/agent.models.js';

export const agentProtect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.agentJwt) {
    try {
      token = req.cookies.agentJwt;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.agent = await Agent.findById(decoded.id).select('-password');

      if (!req.agent) {
        return res.status(401).json({ message: 'Not authorized, agent not found' });
      }

      next();
    } catch (error) {
      console.error('Agent token failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
