import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { Suspense } from 'react';

// Lazy Loading the Components
const ManagerLogin = React.lazy(() => import('../pages/manager/ManagerLogin'));
const ManagerDashboard = React.lazy(() => import('../pages/manager/ManagerDashboard'));
const ManagerUsermanagent = React.lazy(() => import('../pages/manager/ManagerUsermanagent'));
const LeaveManagement = React.lazy(() => import('../pages/manager/LeaveManagement'));
const TasktManagement = React.lazy(() => import('../pages/manager/TasktManagement'));
const Meetings = React.lazy(() => import('../pages/manager/Meetings'));
const ManagerProfile = React.lazy(() => import('../pages/manager/ManagerProfile'));
const Managerchat = React.lazy(() => import('../pages/manager/ManagerChat'));
const ApplyLeave = React.lazy(() => import('../pages/manager/leaveManagement/ApplyLeave'));
const TaskForm = React.lazy(() => import('../pages/manager/Taskmanagment/TaskForm'));
const TaskDetail = React.lazy(() => import('../pages/manager/Taskmanagment/TaskDetail'));
const Payrollmanagement = React.lazy(() => import('../pages/manager/Payrollmanagement'));
const Editpage = React.lazy(() => import('../pages/manager/payroll/Editpage'));
const EditProfile = React.lazy(() => import('../pages/manager/EditProfile'));
const ResetPass = React.lazy(() => import('../pages/manager/resetpassword'));
const AddMeeting = React.lazy(() => import('../pages/manager/meeting/AddMeeting'));
const EditMeeting = React.lazy(() => import('../pages/manager/meeting/EditMeeting'));

const ManagerRoutes = () => {
  const isManagerAuth = useSelector((state) => state.managerAuth.isAuthenticated);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="login" element={isManagerAuth ? <Navigate to="/manager/dashboard" /> : <ManagerLogin />} />
        <Route path="dashboard" element={isManagerAuth ? <ManagerDashboard /> : <Navigate to="/manager/login" />} />
        <Route path="usermanagement" element={isManagerAuth ? <ManagerUsermanagent /> : <Navigate to="/manager/login" />} />
        <Route path="leavemanagement" element={isManagerAuth ? <LeaveManagement /> : <Navigate to="/manager/login" />} />
        <Route path="tasksmanagement" element={isManagerAuth ? <TasktManagement /> : <Navigate to="/manager/login" />} />
        <Route path="meetings" element={isManagerAuth ? <Meetings /> : <Navigate to="/manager/login" />} />
        <Route path="meetings/addmeeting" element={isManagerAuth ? <AddMeeting /> : <Navigate to="/manager/login" />} />
        <Route path="meetings/editmeeting/:meetingId" element={isManagerAuth ? <EditMeeting /> : <Navigate to="/manager/login" />} />
        <Route path="profile" element={isManagerAuth ? <ManagerProfile /> : <Navigate to="/manager/login" />} />
        <Route path="profile/editprofile/:userId" element={isManagerAuth ? <EditProfile /> : <Navigate to="/manager/login" />} />
        <Route path="chat" element={isManagerAuth ? <Managerchat /> : <Navigate to="/manager/login" />} />
        <Route path="payrollmanagement" element={isManagerAuth ? <Payrollmanagement /> : <Navigate to="/manager/login" />} />
        <Route path="payrollmanagement/edit/:userId" element={isManagerAuth ? <Editpage /> : <Navigate to="/manager/login" />} />
        <Route path="leave/applyLeave" element={isManagerAuth ? <ApplyLeave /> : <Navigate to="/manager/login" />} />
        <Route path="tasksmanagement/addtask/:projectId" element={isManagerAuth ? <TaskForm /> : <Navigate to="/manager/login" />} />
        <Route path="tasksmanagement/detailpage/:taskId" element={isManagerAuth ? <TaskDetail /> : <Navigate to="/manager/login" />} />
        <Route path="request-reset-password" element={isManagerAuth ? <ResetPass /> : <Navigate to="/employee/login" />} />
      </Routes>
    </Suspense>
  );
};

export default ManagerRoutes;
