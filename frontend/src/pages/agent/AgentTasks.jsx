import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAgentInfo } from '../../features/agentSlice';

const AgentTasks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await axios.get('/agent/my-tasks');
    setTasks(data);
  };

  const logoutHandler = async () => {
    await axios.get('/agent/logout');
    dispatch(clearAgentInfo());
    navigate('/agent/login');
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-[#F0FDF4] p-6 md:p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#333333]">My Tasks</h1>
        <button
          onClick={logoutHandler}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-[#555] text-lg">No tasks assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <p className="text-[#333333]"><strong>Name:</strong> {task.firstName}</p>
              <p className="text-[#333333]"><strong>Phone:</strong> {task.phone}</p>
              <p className="text-[#333333]"><strong>Notes:</strong> {task.notes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentTasks;
