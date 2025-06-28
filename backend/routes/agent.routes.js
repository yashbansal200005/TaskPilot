import express from 'express';
import { loginAgent, logoutAgent, getMyTasks } from '../controller/agent.controller.js';
import { agentProtect } from '../middleware/agentAuth.js';

const agentRouter = express.Router();

agentRouter.post('/login', loginAgent);
agentRouter.get('/logout', agentProtect, logoutAgent);
agentRouter.get('/my-tasks', agentProtect, getMyTasks);

export default agentRouter;
