import { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

const UploadTasks = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Tasks uploaded successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
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
          <h2 className="text-3xl font-bold text-center text-[#333333]">
            Upload CSV/XLSX Tasks
          </h2>

          <input
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 px-4 py-2 w-full rounded-md text-sm file:text-sm file:border-none file:mr-4 file:bg-[#93C5FD] file:text-white file:rounded-md file:px-3 file:py-1 hover:file:bg-[#3B82F6]"
            required
          />

          <button
            type="submit"
            className="bg-[#93C5FD] text-white px-4 py-2 w-full rounded-md hover:bg-[#3B82F6] transition duration-300"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadTasks;
