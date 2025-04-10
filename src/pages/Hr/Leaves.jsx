import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import NotificationBox from '../../components/notification/notificationBox';
import HrSidebar from '../../components/Sidebar/HrSidebar';
import useLeaves from '../../hooks/hr/useLeaves'; // Import the custom hook
import LeaveHistory from '../../components/hr/leave/LeaveHistory';
import LeaveSummary from '../../components/hr/leave/LeaveSummary';

const Leaves = () => {
  const { hr } = useSelector((state) => state.hrAuth);
  const userId = hr.hr._id;

  // Use the custom hook to fetch leaves
  const { leaves, loading } = useLeaves(userId);

  // Calculate the count of pending leaves
  const pendingLeavesCount = leaves.filter((leave) => leave.status === 'Pending' || leave.status === 'Approved').length;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <HrSidebar />
      </div>
      <div className="lg:hidden">
        <HrSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <header className="flex border bg-[#2F3849] mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3">
          <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <a className="flex-none font-semibold text-xl text-white focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
              Leaves and Overview
            </a>
            <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
              <Link to={'/hr/leaves/applyleave'}>
                <button className="px-4 py-2 rounded-full text-white hover:bg-white transition-colors duration-300 hover:text-slate-600 focus:outline-none focus:bg-blue-600">
                  Apply Leave
                </button>
              </Link>
            </div>
          </nav>
        </header>

        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <ScaleLoader color="#ffffff" height={35} width={4} radius={2} margin={2} />
        </Backdrop>

        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <LeaveHistory leaves={leaves} />
          <LeaveSummary pendingLeavesCount={pendingLeavesCount} />
        </div>
      </div>

      <NotificationBox userId={userId} />
    </div>
  );
};

export default Leaves;
