import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Lazy load the components
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const AdminSignin = lazy(() => import('../pages/admin/AdminSignin'));
const Departmentmanagment = lazy(() => import('../pages/admin/Departmentmanagment'));
const AdminChat = lazy(() => import('../pages/admin/Chat'));
const Payrollmanagment = lazy(() => import('../pages/admin/Payrollmanagment'));
const Profile = lazy(() => import('../pages/admin/Profile'));
const Projectmanagment = lazy(() => import('../pages/admin/Projectmanagment'));
const Leavemanagment = lazy(() => import('../pages/admin/Leavemanagment'));
const AdminDashBoard = lazy(() => import('../pages/admin/Dashboard'));
const Usermanagment = lazy(() => import('../pages/admin/Usermanagment'));
const AddUser = lazy(() => import('../pages/admin/AddUser'));
const Showuser = lazy(() => import('../pages/admin/Showuser'));
const EditUser = lazy(() => import('../pages/admin/EditUser'));
const AddProjectPage = lazy(() => import('../pages/admin/projectmanagment/AddProjectPage'));
const ProjectDetailspage = lazy(() => import('../pages/admin/projectmanagment/ProjectDetailspage'));
const EditProjectpage = lazy(() => import('../pages/admin/projectmanagment/EditProjectpage'));
const LeaveDetailpage = lazy(() => import('../pages/admin/leaveManagement/LeaveDetailpage'));
const Departdetails = lazy(() => import('../pages/admin/departmentManagement/Departdetails'));
const AddDeparment = lazy(() => import('../pages/admin/departmentManagement/AddDeparment'));
const EditDepartment = lazy(() => import('../pages/admin/departmentManagement/EditDepartment'));
const PayrollDetails = lazy(() => import('../pages/admin/payroll/PayrollDetails'));
const AddPayroll = lazy(() => import('../pages/admin/payroll/AddPayroll'));
const EditPayroll = lazy(() => import('../pages/admin/payroll/Editpayoll'));
const PaySlipPage = lazy(() => import('../pages/admin/payroll/PaySlipPage'));

function AdminRoutes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="signin" element={<AdminSignin />} />
        <Route path="login" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
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
        <Route path="Payrollmanagment/details/export/:payrollId" element={isAuthenticated ? <PaySlipPage /> : <Navigate to="/admin/login" />} />
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
    </Suspense>
  );
}

export default AdminRoutes;
