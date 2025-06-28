import { useState } from 'react';
import axios from '../../api/axios';
import { useDispatch } from 'react-redux';
import { setAdminInfo } from '../../features/adminSlice';
import { useNavigate, Link } from 'react-router-dom';

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/admin/register', { email, password });
      dispatch(setAdminInfo(data));
      navigate('/admin/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F0FDF4]">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-5 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-[#333333] text-center">Register Admin</h2>

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#93C5FD]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#93C5FD]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-[#93C5FD] text-white px-4 py-2 w-full rounded-md hover:bg-[#3B82F6] transition duration-300"
        >
          Register
        </button>

        <p className="text-sm text-center text-[#333333]">
          Already have an account?{' '}
          <Link to="/admin/login" className="text-[#93C5FD] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterAdmin;
