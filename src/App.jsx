import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AdminRoutes from './routes/AdminRoutes';
import EmployeeRoutes from './routes/EmployeeRoutes';
import ManagerRoutes from './routes/ManagerRoutes';
import HrRoutes from './routes/HrRoutes';
import TestPage from './pages/Test';
import VideoCallPage from './pages/Hr/VedioCallPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="admin/*" element={<AdminRoutes />} />

        {/* Employee Routes */}
        <Route path="employee/*" element={<EmployeeRoutes />} />

        {/* Manager Routes */}
        <Route path="manager/*" element={<ManagerRoutes />} />

        {/* HR Routes */}
        <Route path="hr/*" element={<HrRoutes />} />

        {/* Redirect */}
        <Route path="/" element={<Navigate to="employee/login" />} />
       
        <Route path="/test" element={<TestPage/>} />
        <Route path="/chat/video-call/:roomId" element={<VideoCallPage /> } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
