// HrRoutes.js
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HrLogin from '../pages/Hr/Hrlogin';
import HrDashboard from '../pages/Hr/HrDashboard';
import EmployeeRecords from '../pages/Hr/EmployeeRecords';
import PayrollManagement from '../pages/Hr/PayrollManagement';
import Recruitment from '../pages/Hr/Recruitment';
import HrProfile from '../pages/Hr/HrProfile';
import HrChat from '../pages/Hr/HrChat';
import HrMeetings from '../pages/Hr/HrMeetings';
import Leaves from '../pages/Hr/Leaves';
import LeaveRequests from '../pages/Hr/leaveManagement/LeaveRequests';
import Payrolldettails from '../pages/Hr/payrolldetails/Payrolldettails';
import AddMeeting from '../pages/Hr/meetingmanagement/AddMeeting';
import EditMeeting from '../pages/Hr/meetingmanagement/EditMeeting';
import AddJobPost from '../pages/Hr/requirementmanagement/AddJobPost';
import Detailview from '../pages/Hr/requirementmanagement/Detailview';
import EditJobPost from '../pages/Hr/requirementmanagement/EditJobPost';
import EditProfile from '../pages/Hr/EditProfile';
import ChangePass from '../pages/Hr/ChangePass';
import VideoCallPage from '../pages/Hr/VedioCallPage';
// import EditHrProfile from '../pages/Hr/EditHrProfile';

const HrRoutes = () => {
  const isHrAuth = useSelector((state) => state.hrAuth.isAuthenticated);

  return (
    <Routes>
      <Route path="login" element={isHrAuth ? <Navigate to="/hr/dashboard" /> : <HrLogin /> } />
      <Route path="dashboard" element={isHrAuth ? <HrDashboard /> : <Navigate to="/hr/login" />} />
      <Route path="employeerecords" element={isHrAuth ? <EmployeeRecords /> : <Navigate to="/hr/login" />} />
      <Route path="payrollmanagement" element={isHrAuth ? <PayrollManagement /> : <Navigate to="/hr/login" />} />
      <Route path="payrollmanagement/edit/:userId" element={isHrAuth ? <Payrolldettails /> : <Navigate to="/hr/login" />} />
      <Route path="leaves" element={isHrAuth ? <Leaves /> : <Navigate to="/hr/login" />} />
      <Route path="leaves/applyleave" element={isHrAuth ? <LeaveRequests /> : <Navigate to="/hr/login" />} />
      <Route path="recruitment" element={isHrAuth ? <Recruitment /> : <Navigate to="/hr/login" />} />
      <Route path="recruitment/addpost" element={isHrAuth ? <AddJobPost /> : <Navigate to="/hr/login" />} />
      <Route path="recruitment/view/:reqId" element={isHrAuth ? <Detailview /> : <Navigate to="/hr/login" />} />
      <Route path="recruitment/editlist/:jobId" element={isHrAuth ? <EditJobPost /> : <Navigate to="/hr/login" />} />
      <Route path="profile" element={isHrAuth ? <HrProfile /> : <Navigate to="/hr/login" />} />
      <Route path="profile/editprofile/:userId" element={isHrAuth ? <EditProfile /> : <Navigate to="/hr/login" />} />
      <Route path="request-reset-password" element={isHrAuth ? <ChangePass /> : <Navigate to="/hr/login" />} />
      <Route path="meetings" element={isHrAuth ? <HrMeetings /> : <Navigate to="/hr/login" />} />
      <Route path="meetings/addmeeting" element={isHrAuth ? <AddMeeting /> : <Navigate to="/hr/login" />} />
      <Route path="meetings/editmeeting/:meetingId" element={isHrAuth ? <EditMeeting /> : <Navigate to="/hr/login" />} />
      <Route path="chat" element={isHrAuth ? <HrChat /> : <Navigate to="/hr/login" />} />
      {/* <Route path="chat/video-call" element={isHrAuth ? <VideoCallPage /> : <Navigate to="/hr/login" />} /> */}
      
      {/* <Route path="hr/editprofile/:userId" element={isHrAuth ? <EditHrProfile /> : <Navigate to="/hr/login" />} /> */}
    </Routes>
  );
};

export default HrRoutes;
