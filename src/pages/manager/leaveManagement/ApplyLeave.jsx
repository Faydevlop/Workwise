import React, { useState } from 'react';
import EmployeeSidebar from '../../../components/Sidebar/ManagerSidebar';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2'
import axiosInstance from '../../../config/axiosConfig';


const ApplyLeave = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});
  const [loading ,setLoading] = useState(false)
  const navigate = useNavigate();


  const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});


  const { manager } = useSelector((state) => state.managerAuth);
  const userId = manager?.manager?._id;

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!leaveType) {
      isValid = false;
      formErrors['leaveType'] = 'Leave type is required';
    }

    if (!startDate) {
      isValid = false;
      formErrors['startDate'] = 'Start date is required';
    }

    if (!endDate) {
      isValid = false;
      formErrors['endDate'] = 'End date is required';
    } else if (new Date(endDate) < new Date(startDate)) {
      isValid = false;
      formErrors['endDate'] = 'End date cannot be earlier than start date';
    }

    if (!reason) {
      isValid = false;
      formErrors['reason'] = 'Reason is required';
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (validateForm()) {
      const leaveData = {
        userId,
        leaveType,
        startDate,
        endDate,
        reason,
      };
      setLoading(false)

      try {
        const response = await axiosInstance.post(
          `/leave/applyLeave`,
          leaveData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        // toast.success('Leave applied successfully!', {
        //   position: 'top-right',
        //   autoClose: 1500,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   onClose: () => navigate('/employee/leave'),
        // });
        Toast.fire({
          icon: "success",
          title: "Leave applied successfully!",
          didClose: () => navigate('/manager/leavemanagement'),  // Use didClose instead of onClose
        });
        
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Error applying leave. Please try again.';
        toast.error(errorMsg, {
          position: 'top-right',
          autoClose: 2000,
        });
      }finally{
        setLoading(false)
      }
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar />
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>
      <ToastContainer />

      <div className="bg-blue-50" style={{ flex: 1, padding: '10px', overflow: 'auto', marginLeft: '0' }}>
        <header className="flex border mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
          <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <a className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
              Apply Leave
            </a>
            <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
              <Link to={'/manager/leavemanagement'}>
                <button className="px-4 py-2 bg-blue-700 rounded-xl text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Back
                </button>
              </Link>
            </div>
          </nav>
        </header>
        <ToastContainer/>

        <div className="bg-white rounded-lg p-6 shadow-md w-full lg:w-3/3">
          <h2 className="text-xl font-semibold text-gray-800">Edit details</h2>
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Project Information</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
              <div>
  <label className="block text-sm font-medium text-gray-600">Leave Type</label>
  <select
    className={`mt-1 block w-full border rounded-md p-2 ${errors.leaveType ? 'border-red-500' : ''}`}
    value={leaveType}
    onChange={(e) => setLeaveType(e.target.value)}
  >
    <option value="">Select leave type</option>
    <option value="Sick Leave">Sick Leave</option>
    <option value="Casual Leave">Casual Leave</option>
    <option value="Maternity Leave">Maternity Leave</option>
    <option value="Paternity Leave">Paternity Leave</option>
    <option value="Paid Leave">Paid Leave</option>
    <option value="Unpaid Leave">Unpaid Leave</option>
  </select>
  {errors.leaveType && <span className="text-red-500 text-sm">{errors.leaveType}</span>}
</div>
<Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            
          >
            <CircularProgress color="inherit" />
          </Backdrop>


                <div>
                  <label className="block text-sm font-medium text-gray-600">Start Date</label>
                  <input
                    type="date"
                    className={`mt-1 block w-full border rounded-md p-2 ${errors.startDate ? 'border-red-500' : ''}`}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  {errors.startDate && <span className="text-red-500 text-sm">{errors.startDate}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">End Date</label>
                  <input
                    type="date"
                    className={`mt-1 block w-full border rounded-md p-2 ${errors.endDate ? 'border-red-500' : ''}`}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  {errors.endDate && <span className="text-red-500 text-sm">{errors.endDate}</span>}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">Reason</label>
                <textarea
                  className={`mt-1 block w-full border rounded-md p-2 ${errors.reason ? 'border-red-500' : ''}`}
                  rows="4"
                  placeholder="Enter the reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
                {errors.reason && <span className="text-red-500 text-sm">{errors.reason}</span>}
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                  Save Changes
                </button>
                <button type="button" className="bg-black text-white font-semibold py-2 px-4 rounded-md">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;
