import React, { useEffect, useState, useMemo } from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import axiosInstance from '../../config/axiosConfig';
import { TextField, Pagination } from '@mui/material'; // Import TextField and Pagination

const Projectmanagment = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // States for search, filter, and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'in-progress', 'Completed'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of projects to display per page in the grid

  // Fetch projects data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/admin/getprojects`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoized filtered and paginated project data
  const filteredAndPaginatedProjects = useMemo(() => {
    let currentProjects = [...projects]; // Create a mutable copy

    // 1. Apply Search Filter
    if (searchQuery) {
      currentProjects = currentProjects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.status && project.status.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // 2. Apply Status Filter
    if (filterStatus !== 'All') {
      currentProjects = currentProjects.filter(project =>
        project.status === filterStatus
      );
    }

    // 3. Sort by creation date (latest first) for consistent display
    currentProjects.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)); // Assuming startDate is creation date for sorting

    // 4. Apply Pagination
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return currentProjects.slice(start, end);
  }, [projects, searchQuery, filterStatus, currentPage, itemsPerPage]);

  // Calculate total pages for the Pagination component (based on filtered count)
  const totalPages = useMemo(() => {
    const filteredCount = projects.filter(project => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.status && project.status.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = filterStatus === 'All' || project.status === filterStatus;

      return matchesSearch && matchesStatus;
    }).length;
    return Math.ceil(filteredCount / itemsPerPage);
  }, [projects, searchQuery, filterStatus, itemsPerPage]);

  // Event handlers
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate counts for summary cards (these should always reflect total projects)
  const totalProjectsCount = projects.length;
  const completedProjectsCount = projects.filter(project => project.status === 'Completed').length;
  const inProgressProjectsCount = projects.filter(project => project.status === 'in-progress').length;


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        <AdminSidebar />
      </div>

      <div className='bg-blue-50' style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <div className="w-full min-h-screen bg-background text-foreground">
          <header className="flex items-center bg-[#2F3849] rounded-lg justify-between px-6 py-4 border-b">
            <h1 className="text-2xl text-white ">All Projects</h1>
            <div className="flex items-center gap-4">
              <Link to={'/admin/projectmanagment/addproject'}>
                <button className="inline-flex items-center bg-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
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
                    className="w-4 h-4 mr-2"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                  New Project
                </button>
              </Link>
            </div>
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

          <div className="container mx-auto py-8 px-6">
            <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border bg-card bg-white text-card-foreground shadow-lg rounded-xl p-6" data-v0-t="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Total Projects</h3>
                  <div className="text-2xl font-bold">{totalProjectsCount}</div>
                </div>
                <p className="text-sm text-muted-foreground">Total number of projects in the system.</p>
              </div>
              <div className="border bg-card bg-white text-card-foreground shadow-lg rounded-xl p-6" data-v0-t="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Completed</h3>
                  <div className="text-2xl font-bold">{completedProjectsCount}</div>
                </div>
                <p className="text-sm text-muted-foreground">The number of completed projects.</p>
              </div>
              <div className="border bg-card bg-white text-card-foreground shadow-lg rounded-xl p-6" data-v0-t="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">In Progress</h3>
                  <div className="text-2xl font-bold">{inProgressProjectsCount}</div>
                </div>
                <p className="text-sm text-muted-foreground">Projects currently in progress.</p>
              </div>
            </div>

            <hr className='h-2' />
            <h2 className="text-xl font-bold mb-4">Current Projects</h2>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <TextField
                label="Search Projects"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full sm:w-2/3"
              />
              <select
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-14 px-3 w-full sm:w-1/3"
                value={filterStatus}
                onChange={handleFilterStatusChange}
              >
                <option value="All">All Statuses</option>
                <option value="in-progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndPaginatedProjects.length > 0 ? (
                filteredAndPaginatedProjects.map(project => (
                  <Link to={`/admin/Projectmanagment/${project._id}`} key={project._id}>
                    <div className="border bg-white bg-card text-card-foreground shadow-lg rounded-xl overflow-hidden h-full flex flex-col" data-v0-t="card">
                      <div className="p-6 flex-grow">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold">{project.name}</h2>
                          <div
                            className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                              ${project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'}`
                            }
                            data-v0-t="badge"
                          >
                            {project.status}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                        <div className="text-sm text-muted-foreground mt-auto">
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
                            className="w-4 h-4 mr-1 inline-block"
                          >
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                            <path d="M3 10h18"></path>
                            <path d="M8 14h.01"></path>
                            <path d="M12 14h.01"></path>
                            <path d="M16 14h.01"></path>
                            <path d="M8 18h.01"></path>
                            <path d="M12 18h.01"></path>
                            <path d="M16 18h.01"></path>
                          </svg>
                          {new Date(project.startDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="md:col-span-3 text-center p-8">No projects found.</div>
              )}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projectmanagment;
