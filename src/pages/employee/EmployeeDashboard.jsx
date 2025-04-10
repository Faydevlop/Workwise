// EmployeeDashboard.js

import React from 'react';
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar';
import NotificationBox from '../../components/notification/notificationBox';
import { useSelector } from 'react-redux';
import useDashboardData from '../../hooks/employee/useDashboardData.js';

const EmployeeDashboard = () => {
  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee.user._id;

  const { meetings, tasks, payroll, leaves } = useDashboardData(); // using the custom hook

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar />
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>

      <div style={{ flex: 1, padding: '', overflow: 'auto', marginLeft: '0' }}>
        <header className="flex border bg-[#2F3849] mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3">
          <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <a className="flex-none font-semibold text-xl text-white focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
              Dashboard and Overview
            </a>
          </nav>
        </header>

        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <header className="sticky mb-5 top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"></header>

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {/* Render each card with respective data */}
              <Card title="Upcoming Meetings" data={meetings} />
              <Card title="Tasks" data={tasks} />
              <Card title="Payroll Info" data={payroll} />
              <Card title="Leave Requests" data={leaves} />
            </div>
          </main>

          <NotificationBox userId={userId} />
        </div>
      </div>
    </div>
  );
};

// Card Component to render data
const Card = ({ title, data }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
        <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">{title}</h3>
      </div>
      <div className="p-6">
        <div className="grid gap-2">
          {data.length ? (
            data.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name || item.meetingName || item.leaveType}</p>
                  <p className="text-xs text-muted-foreground">{new Date(item.date || item.dueDate || item.startDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.status || item.amount}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
