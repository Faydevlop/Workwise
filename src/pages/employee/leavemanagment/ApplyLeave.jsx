// pages/ApplyLeave.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import EmployeeSidebar from '../../../components/Sidebar/EmployeeSidebar';
import ApplyLeaveForm from '../../../components/forms/ApplyLeaveForm';
import BackdropLoader from '../../../components/employee/loader/BackdropLoader2';
import useApplyLeave from '../../../hooks/employee/useApplyLeave';

const ApplyLeave = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee.user._id;

  const { applyLeave, loading } = useApplyLeave();

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

      applyLeave(leaveData, Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      }), navigate);
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
              <Link to={'/employee/leave'}>
                <button className="px-4 py-2 bg-blue-700 rounded-xl text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Back
                </button>
              </Link>
            </div>
          </nav>
        </header>

        <div className="bg-white rounded-lg p-6 shadow-md w-full lg:w-3/3">
          <h2 className="text-xl font-semibold text-gray-800">Edit details</h2>
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Project Information</h3>
            <ApplyLeaveForm
              leaveType={leaveType}
              setLeaveType={setLeaveType}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              reason={reason}
              setReason={setReason}
              errors={errors}
            />
            <div className="mt-6 flex justify-end space-x-4">
              <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md" onClick={handleSubmit}>
                Save Changes
              </button>
              <button type="button" className="bg-black text-white font-semibold py-2 px-4 rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <BackdropLoader loading={loading} />
    </div>
  );
};

export default ApplyLeave;
