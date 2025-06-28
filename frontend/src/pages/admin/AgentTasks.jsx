import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useParams } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

const AgentTasks = () => {
  const { agentId } = useParams();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await axios.get(`/admin/tasks/agent/${agentId}`);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [agentId]);

  return (
    <div>
      <AdminNavbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Tasks for Agent</h1>
        {tasks.length === 0 ? (
          <p>No tasks assigned to this agent.</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="border rounded p-4 shadow hover:shadow-lg"
              >
                <p><strong>Name:</strong> {task.firstName}</p>
                <p><strong>Phone:</strong> {task.phone}</p>
                <p><strong>Notes:</strong> {task.notes}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentTasks;
