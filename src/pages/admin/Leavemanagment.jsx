import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../components/Sidebar/AdminSidebar'
import axios from 'axios'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';

const Leavemanagment = () => {
  const [leaves,setLeaves] = useState([])
  const [showLeaveMenu, setShowLeaveMenu] = useState(null)
  const [open, setOpen] = useState(false);
  const [leaveId, setLeaveId] = useState(null);
  const [userId,setUserId] = useState('')
  const [noOfemplo,setNoOfemplo] = useState('')
  const [workingEmployees,setWorkingEmployees] = useState('')
  const [pendingLeaveRequest,setPendingLeaveRequest] = useState('')
  const [onLeaveToday,setOnLeaveToday] = useState([])
  const [comment, setComment] = useState('');

  
  

  const handleClickOpen = (userId,leaveId) => {
     // Set the selected user ID
    setLeaveId(leaveId)
    setOpen(true); // Open the dialog
  };

  const handleClose = async(action) => {
    console.log(`Action: ${action}, leave ID: ${leaveId}, Comment: ${comment}`);
    
    if (action === 'cancel') {
      setOpen(false);
      return;
    }
    
    const userData = {
      action,
      userId,
      comment: action === 'Rejected' ? comment : '' // Only include comment if action is 'Rejected'
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/leave/status/${leaveId}`, userData);
      toast.success('Status updated successfully!', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      setLeaves(prevLeaves => 
        prevLeaves.map(leave => 
          leave._id === leaveId ? { ...leave, status: action } : leave
        )
      );
    
    } catch (error) {
      toast.error('Error updating status');
    }
  
    setOpen(false); // Close the dialog
    setComment(''); // Reset the comment field
  };


  useEffect(() => {

    const fetchdata = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/leave/getAllLeaves`);
        console.log(response.data.leaves);
        
        setLeaves(response.data.leaves)

        
      } catch (error) {
        
      }
    }

    fetchdata()

    const fetchlistDatas = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/leave/listdata`);
        console.log(response);
        
        setNoOfemplo(response.data.totalEmployees)
        setWorkingEmployees(response.data.workingEmployees)
        setPendingLeaveRequest(response.data.pendingLeaveRequest)
        setOnLeaveToday(response.data.onLeaveToday)
        
      } catch (error) {
        
      }
    }
    fetchlistDatas()


    const handleClickOutside = (event) => {
      // Close the dropdown menu if clicking outside
      if (!event.target.closest('.dropdown-menu')) {
        setShowLeaveMenu(null)
      
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    

    
  


  }, [])

  const toggleLeaveMenu = (index) => {
    setShowLeaveMenu(showLeaveMenu === index ? null : index)
  }


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        <AdminSidebar />
      </div>
      <div className='bg-blue-50' style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <header className="flex border shadow-lg rounded  mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
          <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <a className="flex-none font-semibold text-xl  text-black focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
              Leave Management
            </a>
            <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
            </div>
          </nav>
        </header>
        <ToastContainer/>
        

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold mb-2">Total Employees</h2>
              <p className="text-4xl font-bold">{noOfemplo}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">No of working employees</p>
                <p className="text-2xl font-semibold">{workingEmployees}</p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Pending Approval</p>
                <p className="text-2xl font-semibold">{pendingLeaveRequest}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Leave Statistics</h2>
                <div className="flex space-x-2 text-sm">
                  <span className="text-blue-600">■ Sick Leave</span>
                  <span className="text-purple-600">■ Paid Leave</span>
                </div>
              </div>
              <div className="h-40 bg-gray-200">
                <p className="text-center pt-16">Chart Placeholder</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Leave Lists</h2>
                <button className="text-gray-500">•••</button>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                      leaves.map((leave,index)=>(
                        <tr key={index} >
                        
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{leave.userId ? `${leave.userId.firstName}${leave.userId.lastName}` : 'N/a'}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{leave.userId ? `${leave.userId.email}` : 'N/A'}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{leave.leaveType}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(leave.startDate).toLocaleDateString()}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(leave.endDate).toLocaleDateString()}</td>
                        
                        <td
                        className={`px-6 py-4 ${
                          leave.status === 'Approved'
                            ? 'text-green-600'
                            : leave.status === 'Pending'
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}
                      >
                        {leave.status}
                      </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={()=>handleClickOpen(leave.userId,`${leave._id}`)}  className="text-blue-600 hover:text-blue-900 mr-1 ">Manage</button>
                          
                          <Link to={`/admin/leavedetails/${leave._id}`}>
                          <button  className="text-green-600  mr-2 ml-3   hover:text-green-900">Info</button>
                          </Link>
                        </td>
                      </tr>
                      ))
                    }
                    
                </tbody>
                
              </table>
              {
                leaves.length == 0 ? (<h4 className=" text-center  mb-2">No leave requests</h4>) : ''
              }
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Who's On Leave */}
              <div className="bg-white rounded-lg shadow">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold">Who's On Leave</h2>
                  <button className="text-gray-500 dropdown-menu" onClick={() => toggleLeaveMenu(1)}>•••</button>
                </div>
                <div className="p-4 space-y-4">
                  {onLeaveToday.map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        <div>
                          <p className="font-medium">{user.userId ? `${user.userId.firstName}${user.userId.lastName}` : 'No'}</p>
                          <p className="text-sm text-gray-500">{user.userId ? `${user.userId.position}` : 'No'}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <button className="text-gray-500 dropdown-menu" onClick={() => toggleLeaveMenu(index)}>•••</button>
                        {showLeaveMenu === index && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
                            <ul className="py-1">
                              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Info</li>
                              
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {
                onLeaveToday.length == 0 ? `No employees are leave to day` : ''
              }
                </div>
              </div>
              

              {/* Leave Policy */}
              <div className="bg-white rounded-lg shadow">
  <div className="p-4 border-b">
    <h2 className="text-lg font-semibold">Leave Policy</h2>
  </div>
  <div className="p-4 space-y-4">
    {[
      "Sick Leave",
      "Casual Leave",
      "Maternity Leave",
      "Paternity Leave",
      "Paid Leave",
      "Unpaid Leave",
    ].map((policy, index) => (
      <div key={index} className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{policy}</p>
        <div className="relative">
          
          
        </div>
      </div>
    ))}
  </div>
</div>

            </div>
          
            {/* Other Content */}
            <Dialog
  open={open}
  onClose={() => handleClose('cancel')}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"Are you sure..?"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Are you sure you want to reject this leave request?
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="comment"
      label="Comment"
      type="text"
      fullWidth
      variant="outlined"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => handleClose('cancel')}>Cancel</Button>
    <Button onClick={() => handleClose('Rejected')} color="error">Reject request</Button>
    <Button onClick={() => handleClose('Approved')} color="primary" autoFocus>
      Accept Request
    </Button>
  </DialogActions>
</Dialog>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Leavemanagment
