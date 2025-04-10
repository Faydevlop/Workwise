import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import HrSidebar from '../../components/Sidebar/HrSidebar';
import NotificationBox from '../../components/notification/notificationBox';
import ProfileImage from '../../components/employee/profile/ProfileImage';
import UserInfo from '../../components/hr/profile/UserInfo';
import BackdropLoader from '../../components/employee/loader/BackdropLoader2';
import useFetchUser from '../../hooks/hr/useFetchUser';

const HrProfile = () => {
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const togglePasswordSection = () => {
    setShowPasswordSection(!showPasswordSection);
  };

  const { hr } = useSelector((state) => state.hrAuth);
  const userId = hr.hr._id;

  const { user, loading } = useFetchUser(userId);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <HrSidebar />
      </div>
      <div className="lg:hidden">
        <HrSidebar />
      </div>

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

            <BackdropLoader loading={loading} />
            <ProfileImage imageUrl={user?.profileImageUrl} altText="Profile" />
          </div>
          {user && (
            <div className="mt-20 md:flex md:justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-600 font-bold text-1xl mb-4">{user.position}</p>
                <UserInfo user={user} />
              </div>
              <div className="mt-8 md:mt-0">
                <Link to={'/hr/request-reset-password'}>
                  <button className="bg-blue-500 rounded-lg hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4">
                    Change Password
                  </button>
                </Link>

                <Link to={`/hr/profile/editprofile/${userId}`}>
                  <button className="bg-blue-500 ml-4 rounded-lg hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <NotificationBox userId={userId} />
    </div>
  );
};

export default HrProfile;
