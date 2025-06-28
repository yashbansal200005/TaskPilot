import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

const AdminDashboard = () => {
  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {
    const { data } = await axios.get('/admin/agents');
    setAgents(data);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-[#F0FDF4]">
      <AdminNavbar />

      <div className="p-6 md:p-10">
        <h2 className="text-3xl font-bold text-[#333333] mb-6">Agents</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <p className="text-[#333333]"><strong>Name:</strong> {agent.name}</p>
              <p className="text-[#333333]"><strong>Email:</strong> {agent.email}</p>
              <p className="text-[#333333]"><strong>Mobile:</strong> {agent.mobile}</p>
              <Link
                to={`/admin/agent/${agent._id}`}
                className="mt-4 inline-block bg-[#93C5FD] text-white px-4 py-2 rounded-md hover:bg-[#3B82F6] transition duration-300"
              >
                View Tasks
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
