import React from 'react';

const LeaveHistory = ({ leaves }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-b-2">Leave Type</th>
            <th className="p-2 border-b-2">Start Date</th>
            <th className="p-2 border-b-2">End Date</th>
            <th className="p-2 border-b-2">Status</th>
            <th className="p-2 border-b-2">Info</th>
          </tr>
        </thead>
        <tbody>
          {leaves.slice().reverse().map((leave, index) => (
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
          ))}
        </tbody>
      </table>
      {leaves.length === 0 && <h4 className="text-center mb-2">No leave requests</h4>}
    </div>
  );
};

export default LeaveHistory;
