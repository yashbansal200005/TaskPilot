import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import AdminNavbar from '../../components/AdminNavbar';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await axios.get('/admin/tasks');
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-[#F0FDF4]">
      <AdminNavbar />

      <div className="p-6 md:p-10">
        <h1 className="text-3xl font-bold text-[#333333] mb-6">All Tasks</h1>

        {tasks.length === 0 ? (
          <p className="text-[#333333] text-lg">No tasks found.</p>
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
                <p className="text-[#333333]"><strong>Agent:</strong> {task.agentId?.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTasks;
