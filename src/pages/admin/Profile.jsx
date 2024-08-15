import React, { useState } from 'react'
import AdminSidebar from '../../components/Sidebar/AdminSidebar'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Profile = () => {
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const togglePasswordSection = () => {
    setShowPasswordSection(!showPasswordSection);
  };

  const { admin } = useSelector((state) => state.auth.admin);
  console.log(admin);
  

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        <AdminSidebar />
      </div>

      <div className='bg-blue-50' style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <div className="bg-white ml-7 rounded-lg shadow-md p-6 md:p-8">
          <div className="relative">
            <img
              src="https://via.placeholder.com/1920x400"
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
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="rounded-full w-32 h-32 mb-4 md:mb-0 md:mr-6 border-4 border-white"
                />
                <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer">
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
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <input type="file" id="photo-upload" className="hidden" />
                </label>
              </div>
            </div>
          </div>
          <div className="mt-20 md:flex md:justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{admin?.username} </h2>
              <p className="text-gray-600 font-bold text-1xl mb-4">Admin</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center mb-4">
                  <span>Email: {admin?.email}</span>
                </div>
                
               
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <button
                onClick={togglePasswordSection}
                className="bg-blue-500 rounded-lg hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4"
              >
                {showPasswordSection ? 'Hide Password Section' : 'Change Password'}
              </button>

              
              

            </div>
          </div>  
          {showPasswordSection && (
            <div>
              <h3 className="text-xl font-bold mb-4">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="current-password" className="block mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button className="flex mt-5 items-center justify-center text-white bg-blue-500 hover:bg-gray-400 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
   
  )
}

export default Profile
