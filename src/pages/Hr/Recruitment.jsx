import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { useJobListings } from '../../hooks/hr/useJobListings';
import { useJobApplications } from '../../hooks/hr/useJobApplications';
import HrSidebar from '../../components/Sidebar/HrSidebar';
import axiosInstance from '../../config/axiosConfig';

const Recruitment = () => {
  const { hr } = useSelector((state) => state.hrAuth);
  const userId = hr.hr._id;

  const { listData, loading: listLoading } = useJobListings();
  const { showData, loading: appLoading, fetchList } = useJobApplications();

  const [searchApp, setSearchApp] = useState('');
  const [searchJob, setSearchJob] = useState('');
  const [appPage, setAppPage] = useState(1);
  const [jobPage, setJobPage] = useState(1);
  const itemsPerPage = 5;

  const filteredApplications = useMemo(() => {
    return showData.filter(item =>
      item.name.toLowerCase().includes(searchApp.toLowerCase()) ||
      item.phone.includes(searchApp) ||
      item.jobId?.jobTitle?.toLowerCase().includes(searchApp.toLowerCase())
    );
  }, [showData, searchApp]);

  const paginatedApplications = useMemo(() => {
    const start = (appPage - 1) * itemsPerPage;
    return filteredApplications.slice(start, start + itemsPerPage);
  }, [filteredApplications, appPage]);

  const filteredJobs = useMemo(() => {
    return listData.filter(job =>
      job.jobTitle.toLowerCase().includes(searchJob.toLowerCase()) ||
      job.department.toLowerCase().includes(searchJob.toLowerCase()) ||
      job.location.toLowerCase().includes(searchJob.toLowerCase())
    );
  }, [listData, searchJob]);

  const paginatedJobs = useMemo(() => {
    const start = (jobPage - 1) * itemsPerPage;
    return filteredJobs.slice(start, start + itemsPerPage);
  }, [filteredJobs, jobPage]);

  const handleDeleteJob = async (listId) => {
    try {
      await axiosInstance.delete(`/jobs/deleteitem/${listId}`);
      toast.success("Job listing deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error deleting the job listing.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteApplication = async (appId) => {
    try {
      await axiosInstance.delete(`/jobs/deleteapplication/${appId}`);
      toast.success("Application deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      fetchList();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error deleting the application.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <HrSidebar />
      </div>
      <div className="lg:hidden">
        <HrSidebar />
      </div>

      <div className="bg-blue-50" style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <div className="flex flex-col w-full min-h-screen">
          <header className="bg-[#2F3849] text-white border-b px-4 md:px-6 flex items-center h-16 justify-between">
            <h1 className="text-xl">Recruitment Management</h1>
            <Link to={'/hr/recruitment/addpost'}>
              <button className="rounded-full text-white hover:bg-white transition-colors duration-300 py-1 px-2 hover:text-slate-600">
                Add Job Post
              </button>
            </Link>
          </header>

          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={listLoading || appLoading}>
            <ScaleLoader color="#ffffff" height={35} width={4} radius={2} margin={2} />
          </Backdrop>

          <main className="flex-1 bg-white rounded-md gap-2 p-4 md:p-6">

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-4 lg:p-2 items-center justify-between">
                  <h3 className="text-xl font-semibold">Pending Application</h3>
                  <div className="text-2xl font-bold">{showData.length}</div>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-4 lg:p-2 items-center justify-between">
                  <h3 className="text-xl font-semibold">Job Listings</h3>
                  <div className="text-2xl font-bold">{listData.length}</div>
                </div>
              </div>
            </div>

            {/* Toast */}
            <ToastContainer />

            {/* Applications */}
            <h3 className="text-xl md:text-2xl font-semibold ml-2">Applications</h3>
            <input
              type="text"
              placeholder="Search applications..."
              className="border p-2 rounded my-2 w-full"
              value={searchApp}
              onChange={(e) => {
                setSearchApp(e.target.value);
                setAppPage(1);
              }}
            />
            <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                  <tr className="border-b">
                    <th className="h-12 px-4 text-left font-medium text-gray-600">Applicant</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-600">Updated</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-600">Contact No.</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-600">Referred By</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-600">Job</th>
                    <th className="h-12 px-4 text-right font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedApplications.length > 0 ? paginatedApplications.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4">{item.name}</td>
                      <td className="p-4">{new Date(item.updatedAt).toLocaleDateString()}</td>
                      <td className="p-4">{item.phone}</td>
                      <td className="p-4">{item.referer ? `${item.referer.firstName} ${item.referer.lastName}` : 'Not Found'}</td>
                      <td className="p-4">{item.jobId ? item.jobId.jobTitle : 'Not Found'}</td>
                      <td className="p-4 text-right">
                        <Link to={`/hr/recruitment/view/${item._id}`}>
                          <button className="mr-2 text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3">View</button>
                        </Link>
                        <button onClick={() => handleDeleteApplication(item._id)} className="text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3 text-red-500">Delete</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4">No applications found</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-center items-center gap-2 p-3">
                <button disabled={appPage === 1} onClick={() => setAppPage(appPage - 1)}>Previous</button>
                <span>Page {appPage}</span>
                <button disabled={appPage * itemsPerPage >= filteredApplications.length} onClick={() => setAppPage(appPage + 1)}>Next</button>
              </div>
            </div>

            {/* Job Listings */}
            <h3 className="text-xl md:text-2xl font-semibold mt-6 ml-2">Job Listings</h3>
            <input
              type="text"
              placeholder="Search job listings..."
              className="border p-2 rounded my-2 w-full"
              value={searchJob}
              onChange={(e) => {
                setSearchJob(e.target.value);
                setJobPage(1);
              }}
            />
            <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                  <tr className="border-b">
                    <th className="h-12 px-4 text-left font-medium text-gray-600">Job Title</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-600">Department</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-600">Location</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-600">Date Posted</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-600">Application Deadline</th>
                    <th className="h-12 px-4 text-right font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobs.length > 0 ? paginatedJobs.map((job, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4">{job.jobTitle}</td>
                      <td className="p-4">{job.department}</td>
                      <td className="p-4">{job.location}</td>
                      <td className="p-4">{new Date(job.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">{new Date(job.applicationDeadline).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDeleteJob(job._id)} className="text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3 text-red-500">Delete</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4">No job listings found</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-center items-center gap-2 p-3">
                <button disabled={jobPage === 1} onClick={() => setJobPage(jobPage - 1)}>Previous</button>
                <span>Page {jobPage}</span>
                <button disabled={jobPage * itemsPerPage >= filteredJobs.length} onClick={() => setJobPage(jobPage + 1)}>Next</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
