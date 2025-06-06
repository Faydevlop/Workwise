import React, { useEffect, useState, useMemo } from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import axiosInstance from '../../config/axiosConfig';
import { TextField, Pagination } from '@mui/material'; // Import TextField and Pagination

const Payrollmanagment = () => {
  const [users, setUsers] = useState([]); // This holds the main payroll data for employees
  const [listData, setListData] = useState({}); // This holds the summary data (No Payroll Data Employee, Total Employee)
  const [loading, setLoading] = useState(false);

  // States for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Paid', 'Pending'

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Memoized filtered and paginated user data
  const filteredAndPaginatedUsers = useMemo(() => {
    let currentUsers = [...users]; // Create a mutable copy

    // 1. Apply Search Filter
    if (searchQuery) {
      currentUsers = currentUsers.filter(user => {
        const fullName = user.firstName ? `${user.firstName} ${user.lastName}`.toLowerCase() : '';
        const email = user.email ? user.email.toLowerCase() : '';
        const paymentStatus = user.payroll?.paymentStatus ? user.payroll.paymentStatus.toLowerCase() : '';
        return (
          fullName.includes(searchQuery.toLowerCase()) ||
          email.includes(searchQuery.toLowerCase()) ||
          paymentStatus.includes(searchQuery.toLowerCase())
        );
      });
    }

    // 2. Apply Status Filter
    if (filterStatus !== 'All') {
      currentUsers = currentUsers.filter(user =>
        user.payroll?.paymentStatus === filterStatus
      );
    }

    // 3. Sort by employee name for consistent display, if needed (optional, but good for UX)
    currentUsers.sort((a, b) => {
      const nameA = a.firstName ? `${a.firstName} ${a.lastName}` : '';
      const nameB = b.firstName ? `${b.firstName} ${b.lastName}` : '';
      return nameA.localeCompare(nameB);
    });

    // 4. Apply Pagination
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return currentUsers.slice(start, end);
  }, [users, searchQuery, filterStatus, currentPage, itemsPerPage]);

  // Calculate total pages for the Pagination component
  const totalPages = useMemo(() => {
    let count = users.filter(user => {
      const matchesSearch =
        user.firstName && user.lastName && `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.payroll?.paymentStatus && user.payroll.paymentStatus.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = filterStatus === 'All' || user.payroll?.paymentStatus === filterStatus;

      return matchesSearch && matchesStatus;
    }).length;
    return Math.ceil(count / itemsPerPage);
  }, [users, searchQuery, filterStatus, itemsPerPage]);

  const fetchlist = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/payroll/listusers`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching user list for payroll:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchViewData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/payroll/viewlist`);
      setListData(response.data.listView);
    } catch (error) {
      console.error("Error fetching payroll view data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchlist();
    fetchViewData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset page on search
  };

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1); // Reset page on filter change
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        <AdminSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
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

        <header className="sticky bg-[#2F3849] text-white top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <nav aria-label="breadcrumb" className="hidden md:flex">
            <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
              <li className="inline-flex items-center gap-1.5">
                <a className="transition-colors hover:text-foreground" href="/" rel="ugc">
                  Dashboard
                </a>
              </li>
              <li aria-hidden="true" className="[&>svg]:size-3.5" role="presentation">
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
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span aria-current="page" aria-disabled="true" className="font-normal text-foreground" role="link">
                  Payroll
                </span>
              </li>
            </ol>
          </nav>
          <Link to={'/admin/Payrollmanagment/addpayroll'}>
            <button
              className="ml-auto px-4 py-2 rounded-full text-white hover:bg-white transition-colors duration-300 hover:text-slate-600 focus:outline-none focus:bg-blue-600"
              type="button"
            >
              Add Payroll
            </button>
          </Link>
        </header>

        <main className="flex-1 p-4 sm:px-6 sm:py-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-8">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">No Payroll Data Employee</h3>
              <div className="text-3xl font-bold">{listData.nopayrollUser || 0}</div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">Total Employee</h3>
              <div className="text-3xl font-bold">{listData.totalUser || 0}</div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">
                Recent Payroll Transactions
              </h3>
              <p className="text-sm text-muted-foreground">View and manage your recent payroll transactions.</p>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 px-6 pb-4">
              <TextField
                label="Search Employee"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full sm:w-1/2"
              />
              <select
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-14 px-3 w-full sm:w-1/2"
                value={filterStatus}
                onChange={handleFilterStatusChange}
              >
                <option value="All">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <hr />
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Employee</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Current Month Pay</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredAndPaginatedUsers.length > 0 ? (
                    filteredAndPaginatedUsers.map((employee) => (
                      <tr key={employee._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">
                          <Link to={`/admin/Payrollmanagment/details/${employee.payroll ? employee.payroll._id : 'not'}`}>
                            <div className="font-medium">{employee.firstName} {employee.lastName}</div>
                            <div className="text-sm text-muted-foreground">{employee.email}</div>
                          </Link>
                        </td>
                        <td className="p-4 align-middle">{employee.payroll ? `₹${employee.payroll.permonthsalary}` : 'N/A'}</td>
                        <td className="p-4 align-middle">{employee.payroll ? `₹${employee.payroll.baseSalary}` : 'N/A'}</td>
                        <td className="p-4 align-middle">
                          <div className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${employee.payroll?.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {employee.payroll ? `${employee.payroll.paymentStatus}` : 'N/A'}
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="relative">
                            <button
                              onClick={() => { /* Toggle logic can be added here if needed, but the original component has no dropdown */ }}
                              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                              aria-haspopup="true"
                              type="button"
                              aria-expanded={false} // Adjust based on actual dropdown state if implemented
                            >
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
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                              <span className="sr-only">Toggle menu</span>
                            </button>
                            {/* Original dropdown was simple, removed extra state, if dropdown is needed, uncomment and re-add logic */}
                            {/* {openDropdown === index && (
                              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                <div className="py-1">
                                  <Link to={`/admin/Payrollmanagment/details/${employee.payroll ? employee.payroll._id : 'not'}`}>
                                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">view</a>
                                  </Link>
                                  <Link to={`/admin/Payrollmanagment/edit/${employee.payroll ? employee.payroll._id : 'not'}`}>
                                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
                                  </Link>
                                </div>
                              </div>
                            )} */}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center">No payroll records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav className="flex flex-col md:flex-row justify-center items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </nav>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payrollmanagment;
