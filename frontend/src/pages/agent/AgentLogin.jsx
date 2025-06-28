import { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAgentInfo } from '../../features/agentSlice';

const AgentLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/agent/login', { email, password });
      dispatch(setAgentInfo(data));
      navigate('/agent/tasks');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#F0FDF4] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-5 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-[#333333]">Agent Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#5FD89E]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#5FD89E]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-[#5FD89E] text-white px-4 py-2 w-full rounded-md hover:bg-[#3BBF89] transition duration-300"
        >
          Login
        </button>

        <div className="text-center">
          <Link to="/" className="text-[#555] text-sm hover:underline">
            ⬅️ Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AgentLogin;
