import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
