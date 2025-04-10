import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar';
import NotificationBox from '../../components/notification/notificationBox';
import { Backdrop } from '@mui/material';
import { ScaleLoader } from 'react-spinners';

import useEmployeeLeaves from '../../hooks/employee/useEmployeeLeaves';
import LeaveTable from '../../components/employee/leave/LeaveTable';
import LeaveSummary from '../../components/employee/leave/LeaveSummary';

const EmployeeLeaveManagement = () => {
  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee?.user?._id;
  const { leaves, loading } = useEmployeeLeaves(userId);

  return (
    <div className="flex h-full">
      <div className="hidden lg:block w-[250px]">
        <EmployeeSidebar />
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <header className="flex border bg-[#2F3849] mb-5 border-gray-200 pl-4 text-sm py-3">
          <nav className="w-full max-w-[85rem] mx-auto flex items-center justify-between px-4">
            <span className="text-white font-semibold text-xl">Leaves and Overview</span>
            <Link to="/employee/leave/applyleave">
              <button className="px-4 py-2 rounded-full text-white hover:bg-white hover:text-slate-600 transition">
                Apply Leave
              </button>
            </Link>
          </nav>
        </header>

        {/* Loader */}
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <ScaleLoader color="#fff" height={35} width={4} radius={2} margin={2} />
        </Backdrop>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LeaveTable leaves={leaves} />
          <LeaveSummary leaves={leaves} />
        </div>
      </div>

      <NotificationBox userId={userId} />
    </div>
  );
};

export default EmployeeLeaveManagement;
