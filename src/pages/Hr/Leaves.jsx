import React, { useEffect, useState } from 'react';
import HrSidebar from '../../components/Sidebar/HrSidebar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import NotificationBox from '../../components/notification/notificationBox';
import axiosInstance from '../../config/axiosConfig';

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const { hr } = useSelector((state) => state.hrAuth);
  const userId = hr.hr._id;

  useEffect(() => {
    const fetchLeaves = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/leave/getleaves/${userId}`);
        setLeaves(response.data.leaves);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  // Calculate the count of pending leaves
  const pendingLeavesCount = leaves.filter((leave) => leave.status === 'Pending' || leave.status === 'Approved'  ).length;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <HrSidebar />
      </div>
      <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <HrSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        {/* content section starts here */}
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
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <ScaleLoader
            color="#ffffff" // Adjust the spinner color
            height={35} // Adjust the height
            width={4} // Adjust the width
            radius={2} // Adjust the radius
            margin={2} // Adjust the margin between spinners
          />
        </Backdrop>

        {/* Main container to align items */}
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-4xl mx-auto">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Leave History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border-b-2">Leave Type</th>
                    <th className="p-2 border-b-2">Start Date</th>
                    <th className="p-2 border-b-2">End Date</th>
                    <th className="p-2 border-b-2">Status</th>
                    <th className="p-2 border-b-2">Info</th> {/* New column for info icon */}
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-2 border-b">{leave.leaveType}</td>
                      <td className="p-2 border-b">{new Date(leave.startDate).toLocaleDateString()}</td>
                      <td className="p-2 border-b">{new Date(leave.endDate).toLocaleDateString()}</td>
                      <td className="p-2 border-b">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            leave.status === 'Approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>
                      <td className="p-2 border-b text-center">
                        {/* Info icon cell */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-9-1a1 1 0 000 2h1v4a1 1 0 002 0v-4h1a1 1 0 100-2h-4zm1-4a1 1 0 10-2 0 1 1 0 002 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {leaves.length === 0 ? <h4 className="text-center mb-2">No leave requests</h4> : ''}
          </div>

          {/* Leave Summary */}
          <div className="bg-white rounded-lg p-4 shadow-md w-full lg:w-1/4 mt-8 lg:mt-0">
            {/* Reduced width */}
            <h3 className="text-lg font-semibold text-gray-800">Leave Summary</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Taken Leaves</span>
                <span className="font-semibold text-gray-800">{pendingLeavesCount}</span>
              </li>
            </ul>
          </div>
        </div>
        <br />
      </div>
      <NotificationBox userId={userId} />
    </div>
  );
};

export default Leaves;
