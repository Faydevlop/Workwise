// pages/EmployeeProfile.js

import React, { useState } from 'react';
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import NotificationBox from '../../components/notification/notificationBox';
import useUserData from '../../hooks/employee/useUserData';
import ProfileImage from '../../components/employee/profile/ProfileImage';
import UserDetails from '../../components/employee/profile/UserDetails';
import ProfileActions from '../../components/employee/profile/ProfileActions';

const EmployeeProfile = () => {
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const togglePasswordSection = () => setShowPasswordSection(!showPasswordSection);

  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee.user._id;

  const { user, loading } = useUserData(userId);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar />
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>
      
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <ScaleLoader color="#ffffff" height={35} width={4} radius={2} margin={2} />
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <input type="file" id="cover-upload" className="hidden" />
            </label>
            <ProfileImage imageUrl={user.profileImageUrl} />
          </div>

          <div className="mt-20 md:flex md:justify-between">
            <UserDetails user={user} />
            <ProfileActions userId={userId} />
          </div>
        </div>
      </div>

      <NotificationBox userId={userId} />
    </div>
  );
};

export default EmployeeProfile;
