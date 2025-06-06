import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import NotificationBox from '../../components/notification/notificationBox';
import HrSidebar from '../../components/Sidebar/HrSidebar';
import useLeaves from '../../hooks/hr/useLeaves'; // Import the custom hook
import LeaveHistory from '../../components/hr/leave/LeaveHistory';
import LeaveSummary from '../../components/hr/leave/LeaveSummary';
import { TextField, Pagination } from '@mui/material'; // Import TextField and Pagination

const Leaves = () => {
  const { hr } = useSelector((state) => state.hrAuth);
  const userId = hr.hr._id;

  // Use the custom hook to fetch leaves
  const { leaves, loading } = useLeaves(userId);

  // States for search and date filters
  const [searchTerm, setSearchTerm] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // 5 leaves per page

  // Filter leaves based on search term and date range
  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch =
      leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.status.toLowerCase().includes(searchTerm.toLowerCase());

    const leaveStartDate = new Date(leave.startDate);
    const leaveEndDate = new Date(leave.endDate);

    // Normalize filter dates to start/end of day for accurate comparison
    const filterStartDate = startDateFilter ? new Date(startDateFilter + 'T00:00:00') : null;
    const filterEndDate = endDateFilter ? new Date(endDateFilter + 'T23:59:59') : null;

    const matchesStartDate = filterStartDate
      ? leaveStartDate >= filterStartDate
      : true;
    const matchesEndDate = filterEndDate
      ? leaveEndDate <= filterEndDate
      : true;

    return matchesSearch && matchesStartDate && matchesEndDate;
  });

  // Sort filtered leaves by date (latest first for history)
  const sortedLeaves = [...filteredLeaves].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  // Pagination calculations
  const totalPages = Math.ceil(sortedLeaves.length / itemsPerPage);
  const paginatedLeaves = sortedLeaves.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change for pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the count of pending/approved leaves for summary
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

        {/* Search and Date Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <TextField
            label="Search Leave"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
            className="w-full sm:w-1/3"
          />
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            fullWidth
            value={startDateFilter}
            onChange={(e) => {
              setStartDateFilter(e.target.value);
              setCurrentPage(1); // Reset to first page on new filter
            }}
            className="w-full sm:w-1/3"
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            fullWidth
            value={endDateFilter}
            onChange={(e) => {
              setEndDateFilter(e.target.value);
              setCurrentPage(1); // Reset to first page on new filter
            }}
            className="w-full sm:w-1/3"
          />
        </div>

        {/* Layout for Leave History and Leave Summary (made equal) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> {/* Changed to grid for equal columns */}
          {/* Leave History section - receives filtered and paginated data */}
          <LeaveHistory leaves={paginatedLeaves} />

          {/* Leave Summary section */}
          <LeaveSummary pendingLeavesCount={pendingLeavesCount} />
        </div>

        {/* Pagination Controls for Leave History */}
        {sortedLeaves.length > 0 && totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        )}
      </div>

      <NotificationBox userId={userId} />
    </div>
  );
};

export default Leaves;