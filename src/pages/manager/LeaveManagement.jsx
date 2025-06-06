import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Pagination } from '@mui/material'; // Import Pagination
import { useSelector } from 'react-redux';
import ManagerSidebar from '../../components/Sidebar/ManagerSidebar';
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import NotificationBox from '../../components/notification/notificationBox';
import axiosInstance from '../../config/axiosConfig';

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [data, setData] = useState([]);
  const { manager } = useSelector((state) => state.managerAuth);
  const userId = manager?.manager?._id;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [leaveId, setLeaveId] = useState(null);
  const [comment, setComment] = useState('');
  const [searchLeaveHistory, setSearchLeaveHistory] = useState('');
  const [searchLeaveRequests, setSearchLeaveRequests] = useState('');

  // Pagination states for Leave History
  const [historyPage, setHistoryPage] = useState(1);
  const [historyRowsPerPage] = useState(5); // 5 listings per page
  const [historyStartDateFilter, setHistoryStartDateFilter] = useState('');
  const [historyEndDateFilter, setHistoryEndDateFilter] = useState('');

  // Pagination states for Leave Requests
  const [requestsPage, setRequestsPage] = useState(1);
  const [requestsRowsPerPage] = useState(5); // 5 listings per page
  const [requestsStartDateFilter, setRequestsStartDateFilter] = useState('');
  const [requestsEndDateFilter, setRequestsEndDateFilter] = useState('');

  useEffect(() => {
    setLoading(true);

    const fetchLeaves = async () => {
      try {
        const response = await axiosInstance.get(`/leave/getleaves/${userId}`);
        setLeaves(response.data.leaves);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeaves();

    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get(`/leave/managerleaveget/${userId}`);
        setData(response.data.leaves);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();

    const interval = setInterval(() => {
      fetchLeaves();
      fetchRequests();
    }, 5000);

    return () => clearInterval(interval);
  }, [userId]); // Add userId to dependency array

  const handleClickOpen = (leaveId) => {
    setLeaveId(leaveId);
    setOpen(true);
  };

  const pendingLeavesCount = leaves.filter(
    (leave) => leave.status === 'Pending' || leave.status === 'Approved'
  ).length;

  const handleClose = async (action) => {
    if (action === 'cancel') {
      setOpen(false);
      return;
    }

    const userData = {
      action,
      comment: action === 'Rejected' ? comment : '',
    };

    try {
      await axiosInstance.post(`/leave/status/${leaveId}`, userData);
      toast.success('Status updated successfully!', {
        autoClose: 1500,
      });
      // Refresh data after status update
      const responseLeaves = await axiosInstance.get(`/leave/getleaves/${userId}`);
      setLeaves(responseLeaves.data.leaves);
      const responseRequests = await axiosInstance.get(`/leave/managerleaveget/${userId}`);
      setData(responseRequests.data.leaves);
    } catch (error) {
      toast.error('Error updating status');
    }

    setOpen(false);
    setComment('');
  };

  // Filtering and Pagination Logic for Leave History
  const filteredHistoryLeaves = leaves.filter((leave) => {
    const matchesSearch =
      leave.leaveType.toLowerCase().includes(searchLeaveHistory) ||
      leave.status.toLowerCase().includes(searchLeaveHistory);

    const leaveStartDate = new Date(leave.startDate);
    const leaveEndDate = new Date(leave.endDate);

    const matchesStartDate = historyStartDateFilter
      ? leaveStartDate >= new Date(historyStartDateFilter)
      : true;
    const matchesEndDate = historyEndDateFilter
      ? leaveEndDate <= new Date(historyEndDateFilter)
      : true;

    return matchesSearch && matchesStartDate && matchesEndDate;
  });

  const historyTotalPages = Math.ceil(filteredHistoryLeaves.length / historyRowsPerPage);
  const paginatedHistoryLeaves = filteredHistoryLeaves.slice(
    (historyPage - 1) * historyRowsPerPage,
    historyPage * historyRowsPerPage
  );

  const handleHistoryPageChange = (event, value) => {
    setHistoryPage(value);
  };

  // Filtering and Pagination Logic for Leave Requests
  const filteredRequests = data.filter((leave) => {
    const name = leave.userId
      ? `${leave.userId.firstName}${leave.userId.lastName}`.toLowerCase()
      : '';
    const matchesSearch =
      name.includes(searchLeaveRequests) ||
      leave.leaveType.toLowerCase().includes(searchLeaveRequests) ||
      leave.status.toLowerCase().includes(searchLeaveRequests);

    const leaveStartDate = new Date(leave.startDate);
    const leaveEndDate = new Date(leave.endDate);

    const matchesStartDate = requestsStartDateFilter
      ? leaveStartDate >= new Date(requestsStartDateFilter)
      : true;
    const matchesEndDate = requestsEndDateFilter
      ? leaveEndDate <= new Date(requestsEndDateFilter)
      : true;

    return matchesSearch && matchesStartDate && matchesEndDate;
  });

  const requestsTotalPages = Math.ceil(filteredRequests.length / requestsRowsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (requestsPage - 1) * requestsRowsPerPage,
    requestsPage * requestsRowsPerPage
  );

  const handleRequestsPageChange = (event, value) => {
    setRequestsPage(value);
  };

  return (
    <div className="flex h-full">
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <ManagerSidebar />
      </div>
      <div className="lg:hidden">
        <ManagerSidebar />
      </div>

      <div className="flex-1 p-5 overflow-auto">
        <header className="flex border bg-[#2F3849] mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3">
          <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <a className="flex-none font-semibold text-xl text-white focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
              Leaves and Overview
            </a>
            <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
              <Link to={'/manager/leave/applyleave'}>
                <button className="px-4 py-2 rounded-full text-white hover:bg-white transition-colors duration-300 hover:text-slate-600 focus:outline-none focus:bg-blue-600">
                  Apply Leave
                </button>
              </Link>
            </div>
          </nav>
        </header>

        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <ScaleLoader color="#ffffff" height={35} width={4} radius={2} margin={2} />
        </Backdrop>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-2">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Leave History</h3>
              <input
                type="text"
                placeholder="Search Leave History..."
                className="border px-3 py-1 rounded w-full mb-2"
                value={searchLeaveHistory}
                onChange={(e) => setSearchLeaveHistory(e.target.value.toLowerCase())}
              />
              <div className="flex gap-4">
                <TextField
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={historyStartDateFilter}
                  onChange={(e) => setHistoryStartDateFilter(e.target.value)}
                  className="w-1/2"
                />
                <TextField
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={historyEndDateFilter}
                  onChange={(e) => setHistoryEndDateFilter(e.target.value)}
                  className="w-1/2"
                />
              </div>
            </div>
            <div className="p-6">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left font-medium text-muted-foreground">Leave Type</th>
                      <th className="h-12 px-4 text-left font-medium text-muted-foreground">Start Date</th>
                      <th className="h-12 px-4 text-left font-medium text-muted-foreground">End Date</th>
                      <th className="h-12 px-4 text-left font-medium text-muted-foreground">Status</th>
                      <th className="h-12 px-4 text-left font-medium text-muted-foreground">Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedHistoryLeaves.length > 0 ? (
                      paginatedHistoryLeaves.map((leave, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-4">{leave.leaveType}</td>
                          <td className="p-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                          <td className="p-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-bold ${
                                leave.status === 'Approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                              }`}
                            >
                              {leave.status}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-600 cursor-pointer"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-9-1a1 1 0 000 2h1v4a1 1 0 002 0v-4h1a1 1 0 100-2h-4zm1-4a1 1 0 10-2 0 1 1 0 002 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="p-4 text-center">
                          No leave history found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mt-4">
                <Pagination
                  count={historyTotalPages}
                  page={historyPage}
                  onChange={handleHistoryPageChange}
                  color="primary"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Leave Summary</h3>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Leave Taken This Month</span>
                  <span>{pendingLeavesCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-2">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Leave Requests</h3>
            <input
              type="text"
              placeholder="Search Leave Requests..."
              className="border px-3 py-1 rounded w-full mb-2"
              value={searchLeaveRequests}
              onChange={(e) => setSearchLeaveRequests(e.target.value.toLowerCase())}
            />
            <div className="flex gap-4">
              <TextField
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={requestsStartDateFilter}
                onChange={(e) => setRequestsStartDateFilter(e.target.value)}
                className="w-1/2"
              />
              <TextField
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={requestsEndDateFilter}
                onChange={(e) => setRequestsEndDateFilter(e.target.value)}
                className="w-1/2"
              />
            </div>
          </div>
          <div className="p-6">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b hover:bg-muted/50">
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Employee Name</th>
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Department</th>
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Leave Type</th>
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Start Date</th>
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">End Date</th>
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRequests.length > 0 ? (
                    paginatedRequests.map((leave, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          {leave.userId
                            ? `${leave.userId.firstName} ${leave.userId.lastName}`
                            : 'Not available'}
                        </td>
                        <td className="p-4">{leave.userId?.department || 'N/A'}</td> {/* Assuming department is nested under userId */}
                        <td className="p-4">{leave.leaveType}</td>
                        <td className="p-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                        <td className="p-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              leave.status === 'Approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                            }`}
                          >
                            {leave.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => handleClickOpen(leave._id)}
                            className="text-blue-500 hover:text-blue-800"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-4 text-center">
                        No leave requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4">
              <Pagination
                count={requestsTotalPages}
                page={requestsPage}
                onChange={handleRequestsPageChange}
                color="primary"
              />
            </div>

            <Dialog open={open} onClose={() => handleClose('cancel')}>
              <DialogTitle>Update Leave Status</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please provide a comment if you are rejecting the leave request.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Comment"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose('cancel')}>Cancel</Button>
                <Button onClick={() => handleClose('Approved')}>Approve</Button>
                <Button onClick={() => handleClose('Rejected')}>Reject</Button>
              </DialogActions>
            </Dialog>
            <ToastContainer />
          </div>
        </div>
      </div>
      <NotificationBox userId={userId} />
    </div>
  );
};

export default LeaveManagement;