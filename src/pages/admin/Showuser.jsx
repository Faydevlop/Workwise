import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast,ToastContainer } from 'react-toastify';

const Showuser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getuser/${userId}`,{
                  headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                  }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleDelete = async () =>{
      try {
          await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/deleteuser/${userId}`,{
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`,
            }
          })
          toast.success('User deleted successfully', {
              position: 'top-right',
              autoClose: 2000, // 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              onClose: () => navigate('/admin/Usermanagment')
          });

  
      } catch (error) {
          toast.error('Failed to delete user', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
      }
  
     
  }

    if (loading) {
        return (
            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (!user) {
        return <p>User not found</p>;
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div className="hidden lg:block" style={{ width: '250px' }}>
                <AdminSidebar />
            </div>
            <div className="lg:hidden">
                {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
                <AdminSidebar />
            </div>
            <ToastContainer/>

            <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                
                <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-10">
    <div className="bg-white shadow rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
      {/* Left section - Profile Info */}
      <div className="w-full md:w-2/3 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
          {/* Profile picture */}
          <div className="w-24 h-24 rounded-full border-4 border-white">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* User Information */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
            <p className="text-gray-600">User ID: 101</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
          <div className="mt-2 space-y-1">
            <p className="text-gray-600"><span className="font-medium">Full Name:</span>{user.firstName}{user.lastName}</p>
            <p className="text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>
            <p className="text-gray-600"><span className="font-medium">Phone Number:</span>  {user.phone}</p>
            <p className="text-gray-600"><span className="font-medium">Date of Birth:</span>  {user.dob}</p>
            <p className="text-gray-600"><span className="font-medium">Gender:</span>  {user.gender}</p>
            <p className="text-gray-600"><span className="font-medium">Address:</span>{user.address}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Professional Information</h3>
          <div className="mt-2 space-y-1">
            <p className="text-gray-600"><span className="font-medium">Role:</span> {user.position}</p>
            <p className="text-gray-600"><span className="font-medium">Department:</span>  {user.department}</p>
            <p className="text-gray-600"><span className="font-medium">Date Joined:</span> {user.dateOfJoining}</p>
            {/* <p className="text-gray-600"><span className="font-medium">Salary:</span> {user.salary}</p> */}
            <p className="text-gray-600"><span className="font-medium">Employment Status:</span> {user.employeeStatus}</p>
          </div>
        </div>

        
        <div className="mt-6  flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Assign Project</button> */}
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
          <Link to={`/admin/edituser/${userId}`}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">Edit</button>
          </Link>
        </div>
      </div>
      
      {/* Right section - Activity */}
      <div className="w-full md:w-1/3 bg-gray-100 p-6 md:p-8">
        <h3 className="text-lg font-semibold text-gray-800">Activity</h3>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Tasks Assigned</span>
            <span>15</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tasks Completed</span>
            <span>12</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Attendance</span>
            <span>98%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
            </div>
        </div>
    );
};

export default Showuser;
