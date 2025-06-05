import { Link } from 'react-router-dom';
import { useState } from 'react';

const LeaveTable = ({ leaves }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredLeaves = leaves
    .slice()
    .reverse()
    .filter((leave) => {
      const searchMatch =
        leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.status.toLowerCase().includes(searchTerm.toLowerCase());

      const dateMatch = dateFilter
        ? new Date(leave.startDate).toDateString() === new Date(dateFilter).toDateString()
        : true;

      return searchMatch && dateMatch;
    });

  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);
  const paginatedLeaves = filteredLeaves.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="rounded-lg border bg-white text-black shadow-sm col-span-2">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold">Leave History</h3>
      </div>

      <div className="flex gap-4 px-6 pb-2">
        <input
          type="text"
          placeholder="Search by type or status"
          className="border p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <div className="p-6 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left text-gray-600">Leave Type</th>
              <th className="px-4 py-2 text-left text-gray-600">Start Date</th>
              <th className="px-4 py-2 text-left text-gray-600">End Date</th>
              <th className="px-4 py-2 text-left text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-gray-600">Info</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeaves.length > 0 ? (
              paginatedLeaves.map((leave) => (
                <tr key={leave._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{leave.leaveType}</td>
                  <td className="px-4 py-2">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        leave.status === 'Approved'
                          ? 'bg-green-200 text-green-800'
                          : leave.status === 'Rejected'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Link to={`/employee/leave/details/${leave._id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600 cursor-pointer"
                        fill="currentColor"
                        viewBox="0 0 20 20"
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
              <tr>
                <td className="px-4 py-2 text-center" colSpan="5">
                  No leave requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2 pb-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeaveTable;
