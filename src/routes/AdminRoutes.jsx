import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AdminLogin from '../pages/admin/AdminLogin';
import AdminSignin from '../pages/admin/AdminSignin';
import Departmentmanagment from '../pages/admin/Departmentmanagment';
import AdminChat from '../pages/admin/Chat';
import Payrollmanagment from '../pages/admin/Payrollmanagment';
import Profile from '../pages/admin/Profile';
import Projectmanagment from '../pages/admin/Projectmanagment';
import Leavemanagment from '../pages/admin/Leavemanagment';
import AdminDashBoard from '../pages/admin/Dashboard';
import Usermanagment from '../pages/admin/Usermanagment';
import AddUser from '../pages/admin/AddUser';
import Showuser from '../pages/admin/Showuser';
import EditUser from '../pages/admin/EditUser';
import AddProjectPage from '../pages/admin/projectmanagment/AddProjectPage';
import ProjectDetailspage from '../pages/admin/projectmanagment/ProjectDetailspage';
import EditProjectpage from '../pages/admin/projectmanagment/EditProjectpage';
import LeaveDetailpage from '../pages/admin/leaveManagement/LeaveDetailpage';
import Departdetails from '../pages/admin/departmentManagement/Departdetails';
import AddDeparment from '../pages/admin/departmentManagement/AddDeparment';
import EditDepartment from '../pages/admin/departmentManagement/EditDepartment';
import PayrollDetails from '../pages/admin/payroll/PayrollDetails';
import AddPayroll from '../pages/admin/payroll/AddPayroll';
import EditPayroll from '../pages/admin/payroll/Editpayoll';

function AdminRoutes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="signin" element={<AdminSignin />} />

      <Route path="dashboard" element={isAuthenticated ? <AdminDashBoard /> : <Navigate to="/admin/login" />} />
      <Route path="Leavemanagment" element={isAuthenticated ? <Leavemanagment /> : <Navigate to="/admin/login" />} />
      <Route path="Departmentmanagment" element={isAuthenticated ? <Departmentmanagment /> : <Navigate to="/admin/login" />} />
      <Route path="Projectmanagment" element={isAuthenticated ? <Projectmanagment /> : <Navigate to="/admin/login" />} />
      <Route path="projectmanagment/addproject" element={isAuthenticated ? <AddProjectPage /> : <Navigate to="/admin/login" />} />
      <Route path="projectmanagment/:projectId" element={isAuthenticated ? <ProjectDetailspage /> : <Navigate to="/admin/login" />} />
      <Route path="projectmanagment/editproject/:projectId" element={isAuthenticated ? <EditProjectpage /> : <Navigate to="/admin/login" />} />
      <Route path="Profile" element={isAuthenticated ? <Profile /> : <Navigate to="/admin/login" />} />
      <Route path="editprofile/:userId" element={isAuthenticated ? <Projectmanagment /> : <Navigate to="/admin/login" />} />
      <Route path="Chat" element={isAuthenticated ? <AdminChat /> : <Navigate to="/admin/login" />} />
      <Route path="Payrollmanagment" element={isAuthenticated ? <Payrollmanagment /> : <Navigate to="/admin/login" />} />
      <Route path="Payrollmanagment/details/:payrollId" element={isAuthenticated ? <PayrollDetails /> : <Navigate to="/admin/login" />} />
      <Route path="Payrollmanagment/edit/:payrollId" element={isAuthenticated ? <EditPayroll /> : <Navigate to="/admin/login" />} />
      <Route path="Payrollmanagment/addpayroll" element={isAuthenticated ? <AddPayroll /> : <Navigate to="/admin/login" />} />
      <Route path="Usermanagment" element={isAuthenticated ? <Usermanagment /> : <Navigate to="/admin/login" />} />
      <Route path="Usermanagment/adduser" element={isAuthenticated ? <AddUser /> : <Navigate to="/admin/login" />} />
      <Route path="showuser/:userId" element={isAuthenticated ? <Showuser /> : <Navigate to="/admin/login" />} />
      <Route path="edituser/:userId" element={isAuthenticated ? <EditUser /> : <Navigate to="/admin/login" />} />
      <Route path="leavedetails/:leaveId" element={isAuthenticated ? <LeaveDetailpage /> : <Navigate to="/admin/login" />} />
      <Route path="department/:departmentId" element={isAuthenticated ? <Departdetails /> : <Navigate to="/admin/login" />} />
      <Route path="addDepartment" element={isAuthenticated ? <AddDeparment /> : <Navigate to="/admin/login" />} />
      <Route path="editdepartment/:departmentId" element={isAuthenticated ? <EditDepartment /> : <Navigate to="/admin/login" />} />
      
    </Routes>
  );
}

export default AdminRoutes;
