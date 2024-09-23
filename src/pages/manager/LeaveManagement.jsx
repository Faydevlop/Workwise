import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import ManagerSidebar from '../../components/Sidebar/ManagerSidebar';
import { Link } from 'react-router-dom';


import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import NotificationBox from '../../components/notification/notificationBox';

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [data,setData] = useState([])
  const { manager } = useSelector((state) => state.managerAuth);
  const userId = manager.manager._id;
  const [loading ,setLoading] = useState(false)


  useEffect(() => {

    setLoading(true)
    
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/leave/getleaves/${userId}`);
        setLeaves(response.data.leaves);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeaves();

    const fetchRequests = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/leave/managerleaveget/${userId}`);
        setData(response.data.leaves)
        console.log(response.data.leaves);
        
      } catch (error) {
        
      }finally{
        setLoading(false)
      }
    }
    fetchRequests()

    const interval = setInterval(() => {
      fetchLeaves();
      fetchRequests();
    }, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const [open, setOpen] = useState(false);
  const [leaveId, setLeaveId] = useState(null);
  const [comment, setComment] = useState('');

  const handleClickOpen = (leaveId) => {
    setLeaveId(leaveId);
    setOpen(true);
  };

  const handleClose = async (action) => {
    if (action === 'cancel') {
      setOpen(false);
      return;
    }

    const userData = {
      action,
      comment: action === 'Rejected' ? comment : ''
    };

    console.log(userData);
    

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/leave/status/${leaveId}`, userData);
      toast.success('Status updated successfully!',{
        autoClose: 1500,
      });
    } catch (error) {
      toast.error('Error updating status');
    }

    setOpen(false);
    setComment('');
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
      
        <header className="flex border bg-[#2F3849]   mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full  text-sm py-3">
  <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
    <a className="flex-none font-semibold text-xl  text-white focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
      Leaves and Overview
    </a>
    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
      <Link to={'/manager/leave/applyleave'} >
      <button className="px-4 py-2 rounded-full  text-white  hover:bg-white transition-colors duration-300 hover:text-slate-600 focus:outline-none focus:bg-blue-600">
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
  <ScaleLoader
    color="#ffffff" // Adjust the spinner color
    height={35}     // Adjust the height
    width={4}       // Adjust the width
    radius={2}      // Adjust the radius
    margin={2}      // Adjust the margin between spinners
  />
</Backdrop>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-2">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Leave History</h3>
            </div>
            <div className="p-6">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Leave Type
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Start Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        End Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Status
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Info
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {leaves.length === 0 ? (
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-center" colSpan="5">
                          No leave requests
                        </td>
                      </tr>
                    ) : (
                      leaves.map((leave, index) => (
                        <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{leave.leaveType}</td>
                          <td className="p-4 align-middle">{new Date(leave.startDate).toLocaleDateString()}</td>
                          <td className="p-4 align-middle">{new Date(leave.endDate).toLocaleDateString()}</td>
                          <td className="p-4 align-middle">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-bold ${
                                leave.status === 'Approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                              }`}
                            >
                              {leave.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
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
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Leave Summary</h3>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monthly Leave Allowance</span>
                  <span>4</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Leave Taken This Month</span>
                  <span>{leaves.length > 0 && leaves[0].monthlyLeaveCount ? `${leaves[0].monthlyLeaveCount}` : '0'}</span>
                </div>
             

              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-2">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Leave Requests</h3>
            </div>
            <div className="p-6">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Employee Name
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Department 
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Leave Type
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      Start Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      End Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      Status
                      </th>
      
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      Actions
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {data.length === 0 ? (
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-center" colSpan="5">
                          No leave requests
                        </td>
                      </tr>
                    ) : (
                      data.map((leave, index) => (
                        <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{ leave.userId ? `${leave.userId.firstName}${leave.userId.lastName}` : "Not available" }</td>
                          <td className="p-4 align-middle">{leave.leaveType}</td>
                          <td className="p-4 align-middle">{leave.leaveType}</td>
                          <td className="p-4 align-middle">{new Date(leave.startDate).toLocaleDateString()}</td>
                          <td className="p-4 align-middle">{new Date(leave.endDate).toLocaleDateString()}</td>
                          <td className="p-4 align-middle">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-bold ${
                                leave.status === 'Approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                              }`}
                            >
                              {leave.status}
                            </span>
                          </td>
                          <td className="align-middle text-center">
                         <button onClick={() => handleClickOpen(leave._id)} className=' text-center mr-10 text-blue-500 hover:text-blue-800 align-middle'>Manage</button>
                         
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
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
