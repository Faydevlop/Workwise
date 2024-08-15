import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AdminLogin from './pages/admin/AdminLogin';
import AdminSignin from './pages/admin/AdminSignin';

// Admin pages
import Departmentmanagment from './pages/admin/Departmentmanagment';
import AdminChat from './pages/admin/Chat';
import Payrollmanagment from './pages/admin/Payrollmanagment';
import Profile from './pages/admin/Profile';
import Projectmanagment from './pages/admin/Projectmanagment';
import Leavemanagment from './pages/admin/Leavemanagment';
import AdminDashBoard from './pages/admin/Dashboard';

import Usermanagment from './pages/admin/Usermanagment';
import AddUser from './pages/admin/AddUser';
import Showuser from './pages/admin/Showuser';
import EditUser from './pages/admin/EditUser';

// employee pages
import EmployeeLogin from './pages/employee/EmployeeLogin'
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeTaskmanagment from './pages/employee/EmployeeTaskmanagment';
import EmployeeMeetingSchedule from './pages/employee/EmployeeMeetingSchedule';
import EmployeePayroll from './pages/employee/EmployeePayroll';
import EmployeeLeavemanagment from './pages/employee/EmployeeLeavemanagment';
import EmployeeChat from './pages/employee/EmployeeChat';

import EmployeeProfile from './pages/employee/EmployeeProfile';
import EditProfile from './pages/employee/EditProfile';
import ResetPassword from './pages/employee/ResetPass';
import Resetpage from './pages/employee/Resetpage';
import AddProjectPage from './pages/admin/projectmanagment/AddProjectPage';
import ProjectDetailspage from './pages/admin/projectmanagment/ProjectDetailspage';
import EditProjectpage from './pages/admin/projectmanagment/EditProjectpage';
import LoginPage from './pages/Test';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import HrDashboard from './pages/Hr/HrDashboard';
import ManagerLogin from './pages/manager/ManagerLogin';
import Hrlogin from './pages/Hr/Hrlogin';


function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isEmployeeAuth = useSelector((state)=>state.employeeAuth.isAuthenticated)
  const isManagerAuth = useSelector((state)=>state.managerAuth.isAuthenticated)
  const isHrAuth =  useSelector((state)=>state.hrAuth.isAuthenticated)


  return (
    <BrowserRouter>
      <Routes>
      {/* Admin Routes */}
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/signin" element={<AdminSignin />} />
        
        {/* Private Routes */}

        <Route path="admin/dashboard" element={isAuthenticated ? <AdminDashBoard /> : <Navigate to="/admin/login" />} />

        <Route path="admin/Leavemanagment" element={isAuthenticated ? <Leavemanagment /> : <Navigate to="/admin/login" />} />
        <Route path="admin/Departmentmanagment" element={isAuthenticated ? <Departmentmanagment /> : <Navigate to="/admin/login" />} />

        {/* Project managment pages */}
        <Route path="admin/Projectmanagment" element={isAuthenticated ? <Projectmanagment /> : <Navigate to="/admin/login" />} />
        <Route path="admin/projectmanagment/addproject" element={isAuthenticated ? <AddProjectPage /> : <Navigate to="/admin/login" />} />
        <Route path="admin/projectmanagment/:projectId" element={isAuthenticated ? <ProjectDetailspage /> : <Navigate to="/admin/login" />} />
        <Route path="admin/projectmanagment/editproject/:projectId" element={isAuthenticated ? <EditProjectpage /> : <Navigate to="/admin/login" />} />


        <Route path="admin/Profile" element={isAuthenticated ? <Profile /> : <Navigate to="/admin/login" />} />
        <Route path="admin/editprofile/:userId" element={isAuthenticated ? <Projectmanagment /> : <Navigate to="/admin/login" />} />

        <Route path="admin/Chat" element={isAuthenticated ? <AdminChat /> : <Navigate to="/admin/login" />} />
        <Route path="admin/Payrollmanagment" element={isAuthenticated ? <Payrollmanagment /> : <Navigate to="/admin/login" />} />

        {/* User management pages */}
        <Route path="admin/Usermanagment" element={isAuthenticated ? <Usermanagment /> : <Navigate to="/admin/login" />} />
        <Route path="admin/Usermanagment/adduser" element={isAuthenticated ? <AddUser /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/showuser/:userId" element={isAuthenticated ? <Showuser /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/edituser/:userId" element={isAuthenticated ? <EditUser /> : <Navigate to="/admin/login" />} />

      {/* employee routes */}
      <Route path="employee/login" element={< EmployeeLogin/>} />
      <Route path="employee/dashboard" element={isEmployeeAuth ? <EmployeeDashboard /> : <Navigate to="/employee/login" />} />

      <Route path="employee/tasks" element={isEmployeeAuth ? <EmployeeTaskmanagment /> : <Navigate to="/employee/login" />} />
      <Route path="employee/meetings" element={isEmployeeAuth ? <EmployeeMeetingSchedule /> : <Navigate to="/employee/login" />} />
      <Route path="employee/payroll" element={isEmployeeAuth ? <EmployeePayroll /> : <Navigate to="/employee/login" />} />
      <Route path="employee/leave" element={isEmployeeAuth ? <EmployeeLeavemanagment /> : <Navigate to="/employee/login" />} />
      <Route path="employee/profile" element={isEmployeeAuth ? <EmployeeProfile /> : <Navigate to="/employee/login" />} />
      <Route path="employee/chat" element={isEmployeeAuth ? <EmployeeChat /> : <Navigate to="/employee/login" />} />
      <Route path="employee/editprofile/:userId" element={isEmployeeAuth ? <EditProfile /> : <Navigate to="/employee/login" />} />
      <Route path="employee/request-reset-password" element={isEmployeeAuth ? <ResetPassword /> : <Navigate to="/employee/login" />} />
      <Route path="employee/reset-password" element={ <Resetpage /> } />

      {/* manager routes */}
      <Route path="manager/login" element={ <ManagerLogin /> } />
      <Route path="manager/dashboard" element={isManagerAuth ? <ManagerDashboard /> :  <Navigate to="/manager/login" /> } />


      {/* HR side */}
      <Route path="hr/login" element={ <Hrlogin /> } />
      
      <Route path="hr/dashboard" element={ isHrAuth ? <HrDashboard /> :  <Navigate to="/hr/login" />  } />

      





        {/* Redirect */}
        <Route path="/" element={<Navigate to="employee/login" />} />
        <Route path="/test" element={<LoginPage/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
