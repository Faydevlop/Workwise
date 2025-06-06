import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Pagination } from '@mui/material'; // Import TextField and Pagination

const PayrollTable = ({ data }) => {
  // State for search input
  const [searchQuery, setSearchQuery] = useState('');
  // State for sorting order: 'none', 'lowToHigh', 'highToLow'
  const [sortOrder, setSortOrder] = useState('none');
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Memoized filtered and sorted data
  const filteredAndSortedData = useMemo(() => {
    let currentData = [...data]; // Create a mutable copy of the data prop

    // 1. Filter data based on search query
    if (searchQuery) {
      currentData = currentData.filter((user) => {
        const fullName = user.employee ? `${user.employee.firstName} ${user.employee.lastName}`.toLowerCase() : '';
        const email = user.employee ? user.employee.email.toLowerCase() : '';
        return fullName.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
      });
    }

    // 2. Sort data based on selected sort order
    if (sortOrder !== 'none') {
      currentData.sort((a, b) => {
        const totalA = a.totalAmount || 0; // Use 0 if totalAmount is null/undefined
        const totalB = b.totalAmount || 0; // Use 0 if totalAmount is null/undefined

        if (sortOrder === 'lowToHigh') {
          return totalA - totalB;
        } else { // highToLow
          return totalB - totalA;
        }
      });
    }

    return currentData;
  }, [data, searchQuery, sortOrder]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);

  // Event handlers
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1); // Reset to first page on new sort
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        {/* Search Input */}
        <TextField
          label="Search Employee"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full sm:w-1/2 lg:w-1/3" // Responsive width
        />
        {/* Sort by Salary Dropdown */}
        <select
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-14 px-3 w-full sm:w-auto"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="none">Sort by Salary</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total salary</th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.employee ? `${user.employee.firstName} ${user.employee.lastName}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.employee ? `${user.employee.email}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">₹{user.bonuses || 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">₹{user.deductions || 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">₹{user.baseSalary || 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">₹{user.totalAmount || 0}</td>
                    {user.employee ? (
                      <td className="p-4 align-middle text-right">
                        <Link to={`/hr/payrollmanagement/edit/${user.employee._id}`}>
                          <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                              <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
                            </svg>
                            <span className="sr-only">Edit</span>
                          </button>
                        </Link>
                      </td>
                    ) : (
                      <td className="p-4 align-middle text-right"></td> // Render an empty cell if no employee data
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">No payroll details found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default PayrollTable;
