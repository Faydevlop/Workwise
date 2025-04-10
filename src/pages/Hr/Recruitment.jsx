import React from 'react';
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
            {/* Job Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-4 lg:p-2 items-center justify-between">
                  <h3 className="whitespace-nowrap text-xl md:text-2xl font-semibold leading-none tracking-tight">Pending Application</h3>
                  <div className="text-2xl font-bold">{showData.length}</div>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-4 lg:p-2 items-center justify-between">
                  <h3 className="whitespace-nowrap text-xl md:text-2xl font-semibold leading-none tracking-tight">Job Listings</h3>
                  <div className="text-2xl font-bold">{listData.length}</div>
                </div>
              </div>
            </div>

            {/* Toast Container */}
            <ToastContainer />
            <h3 className="whitespace-nowrap text-xl md:text-2xl font-semibold leading-none ml-5 tracking-tight">Applications</h3>

            {/* Applications Table */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden mt-2">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                  <tr className="border-b">
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Applicant</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Position</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Contact No.</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Referred By</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Job</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {showData.length > 0 ? showData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 align-middle">{item.name}</td>
                      <td className="p-4 align-middle">{new Date(item.updatedAt).toLocaleDateString()}</td>
                      <td className="p-4 align-middle">{item.phone}</td>
                      <td className="p-4 align-middle">{item.referer ? `${item.referer.firstName} ${item.referer.lastName}` : 'Not Found'}</td>
                      <td className="p-4 align-middle">{item.jobId ? item.jobId.jobTitle : 'Not Found'}</td>
                      <td className="p-4 align-middle text-right">
                        <Link to={`/hr/recruitment/view/${item._id}`}>
                          <button className="mr-2 inline-flex items-center justify-center text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3">View</button>
                        </Link>
                        <button onClick={() => handleDeleteApplication(item._id)} className="inline-flex items-center justify-center text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3 text-red-500">Delete</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4">No applications found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <br />

            <h3 className="whitespace-nowrap text-xl md:text-2xl font-semibold leading-none ml-5 tracking-tight">Job Listings</h3>

            {/* Job Listings Table */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden mt-2">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                  <tr className="border-b">
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Job Title</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Department</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Location</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Date Posted</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Application Deadline</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listData.length > 0 ? listData.map((job, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 align-middle">{job.jobTitle}</td>
                      <td className="p-4 align-middle">{job.department}</td>
                      <td className="p-4 align-middle">{job.location}</td>
                      <td className="p-4 align-middle">{new Date(job.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 align-middle">{new Date(job.deadline).toLocaleDateString()}</td>
                      <td className="p-4 align-middle text-right">
                        <button onClick={() => handleDeleteJob(job._id)} className="inline-flex items-center justify-center text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3 text-red-500">Delete</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4">No job listings found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
