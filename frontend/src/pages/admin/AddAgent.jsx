import { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

const AddAgent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/add-agent', form);
      alert('Agent added successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add agent');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4]">
      <AdminNavbar />

      <div className="flex justify-center items-center h-[calc(100vh-70px)] px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-5 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-[#333333]">Add Agent</h2>

          {['name', 'email', 'mobile', 'password'].map((field) => (
            <input
              key={field}
              name={field}
              type={field === 'password' ? 'password' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#93C5FD]"
              value={form[field]}
              onChange={handleChange}
              required
            />
          ))}

          <button
            type="submit"
            className="bg-[#93C5FD] text-white px-4 py-2 w-full rounded-md hover:bg-[#3B82F6] transition duration-300"
          >
            Add Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAgent;
