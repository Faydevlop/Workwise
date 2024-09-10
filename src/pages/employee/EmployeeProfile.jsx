import React, { useEffect, useState } from 'react';
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';

const EmployeeProfile = () => {
  const [user,setUser] = useState('')
  const [loading,setLoading] = useState(false)
  const [showPasswordSection, setShowPasswordSection] = useState(false);


  const togglePasswordSection = () => {
    setShowPasswordSection(!showPasswordSection);
  };

  const { employee } = useSelector((state) => state.employeeAuth);
  console.log(employee.user);
  const userId = employee.user._id

  useEffect(() => {
    setLoading(true)
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
console.log(user.profileImageUrl);


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar />
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>
      <Backdrop
  sx={{
    color: '#fff',
    
    zIndex: (theme) => theme.zIndex.drawer + 1,
  }}
  open={loading}
>
  <ScaleLoader
    color="#ffffff" // Adjust the spinner color
    height={35}     // Adjust the height
    width={4}       // Adjust the width
    radius={2}      // Adjust the radius
    margin={2}      // Adjust the margin between spinners
  />
</Backdrop>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <div className="bg-white ml-7 rounded-lg shadow-md p-6 md:p-8">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Cover"
              className="rounded-t-lg w-full h-48 object-cover"
            />
            <label htmlFor="cover-upload" className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <input type="file" id="cover-upload" className="hidden" />
            </label>
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img
                  src={ user.profileImageUrl }
                  alt="Profile"
                  className="rounded-full w-32 h-32 mb-4 md:mb-0 md:mr-6 border-4 border-white"
                />
                
              </div>
            </div>
          </div>
          <div className="mt-20 md:flex md:justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-600 font-bold text-1xl mb-4">{user.position}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center mb-4">
                  <span>Email: {user.email}</span>
                </div>
                <div className="flex items-center mb-4">
                  <span>Phone: {user.phone}</span>
                </div>
                <div className="flex items-center mb-4">
                  <span>DOB: {new Date(user.dob).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center mb-4">
                  <span>Gender: {user.gender}</span>
                </div>
                <div className="flex items-center mb-4">
                  <span>Address: {user.address}</span>
                </div>
                <div className="flex items-center mb-4">
                  <span>Department: {user.department}</span>
                </div>
                <div className="flex items-center mb-4">
                  <span>Position: {user.position}</span>
                </div>
                <div className="flex items-center mb-4">
                  <span>Date of Joining: {new Date(user.dateOfJoining).toLocaleDateString()}</span>
                </div>
               
                <div className="flex items-center mb-4">
                  <span>Status: {user.employeeStatus}</span>
                </div>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <Link to={'/employee/request-reset-password'}>
              <button
               
                className="bg-blue-500 rounded-lg hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4"
              >
               Change Password
              </button>
              
              </Link>
              
              <Link to={`/employee/editprofile/${employee.user._id}`} >
              <button className="bg-blue-500 ml-4  rounded-lg hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4">
                Edit Profile
              </button>
              </Link>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;