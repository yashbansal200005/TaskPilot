import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAdminInfo } from '../features/adminSlice';
import axios from '../api/axios';

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await axios.get('/admin/logout');
    dispatch(clearAdminInfo());
    navigate('/admin/login');
  };

  return (
    <nav className="bg-blue-50 text-[#333333] px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-[#5FD89E]">TaskPilot Admin</h1>
      <div className="flex flex-wrap gap-4">
        <Link to="/admin/dashboard" className="hover:text-[#5FD89E] font-medium">
          Dashboard
        </Link>
        <Link to="/admin/add-agent" className="hover:text-[#5FD89E] font-medium">
          Add Agent
        </Link>
        <Link to="/admin/upload-tasks" className="hover:text-[#5FD89E] font-medium">
          Upload Tasks
        </Link>
        <Link to="/admin/all-tasks" className="hover:text-[#5FD89E] font-medium">
          All Tasks
        </Link>
        <Link to="/admin/delete-agent" className="hover:text-[#5FD89E] font-medium">
          Delete Agent
        </Link>
        <button
          onClick={logoutHandler}
          className="text-red-500 hover:text-red-600 font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
