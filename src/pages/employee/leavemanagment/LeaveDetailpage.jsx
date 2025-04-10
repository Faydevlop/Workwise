// src/pages/Employee/LeaveDetailpage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import EmployeeSidebar from '../../../components/Sidebar/EmployeeSidebar';
import useLeaveDetails from '../../../hooks/employee/useLeaveDetails';
import LeaveDetail from '../../../components/employee/leave/LeaveDetail';

const LeaveDetailpage = () => {
  const { leaveId } = useParams();
  const { data, loading, error } = useLeaveDetails(leaveId);

  if (loading) {
    return <div>Loading...</div>; // Optionally, show a loading spinner or message
  }

  if (error) {
    return <div>Error loading leave details.</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar />
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>

      <div className="bg-blue-50" style={{ flex: 1, padding: '10px', overflow: 'auto', marginLeft: '0' }}>
        <LeaveDetail data={data} />
      </div>
    </div>
  );
};

export default LeaveDetailpage;
