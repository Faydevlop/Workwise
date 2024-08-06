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
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getuser/${userId}`);
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
          await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/deleteuser/${userId}`)
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
                <div className="max-w-lg ml-5 my-10 bg-white rounded-lg shadow-md p-5">
                    <img className="w-32 h-32 rounded-full mx-auto" src={user.profilePicture || 'https://picsum.photos/200'} alt="Profile picture" />
                    <h2 className="text-center text-2xl font-semibold mt-3">{user.firstName} {user.lastName}</h2>
                    <p className="text-center text-gray-600 mb-5 mt-1">{user.position}</p>
                    <hr />
                    <div className="mt-5">
                        <h4 className="text-xl font-semibold">Personal Details</h4>
                        <div className="text-gray-600 mt-2">
                            <p><strong>First Name:</strong> {user.firstName}</p>
                            <p><strong>Last Name:</strong> {user.lastName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Date of Birth:</strong> {user.dob}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <p><strong>Gender:</strong> {user.gender}</p>
                            <p><strong>Address:</strong> {user.address}</p>
                            </div>
                            <h4 className="text-xl font-semibold">Professional Details</h4>
                            <div className="text-gray-600 mt-2">
                            <p><strong>Department:</strong> {user.department}</p>
                            <p><strong>Position:</strong> {user.position}</p>
                            <p><strong>Date of Joining:</strong> {user.dateOfJoining}</p>
                            <p><strong>Salary:</strong> {user.salary}</p>
                            <p><strong>Employee Status:</strong> {user.employeeStatus}</p>
                        </div>
                        <div className="flex space-x-4 mt-4">
                          <Link to={`/admin/edituser/${userId}`}>
                          <button type="button" className="flex items-center justify-center text-white bg-blue-500 hover:bg-gray-400 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                Edit
                            </button>
                          </Link>
                           
                            <button onClick={handleDelete}  type="button" className="flex items-center justify-center text-white bg-red-500 hover:bg-gray-400 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Showuser;
