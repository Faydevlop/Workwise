import React, { useEffect, useState } from 'react';
import ManagerSidebar from '../../components/Sidebar/ManagerSidebar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import NotificationBox from '../../components/notification/notificationBox';
import { TextField, Pagination } from '@mui/material'; // Import TextField and Pagination
import { getDepartmentWisePayroll, getPayrollViewList } from '../../hooks/manager/payrollAPI';

const Payrollmanagement = () => {
  const [data, setData] = useState([]);
  const { manager } = useSelector((state) => state.managerAuth);
  const userId = manager?.manager?._id;

  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]); // State for overall payroll summary (No Payroll Employees, Total Employee)

  // State for search and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 10 listings per page

  const fetchdata = async () => {
    setLoading(true);
    try {
      const users = await getDepartmentWisePayroll(userId);
      setData(users);
    } catch (error) {
      console.error("Error fetching department-wise payroll", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchViewData = async () => {
    setLoading(true);
    try {
      const viewData = await getPayrollViewList();
      setListData(viewData);
    } catch (error) {
      console.error("Error fetching payroll view list", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViewData();
    fetchdata();
  }, [userId]); // Add userId to dependency array for useEffect

  // Filter data based on search query
  const filteredData = data.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change for pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <ManagerSidebar />
      </div>
      <div className="lg:hidden">
        <ManagerSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <div className="flex flex-col lg:flex-row min-h-screen">
          <div className="flex-grow overflow-x-hidden">
            <header className="flex h-14 bg-[#2F3849] lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-4 sm:px-6">
              <h1 className="text-xl text-white">Payroll Overview</h1>
              <div className="flex items-center gap-4"></div>
            </header>
            <Backdrop
              sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={loading}
            >
              <ScaleLoader
                color="#ffffff"
                height={35}
                width={4}
                radius={2}
                margin={2}
              />
            </Backdrop>

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                <h1 className="font-semibold text-lg md:text-xl mb-4 sm:mb-0">Payroll</h1>
                <div className="flex flex-wrap justify-center sm:justify-end gap-2">
                  <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" x2="12" y1="15" y2="3"></line>
                    </svg>
                    Export
                  </button>
                </div>
              </div>

              <div className="grid gap-6 mb-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                      <p className="text-sm text-muted-foreground">No Payroll Employees</p>
                      <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                        {listData.nopayrollUser}
                      </h3>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                      <p className="text-sm text-muted-foreground">Total employee</p>
                      <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                        {listData.totalUser}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Input */}
              <div className="mb-4">
                <TextField
                  label="Search Employee"
                  variant="outlined"
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on new search
                  }}
                />
              </div>

              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base salary</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total salary</th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.length > 0 ? (
                          paginatedData.map((user) => (
                            <tr key={user._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.payroll ? ` ₹${user.payroll.bonuses}` : 'Not available'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.payroll ? `₹${user.payroll.deductions}` : 'Not available'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.payroll ? `₹${user.payroll.baseSalary}` : 'Not available'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.payroll ? `₹${user.payroll.totalAmount}` : 'Not available'}
                              </td>
                              {user.payroll ? (
                                <td className="p-4 align-middle text-right">
                                  <Link to={`/manager/payrollmanagement/edit/${user._id}`}>
                                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                      >
                                        <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                                        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                        <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
                                      </svg>
                                      <span className="sr-only">Edit</span>
                                    </button>
                                  </Link>
                                </td>
                              ) : (
                                <td className="p-4 align-middle text-right"></td> // Empty cell if no payroll
                              )}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="p-4 text-center">
                              No payroll details found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Pagination Controls */}
              {paginatedData.length > 0 && (
                <div className="flex justify-center mt-4">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <NotificationBox userId={userId} />
    </div>
  );
};

export default Payrollmanagement;
