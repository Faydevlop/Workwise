import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AdminLogin from './pages/admin/AdminLogin';
import AdminSignin from './pages/admin/AdminSignin';

// Admin pages
import Usermanagment from './pages/admin/Usermanagment';
import Departmentmanagment from './pages/admin/Departmentmanagment';
import Projectmanagment from './pages/admin/Projectmanagment';
import AdminChat from './pages/admin/Chat';
import Payrollmanagment from './pages/admin/Payrollmanagment';
import Profile from './pages/admin/Profile';
import Leavemanagment from './pages/admin/Leavemanagment';
import AdminDashBoard from './pages/admin/Dashboard';
import AddUser from './pages/admin/AddUser';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/signin" element={<AdminSignin />} />
        
        {/* Private Routes */}
        <Route 
          path="admin/dashboard" 
          element={isAuthenticated ? <AdminDashBoard /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="admin/Usermanagment" 
          element={isAuthenticated ? <Usermanagment /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="admin/Usermanagment/adduser" 
          element={isAuthenticated ? <AddUser /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="admin/Leavemanagment" 
          element={isAuthenticated ? <Leavemanagment /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="admin/Departmentmanagment" 
          element={isAuthenticated ? <Departmentmanagment /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="admin/Projectmanagment" 
          element={isAuthenticated ? <Projectmanagment /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="admin/Profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="admin/Chat" 
          element={isAuthenticated ? <AdminChat /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="admin/Payrollmanagment" 
          element={isAuthenticated ? <Payrollmanagment /> : <Navigate to="/admin/login" />} 
        />



        {/* Redirect */}
        <Route path="/" element={<Navigate to="admin/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
