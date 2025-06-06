import React, { useEffect, useRef, useState, useMemo } from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../config/axiosConfig'; // Ensure this is correctly imported
import { TextField, Pagination } from '@mui/material'; // Import TextField and Pagination

const Usermanagment = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  // State for search, filters, and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All'); // 'All', 'Employee', 'Manager', 'HR', 'Admin'
  const [selectedStatus, setSelectedStatus] = useState('All'); // 'All', 'Active', 'Inactive'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of users to display per page

  // Fetch unique roles and statuses for filter dropdowns
  const uniqueRoles = useMemo(() => {
    const roles = new Set(users.map(user => user.position).filter(Boolean));
    return ['All', ...Array.from(roles)];
  }, [users]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(users.map(user => user.employeeStatus).filter(Boolean));
    return ['All', ...Array.from(statuses)];
  }, [users]);

  // Memoized filtered and paginated user data
  const filteredAndPaginatedUsers = useMemo(() => {
    let currentUsers = users.filter(user => {
      // Search filter
      const matchesSearch =
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.position ? user.position.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
        (user.department ? user.department.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
        (user.employeeStatus ? user.employeeStatus.toLowerCase().includes(searchQuery.toLowerCase()) : false);

      // Role filter
      const matchesRole =
        selectedRole === 'All' || (user.position && user.position === selectedRole);

      // Status filter
      const matchesStatus =
        selectedStatus === 'All' || (user.employeeStatus && user.employeeStatus === selectedStatus);

      return matchesSearch && matchesRole && matchesStatus;
    });

    // Sort by dateOfJoining (latest first) for consistency, if not explicitly sorted otherwise
    currentUsers.sort((a, b) => new Date(b.dateOfJoining) - new Date(a.dateOfJoining));

    // Pagination
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return currentUsers.slice(start, end);
  }, [users, searchQuery, selectedRole, selectedStatus, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    const filteredCount = users.filter(user => {
      const matchesSearch =
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.position ? user.position.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
        (user.department ? user.department.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
        (user.employeeStatus ? user.employeeStatus.toLowerCase().includes(searchQuery.toLowerCase()) : false);

      const matchesRole =
        selectedRole === 'All' || (user.position && user.position === selectedRole);

      const matchesStatus =
        selectedStatus === 'All' || (user.employeeStatus && user.employeeStatus === selectedStatus);

      return matchesSearch && matchesRole && matchesStatus;
    }).length;
    return Math.ceil(filteredCount / itemsPerPage);
  }, [users, searchQuery, selectedRole, selectedStatus, itemsPerPage]);


  const toggleDropdown = (userId) => {
    setOpenDropdownId(openDropdownId === userId ? null : userId);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest('button[data-dropdown-toggle]')) {
      setOpenDropdownId(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axiosInstance.delete(`/admin/deleteuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      toast.success('User deleted successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Re-fetch users after deletion
      const response = await axiosInstance.get(`/admin/getusers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setUsers(response.data.allUsers);
    } catch (error) {
      toast.error('Failed to delete user', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/admin/getusers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setUsers(response.data.allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        <AdminSidebar />
      </div>
      <ToastContainer />

      <div className='bg-blue-50' style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <header className="flex border shadow-lg rounded-sm bg-[#2F3849] mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3">
          <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <a className="flex-none font-semibold text-xl text-white focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
              Employee List
            </a>
            <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
              <Link to={'/admin/Usermanagment/adduser'} >
                <button className="px-4 py-2 rounded-full text-white hover:bg-white transition-colors duration-300 hover:text-slate-600 focus:outline-none focus:bg-blue-600">
                  Add Employee
                </button>
              </Link>
            </div>
          </nav>
        </header>

        <div className="mx-auto max-w-screen-xl px-">
          <div className="bg-white dark:bg-white relative shadow-lg sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              {/* Search Input */}
              <div className="w-full md:w-1/2">
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
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                {/* Role Filter Dropdown */}
                <select
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setCurrentPage(1); // Reset to first page on new filter
                  }}
                >
                  {uniqueRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>

                {/* Status Filter Dropdown */}
                <select
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1); // Reset to first page on new filter
                  }}
                >
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <hr />
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-white dark:text-black">
                  <tr>
                    <th scope="col" className="px-4 py-3">Full Name</th>
                    <th scope="col" className="px-4 py-3">Email</th>
                    <th scope="col" className="px-4 py-3">Role</th>
                    <th scope="col" className="px-4 py-3">Department</th>
                    <th scope="col" className="px-4 py-3">Status</th>
                    <th scope="col" className="px-4 py-3">Date Joined</th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndPaginatedUsers.length > 0 ? (
                    filteredAndPaginatedUsers.map(user => (
                      <tr className="border-b text-black relative" key={user._id}>
                        <td className="px-4 py-3">{user.firstName} {user.lastName}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">{user.position}</td>
                        <td className="px-4 py-3 ">{user.department ? `${user.department.departmentName}` : 'Department Not Assigned'}</td>
                        <td className="px-4 py-3">{user.employeeStatus}</td>
                        <td className="px-4 py-3">
                          {new Date(user.dateOfJoining).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </td>
                        <td className="px-4 py-3 flex items-center justify-end relative">
                          <button
                            id={`dropdown-button-${user._id}`}
                            data-dropdown-toggle={`dropdown-${user._id}`}
                            className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-black dark:hover:text-gray-100"
                            type="button"
                            onClick={() => toggleDropdown(user._id)}
                          >
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </button>
                          {openDropdownId === user._id && (
                            <div
                              ref={dropdownRef}
                              id={`dropdown-${user._id}`}
                              className="absolute right-0 mt-2 z-20 w-44 bg-white rounded divide-y divide-gray-100 shadow "
                            >
                              <ul className="py-1 text-sm text-dark dark:text-dark" aria-labelledby={`dropdown-button-${user._id}`}>
                                <Link to={`/admin/showuser/${user._id}`}>
                                  <li>
                                    <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                  </li>
                                </Link>
                                <Link to={`/admin/edituser/${user._id}`}>
                                  <li>
                                    <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                  </li>
                                </Link>
                              </ul>
                              <div className="py-1">
                                <a onClick={() => handleDelete(user._id)} className="block py-2 px-4 text-sm text-red-700 hover:bg-gray-100 ">Delete</a>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center p-4">No users found.</td>
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
                  onChange={(event, value) => setCurrentPage(value)}
                  color="primary"
                />
              </nav>
            )}
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default Usermanagment;
