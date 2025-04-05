import React, { useEffect, useState } from 'react';
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import NotificationBox from '../../components/notification/notificationBox';
import axiosInstance from '../../config/axiosConfig';

const EmployeeLeavemanagment = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading ,setLoading] = useState(false)
  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee.user._id;

  useEffect(() => {
    setLoading(true)
    const fetchLeaves = async () => {
      try {
        const response = await axiosInstance.get(`/leave/getleaves/${userId}`);
        setLeaves(response.data.leaves);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    };
    fetchLeaves();
  }, [userId]);

  return (
    <div className="flex h-full">
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar />
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>

      <div className="flex-1 p-6 overflow-auto  ">
        {/* Header Section */}
        <header >
        
        <header className="flex border bg-[#2F3849]   mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full  text-sm py-3">
  <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
    <a className="flex-none font-semibold text-xl  text-white focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
      Leaves and Overview
    </a>
    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
      <Link to={'/employee/leave/applyleave'} >
      <button className="px-4 py-2 rounded-full  text-white  hover:bg-white transition-colors duration-300 hover:text-slate-600 focus:outline-none focus:bg-blue-600">
        Apply Leave
      </button>
      </Link>
     
    </div>
  </nav>
</header>
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

        {/* Leave History and Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Leave History */}
          <div className="rounded-lg border bg-white text-black shadow-sm col-span-2">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Leave History</h3>
            </div>
            <div className="p-6">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-gray-50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Leave Type</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Start Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">End Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaves.length > 0 ? (
                      leaves.map((leave, index) => (
                        <tr key={index} className="border-b transition-colors hover:bg-gray-50">
                          <td className="p-4 align-middle">{leave.leaveType}</td>
                          <td className="p-4 align-middle">{new Date(leave.startDate).toLocaleDateString()}</td>
                          <td className="p-4 align-middle">{new Date(leave.endDate).toLocaleDateString()}</td>
                          <td className="p-4 align-middle">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-bold ${
                                leave.status === 'Approved'
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-red-200 text-red-800'
                              }`}
                            >
                              {leave.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            <Link to={`/employee/leave/details/${leave._id}`}>
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
                            </Link>
                            
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-b transition-colors hover:bg-gray-50">
                        <td className="p-4 align-middle text-center" colSpan="5">
                          No leave requests
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Leave Summary */}
          <div className="rounded-lg border bg-white text-black shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Leave Summary</h3>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                {/* <div className="flex justify-between">
                  <span>Monthly Leave Allowance</span>
                  <span>4</span>
                </div> */}
                
                <div className="flex justify-between">
                  <span>Leave Taken This Month</span>
                  <span>{leaves.length > 0 && leaves[0].monthlyLeaveCount ? `${leaves[0].monthlyLeaveCount}` : '0'}</span>
                </div>
             

              </div>
            </div>
          </div>
        </div>
      </div>
      <NotificationBox userId={userId} />
    </div>
  );
};

export default EmployeeLeavemanagment;
