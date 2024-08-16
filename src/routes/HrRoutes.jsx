// HrRoutes.js
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HrLogin from '../pages/Hr/Hrlogin';
import HrDashboard from '../pages/Hr/HrDashboard';
// import EmployeeRecords from '../pages/Hr/EmployeeRecords';
// import PayrollManagement from '../pages/Hr/PayrollManagement';
// import LeaveRequests from '../pages/Hr/LeaveRequests';
// import Recruitment from '../pages/Hr/Recruitment';
// import HrProfile from '../pages/Hr/HrProfile';
// import HrChat from '../pages/Hr/HrChat';
// import EditHrProfile from '../pages/Hr/EditHrProfile';

const HrRoutes = () => {
  const isHrAuth = useSelector((state) => state.hrAuth.isAuthenticated);

  return (
    <Routes>
      <Route path="login" element={<HrLogin />} />
      <Route path="dashboard" element={isHrAuth ? <HrDashboard /> : <Navigate to="/hr/login" />} />
      {/* <Route path="hr/employeerecords" element={isHrAuth ? <EmployeeRecords /> : <Navigate to="/hr/login" />} />
      <Route path="hr/payrollmanagement" element={isHrAuth ? <PayrollManagement /> : <Navigate to="/hr/login" />} />
      <Route path="hr/leaverequests" element={isHrAuth ? <LeaveRequests /> : <Navigate to="/hr/login" />} />
      <Route path="hr/recruitment" element={isHrAuth ? <Recruitment /> : <Navigate to="/hr/login" />} />
      <Route path="hr/profile" element={isHrAuth ? <HrProfile /> : <Navigate to="/hr/login" />} />
      <Route path="hr/chat" element={isHrAuth ? <HrChat /> : <Navigate to="/hr/login" />} />
      <Route path="hr/editprofile/:userId" element={isHrAuth ? <EditHrProfile /> : <Navigate to="/hr/login" />} /> */}
    </Routes>
  );
};

export default HrRoutes;
