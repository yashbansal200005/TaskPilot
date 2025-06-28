// import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// // Admin Pages
// import AdminLogin from './pages/admin/AdminLogin';
// import RegisterAdmin from './pages/admin/RegisterAdmin';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AddAgent from './pages/admin/AddAgent';
// import UploadTasks from './pages/admin/UploadTasks';
// import AgentTasksPage from './pages/admin/AgentTasks';
// import AllTasks from './pages/admin/AllTasks';
// import DeleteAgent from './pages/admin/DeleteAgent';

// // Agent Pages
// import AgentLogin from './pages/agent/AgentLogin';
// import AgentTasks from './pages/agent/AgentTasks';

// function App() {
//   const { adminInfo } = useSelector((state) => state.admin);
//   const { agentInfo } = useSelector((state) => state.agent);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* ✅ Home with Conditional Redirect */}
//         <Route
//           path="/"
//           element={
//             adminInfo ? (
//               <Navigate to="/admin/dashboard" />
//             ) : agentInfo ? (
//               <Navigate to="/agent/tasks" />
//             ) : (
//               <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100">
//                 <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full animate-fadeIn">
//                   <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
//                     Welcome to <span className="text-blue-300">TaskPilot</span>
//                   </h1>
//                   <p className="text-gray-600 mb-6">
//                     Streamline your task assignments and boost productivity.
//                   </p>
//                   <div className="flex justify-center gap-4">
//                     <Link
//                       to="/admin/login"
//                       className="px-6 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-500 transition duration-300"
//                     >
//                       Admin Login
//                     </Link>
//                     <Link
//                       to="/agent/login"
//                       className="px-6 py-2 bg-green-300 text-white rounded-lg hover:bg-green-500 transition duration-300"
//                     >
//                       Agent Login
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             )
//           }
//         />

//         {/* ✅ Admin Routes */}
//         <Route
//           path="/admin/login"
//           element={adminInfo ? <Navigate to="/admin/dashboard" /> : <AdminLogin />}
//         />
//         <Route
//           path="/admin/register"
//           element={adminInfo ? <Navigate to="/admin/dashboard" /> : <RegisterAdmin />}
//         />
//         <Route
//           path="/admin/dashboard"
//           element={adminInfo ? <AdminDashboard /> : <Navigate to="/admin/login" />}
//         />
//         <Route
//           path="/admin/add-agent"
//           element={adminInfo ? <AddAgent /> : <Navigate to="/admin/login" />}
//         />
//         <Route
//           path="/admin/upload-tasks"
//           element={adminInfo ? <UploadTasks /> : <Navigate to="/admin/login" />}
//         />
//         <Route
//           path="/admin/agent/:agentId"
//           element={adminInfo ? <AgentTasksPage /> : <Navigate to="/admin/login" />}
//         />
//         <Route
//           path="/admin/all-tasks"
//           element={adminInfo ? <AllTasks /> : <Navigate to="/admin/login" />}
//         />
//         <Route
//           path="/admin/delete-agent"
//           element={adminInfo ? <DeleteAgent /> : <Navigate to="/admin/login" />}
//         />

//         {/* ✅ Agent Routes */}
//         <Route
//           path="/agent/login"
//           element={agentInfo ? <Navigate to="/agent/tasks" /> : <AgentLogin />}
//         />
//         <Route
//           path="/agent/tasks"
//           element={agentInfo ? <AgentTasks /> : <Navigate to="/agent/login" />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthorized, selectAdminAuth, selectAgentAuth } from './app/store.js';
import { setAdminInfo, setLoading as setAdminLoading } from './features/adminSlice.js';
import { setAgentInfo, setLoading as setAgentLoading } from './features/agentSlice.js';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import RegisterAdmin from './pages/admin/RegisterAdmin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddAgent from './pages/admin/AddAgent';
import UploadTasks from './pages/admin/UploadTasks';
import AgentTasksPage from './pages/admin/AgentTasks';
import AllTasks from './pages/admin/AllTasks';
import DeleteAgent from './pages/admin/DeleteAgent';

// Agent Pages
import AgentLogin from './pages/agent/AgentLogin';
import AgentTasks from './pages/agent/AgentTasks';

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  const isAdminAuthorized = useSelector(selectAdminAuth);
  const isAgentAuthorized = useSelector(selectAgentAuth);

  useEffect(() => {
    // Check for existing authentication on app load
    const checkAuth = () => {
      const adminData = localStorage.getItem('adminAuth');
      const agentData = localStorage.getItem('agentAuth');
      
      if (adminData) {
        try {
          const parsedData = JSON.parse(adminData);
          dispatch(setAdminInfo(parsedData));
        } catch (error) {
          localStorage.removeItem('adminAuth');
        }
      }
      
      if (agentData) {
        try {
          const parsedData = JSON.parse(agentData);
          dispatch(setAgentInfo(parsedData));
        } catch (error) {
          localStorage.removeItem('agentAuth');
        }
      }
      
      dispatch(setAdminLoading(false));
      dispatch(setAgentLoading(false));
    };

    checkAuth();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Home with Conditional Redirect */}
        <Route
          path="/"
          element={
            isAuthorized ? (
              isAdminAuthorized ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/agent/tasks" />
              )
            ) : (
              <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100">
                <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full animate-fadeIn">
                  <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
                    Welcome to <span className="text-blue-300">TaskPilot</span>
                  </h1>
                  <p className="text-gray-600 mb-6">
                    Streamline your task assignments and boost productivity.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link
                      to="/admin/login"
                      className="px-6 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-500 transition duration-300"
                    >
                      Admin Login
                    </Link>
                    <Link
                      to="/agent/login"
                      className="px-6 py-2 bg-green-300 text-white rounded-lg hover:bg-green-500 transition duration-300"
                    >
                      Agent Login
                    </Link>
                  </div>
                </div>
              </div>
            )
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/login"
          element={isAdminAuthorized ? <Navigate to="/admin/dashboard" /> : <AdminLogin />}
        />
        <Route
          path="/admin/register"
          element={isAdminAuthorized ? <Navigate to="/admin/dashboard" /> : <RegisterAdmin />}
        />
        <Route
          path="/admin/dashboard"
          element={isAdminAuthorized ? <AdminDashboard /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/add-agent"
          element={isAdminAuthorized ? <AddAgent /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/upload-tasks"
          element={isAdminAuthorized ? <UploadTasks /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/agent/:agentId"
          element={isAdminAuthorized ? <AgentTasksPage /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/all-tasks"
          element={isAdminAuthorized ? <AllTasks /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/delete-agent"
          element={isAdminAuthorized ? <DeleteAgent /> : <Navigate to="/admin/login" />}
        />

        {/* Agent Routes */}
        <Route
          path="/agent/login"
          element={isAgentAuthorized ? <Navigate to="/agent/tasks" /> : <AgentLogin />}
        />
        <Route
          path="/agent/tasks"
          element={isAgentAuthorized ? <AgentTasks /> : <Navigate to="/agent/login" />}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;