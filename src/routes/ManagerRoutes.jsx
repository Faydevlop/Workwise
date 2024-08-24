// ManagerRoutes.js
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ManagerLogin from '../pages/manager/ManagerLogin';
import ManagerDashboard from '../pages/manager/ManagerDashboard';
import ManagerUsermanagent from '../pages/manager/ManagerUsermanagent';
import LeaveManagement from '../pages/manager/LeaveManagement';
import TasktManagement from '../pages/manager/TasktManagement';
import Meetings from '../pages/manager/Meetings';
import ManagerProfile from '../pages/manager/ManagerProfile';
import Managerchat from '../pages/manager/ManagerChat';
import ApplyLeave from '../pages/manager/leaveManagement/ApplyLeave';
import TaskForm from '../pages/manager/Taskmanagment/TaskForm';
import TaskDetail from '../pages/manager/Taskmanagment/TaskDetail';

const ManagerRoutes = () => {
  const isManagerAuth = useSelector((state) => state.managerAuth.isAuthenticated);

  return (
    <Routes>
      <Route path="login" element={<ManagerLogin />} />
      <Route path="dashboard" element={isManagerAuth ? <ManagerDashboard /> : <Navigate to="/manager/login" />} />
      <Route path="usermanagement" element={isManagerAuth ? <ManagerUsermanagent /> : <Navigate to="/manager/login" />} />
      <Route path="leavemanagement" element={isManagerAuth ? <LeaveManagement /> : <Navigate to="/manager/login" />} />
      <Route path="tasksmanagement" element={isManagerAuth ? <TasktManagement /> : <Navigate to="/manager/login" />} />
      <Route path="meetings" element={isManagerAuth ? <Meetings /> : <Navigate to="/manager/login" />} />
      <Route path="profile" element={isManagerAuth ? <ManagerProfile /> : <Navigate to="/manager/login" />} />
      <Route path="chat" element={isManagerAuth ? <Managerchat /> : <Navigate to="/manager/login" />} />
      <Route path="leave/applyLeave" element={isManagerAuth ? <ApplyLeave /> : <Navigate to="/manager/login" />} />
      <Route path="tasksmanagement/addtask/:projectId" element={isManagerAuth ? <TaskForm /> : <Navigate to="/manager/login" />} />
      <Route path="tasksmanagement/detailpage" element={isManagerAuth ? <TaskDetail /> : <Navigate to="/manager/login" />} />

    </Routes>
  );
};

export default ManagerRoutes;
