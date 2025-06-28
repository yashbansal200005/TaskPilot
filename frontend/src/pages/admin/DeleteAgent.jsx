import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

const DeleteAgent = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {
    try {
      const { data } = await axios.get('/admin/agents');
      setAgents(data);
    } catch (err) {
      alert('Failed to fetch agents');
    }
  };

  const handleDelete = async (agentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this agent?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/admin/agent/${agentId}`);
      alert('Agent deleted');
      setAgents((prev) => prev.filter((a) => a._id !== agentId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete agent');
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-[#F0FDF4]">
      <AdminNavbar />

      <div className="p-6 md:p-10">
        <h1 className="text-3xl font-bold text-[#333333] mb-6">Delete Agent</h1>

        {agents.length === 0 ? (
          <p className="text-[#333333] text-lg">No agents found.</p>
        ) : (
          <div className="space-y-5">
            {agents.map((agent) => (
              <div
                key={agent._id}
                className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="text-[#333333]"><strong>Name:</strong> {agent.name}</p>
                  <p className="text-[#333333]"><strong>Email:</strong> {agent.email}</p>
                  <p className="text-[#333333]"><strong>Mobile:</strong> {agent.mobile}</p>
                </div>
                <button
                  onClick={() => handleDelete(agent._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteAgent;
