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
import Payrollmanagement from '../pages/manager/Payrollmanagement';
import Editpage from '../pages/manager/payroll/Editpage';
import EditProfile from '../pages/manager/EditProfile';
import ResetPass from '../pages/manager/resetpassword';
import AddMeeting from '../pages/manager/meeting/AddMeeting';
import EditMeeting from '../pages/manager/meeting/EditMeeting';



const ManagerRoutes = () => {
  const isManagerAuth = useSelector((state) => state.managerAuth.isAuthenticated);

  return (
    <Routes>
     
      <Route path="login" element={isManagerAuth ? <Navigate to="/manager/dashboard" /> : <ManagerLogin /> } />
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
      {/* <Route path="chat/video-call" element={isManagerAuth ? <VideoCallPage /> : <Navigate to="/manager/login" />} /> */}
      <Route path="payrollmanagement" element={isManagerAuth ? <Payrollmanagement /> : <Navigate to="/manager/login" />} />
      <Route path="payrollmanagement/edit/:userId" element={isManagerAuth ? <Editpage /> : <Navigate to="/manager/login" />} />
      <Route path="leave/applyLeave" element={isManagerAuth ? <ApplyLeave /> : <Navigate to="/manager/login" />} />
      <Route path="tasksmanagement/addtask/:projectId" element={isManagerAuth ? <TaskForm /> : <Navigate to="/manager/login" />} />
      <Route path="tasksmanagement/detailpage/:taskId" element={isManagerAuth ? <TaskDetail /> : <Navigate to="/manager/login" />} />
      <Route path="request-reset-password" element={isManagerAuth ? <ResetPass /> : <Navigate to="/employee/login" />} />


    </Routes>
  );
};

export default ManagerRoutes;
