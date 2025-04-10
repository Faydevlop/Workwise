import React from 'react';
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar';
import NotificationBox from '../../components/notification/notificationBox';
import { useSelector } from 'react-redux';
import { Backdrop } from '@mui/material';
import { ScaleLoader } from 'react-spinners';
import useEmployeeMeetings from '../../hooks/employee/useEmployeeMeetings';
import MeetingListTable from '../../components/employee/Meetings/MeetingListTable';

const EmployeeMeetingSchedule = () => {
  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee?.user?._id;

  const { listData, loading } = useEmployeeMeetings(userId);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar />
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-[#2F3849] text-white py-4 px-6 flex items-center justify-between">
            <span className="text-xl">Meetings List</span>
          </header>

          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
            <ScaleLoader color="#ffffff" height={35} width={4} radius={2} margin={2} />
          </Backdrop>

          <main className="flex-1 p-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold">Upcoming Meetings</h3>
                <p className="text-sm text-muted-foreground">View and manage your upcoming meetings.</p>
              </div>
              <div className="p-6">
                <MeetingListTable listData={listData} />
              </div>
            </div>
          </main>
        </div>
        <NotificationBox userId={userId} />
      </div>
    </div>
  );
};

export default EmployeeMeetingSchedule;
