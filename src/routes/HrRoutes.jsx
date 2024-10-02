import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { Suspense, lazy } from 'react';

// Lazy-loaded components
const HrLogin = lazy(() => import('../pages/Hr/Hrlogin'));
const HrDashboard = lazy(() => import('../pages/Hr/HrDashboard'));
const EmployeeRecords = lazy(() => import('../pages/Hr/EmployeeRecords'));
const PayrollManagement = lazy(() => import('../pages/Hr/PayrollManagement'));
const Recruitment = lazy(() => import('../pages/Hr/Recruitment'));
const HrProfile = lazy(() => import('../pages/Hr/HrProfile'));
const HrChat = lazy(() => import('../pages/Hr/HrChat'));
const HrMeetings = lazy(() => import('../pages/Hr/HrMeetings'));
const Leaves = lazy(() => import('../pages/Hr/Leaves'));
const LeaveRequests = lazy(() => import('../pages/Hr/leaveManagement/LeaveRequests'));
const Payrolldettails = lazy(() => import('../pages/Hr/payrolldetails/Payrolldettails'));
const AddMeeting = lazy(() => import('../pages/Hr/meetingmanagement/AddMeeting'));
const EditMeeting = lazy(() => import('../pages/Hr/meetingmanagement/EditMeeting'));
const AddJobPost = lazy(() => import('../pages/Hr/requirementmanagement/AddJobPost'));
const Detailview = lazy(() => import('../pages/Hr/requirementmanagement/Detailview'));
const EditJobPost = lazy(() => import('../pages/Hr/requirementmanagement/EditJobPost'));
const EditProfile = lazy(() => import('../pages/Hr/EditProfile'));
const ChangePass = lazy(() => import('../pages/Hr/ChangePass'));
const VideoCallPage = lazy(() => import('../pages/Hr/VedioCallPage')); // Uncomment this if used

const HrRoutes = () => {
  const isHrAuth = useSelector((state) => state.hrAuth.isAuthenticated);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="login" element={isHrAuth ? <Navigate to="/hr/dashboard" /> : <HrLogin />} />
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

        {/* Uncomment if using the Video Call Page */}
        {/* <Route path="chat/video-call" element={isHrAuth ? <VideoCallPage /> : <Navigate to="/hr/login" />} /> */}
      </Routes>
    </Suspense>
  );
};

export default HrRoutes;
