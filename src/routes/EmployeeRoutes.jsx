import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { Suspense, lazy } from 'react';
import LoadingSpinner from '../components/Loaders/LoadingSpinner';

// Lazy-loaded components
const EmployeeLogin = lazy(() => import('../pages/employee/EmployeeLogin'));
const EmployeeDashboard = lazy(() => import('../pages/employee/EmployeeDashboard'));
const EmployeeTaskmanagment = lazy(() => import('../pages/employee/EmployeeTaskmanagment'));
const EmployeeMeetingSchedule = lazy(() => import('../pages/employee/EmployeeMeetingSchedule'));
const EmployeePayroll = lazy(() => import('../pages/employee/EmployeePayroll'));
const EmployeeLeavemanagment = lazy(() => import('../pages/employee/EmployeeLeavemanagment'));
const EmployeeChat = lazy(() => import('../pages/employee/EmployeeChat'));
const EmployeeProfile = lazy(() => import('../pages/employee/EmployeeProfile'));
const EditProfile = lazy(() => import('../pages/employee/EditProfile'));
const ResetPassword = lazy(() => import('../pages/employee/ResetPass'));
const Resetpage = lazy(() => import('../pages/employee/Resetpage'));
const ApplyLeave = lazy(() => import('../pages/employee/leavemanagment/ApplyLeave'));
const LeaveDetailpage = lazy(() => import('../pages/employee/leavemanagment/LeaveDetailpage'));
const TaskDetails = lazy(() => import('../pages/employee/taskmanagement/TaskDetails'));
const Jobsection = lazy(() => import('../pages/employee/Jobsection'));
const ReferForm = lazy(() => import('../pages/employee/ReferForm'));

function EmployeeRoutes() {
  const isEmployeeAuth = useSelector((state) => state.employeeAuth.isAuthenticated);

  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <Routes>
        {/* Authentication Routes */}
        <Route path="login" element={isEmployeeAuth ? <Navigate to="/employee/dashboard" /> : <EmployeeLogin />} />
        <Route path="reset-password" element={<Resetpage />} />
        <Route path="request-reset-password" element={isEmployeeAuth ? <ResetPassword /> : <Navigate to="/employee/login" />} />

        {/* Dashboard */}
        <Route path="dashboard" element={isEmployeeAuth ? <EmployeeDashboard /> : <Navigate to="/employee/login" />} />

        {/* Task Management */}
        <Route path="tasks" element={isEmployeeAuth ? <EmployeeTaskmanagment /> : <Navigate to="/employee/login" />} />
        <Route path="tasks/details/:taskId" element={isEmployeeAuth ? <TaskDetails /> : <Navigate to="/employee/login" />} />

        {/* Meeting Schedule */}
        <Route path="meetings" element={isEmployeeAuth ? <EmployeeMeetingSchedule /> : <Navigate to="/employee/login" />} />

        {/* Payroll */}
        <Route path="payroll" element={isEmployeeAuth ? <EmployeePayroll /> : <Navigate to="/employee/login" />} />

        {/* Leave Management */}
        <Route path="leave" element={isEmployeeAuth ? <EmployeeLeavemanagment /> : <Navigate to="/employee/login" />} />
        <Route path="leave/applyLeave" element={isEmployeeAuth ? <ApplyLeave /> : <Navigate to="/employee/login" />} />
        <Route path="leave/details/:leaveId" element={isEmployeeAuth ? <LeaveDetailpage /> : <Navigate to="/employee/login" />} />

        {/* Profile Management */}
        <Route path="profile" element={isEmployeeAuth ? <EmployeeProfile /> : <Navigate to="/employee/login" />} />
        <Route path="editprofile/:userId" element={isEmployeeAuth ? <EditProfile /> : <Navigate to="/employee/login" />} />

        {/* Chat */}
        <Route path="chat" element={isEmployeeAuth ? <EmployeeChat /> : <Navigate to="/employee/login" />} />

        {/* Job Section */}
        <Route path="jobs" element={isEmployeeAuth ? <Jobsection /> : <Navigate to="/employee/login" />} />
        <Route path="jobs/refer/:jobId" element={isEmployeeAuth ? <ReferForm /> : <Navigate to="/employee/login" />} />
      </Routes>
    </Suspense>
  );
}

export default EmployeeRoutes;
