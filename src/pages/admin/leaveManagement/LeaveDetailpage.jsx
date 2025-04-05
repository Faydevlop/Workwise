import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/Sidebar/AdminSidebar';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../config/axiosConfig';

const LeaveDetailpage = () => {
  const [leave, setLeave] = useState(null);
  const { leaveId } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axiosInstance.get(`/leave/getdetails/${leaveId}`);
        console.log(response.data); // This will show the structure of the received data
        setLeave(response.data.leave); // Update this line to access the leave object correctly
      } catch (error) {
        console.error('Error fetching leave details:', error);
      }
    };
    fetchdata();
  }, [leaveId]);

  if (!leave) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        <AdminSidebar />
      </div>

      <div className='bg-blue-50' style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        {/* <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-blue-50 p-4"> */}
          <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden flex-col lg:flex-row">
            {/* Profile Section */}
            <div className="w-full lg:w-1/2 p-6">
              <div className="relative mb-6">
                <div className="h-24 bg-gradient-to-r from-blue-700 to-purple-600 rounded-t-lg"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <img 
                    src={ leave.userId.profileImageUrl ? `${import.meta.env.VITE_BASE_URL}/${leave.userId.profileImageUrl}` : 'https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png'}
                    alt={`${leave.userId.firstName} ${leave.userId.lastName}`}
                    className="w-20 h-20 rounded-full border-4 border-white"
                  />
                </div>
              </div>
              <div className="text-center mt-10 mb-6">
                <h2 className="text-xl font-semibold">{`${leave.userId.firstName} ${leave.userId.lastName}`}</h2>
                <p className="text-sm text-gray-500">{`User ID: ${leave.userId._id}`}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Full Name:</span> {leave.userId ? `${leave.userId.firstName} ${leave.userId.lastName}` : 'N/A'}</p>
                    <p><span className="font-medium">Email:</span> {leave.userId.email}</p>
                    <p><span className="font-medium">Phone Number:</span> {leave.userId.phone}</p>
                    <p><span className="font-medium">Address:</span> {leave.userId.address}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Professional Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Role:</span> {leave.userId.position}</p>
                    <p><span className="font-medium">Department:</span> {leave.userId.department}</p>
                    <p><span className="font-medium">Date Joined:</span> {new Date(leave.userId.dateOfJoining).toLocaleDateString()}</p>
                    <p><span className="font-medium">Employment Status:</span> {leave.userId.employeeStatus}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Section */}
            <div className="w-full lg:w-1/2 p-6 bg-gray-50">
              <h2 className="text-2xl font-semibold mb-6">Detail page</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Leave Request Details</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Leave Type:</span> {leave.leaveType}</p>
                  <p><span className="font-medium">Start Date:</span> {new Date(leave.startDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">End Date:</span> {new Date(leave.endDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Duration:</span> {Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24))} days</p>
                  <p><span className="font-medium">Request Date:</span> {new Date(leave.createdAt).toLocaleDateString()}</p>
                  <p><span className="font-medium">Leave Status:</span> <span className={`px-2 py-1 rounded-full text-sm ${leave.status === 'Approved' ? 'bg-green-200 text-green-800' : leave.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>{leave.status}</span></p>
                  <p><span className="font-medium">Reason:</span> {leave.reason}</p>
                  <p><span className="font-medium">Comments:</span> {leave.comment}</p>
                </div>
                {/* <div className="mt-6 flex space-x-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Approve</button>
                  <button className="px-4 py-2 bg-black text-white rounded-lg">Reject</button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default LeaveDetailpage;
