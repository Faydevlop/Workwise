import React, { useEffect, useState } from 'react';
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EmployeeLeavemanagment = () => {
  const [leaves, setLeaves] = useState([]);
  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee.user._id;

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/leave/getleaves/${userId}`);
        setLeaves(response.data.leaves);
      } catch (error) {
        console.log(error);
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

      <div className="flex-1 p-6 overflow-auto ">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Leaves and Overview</h1>
          <Link to={'/employee/leave/applyleave'}>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-600 text-white">
              Apply Leave
            </button>
          </Link>
        </div>

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
                <div className="flex justify-between">
                  <span>Annual leave</span>
                  <span>3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeavemanagment;
