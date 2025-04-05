import React, { useState } from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../config/axiosConfig';

const Profile = () => {
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const togglePasswordSection = () => {
    setShowPasswordSection(!showPasswordSection);
  };

  // Ensure safe access to state
  const { admin } = useSelector((state) => state.auth.admin || {});

  // Check if 'admin' exists before rendering its properties
  if (!admin) {
    return <div>Loading...</div>;
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      const response = await axiosInstance.post(`/admin/changepass/${admin._id}`, {
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      setSuccess(response.data.message);
      setError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success("Password Changed successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setShowPasswordSection(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
      setSuccess('');
      const errorMessage = err.response?.data?.message;
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        <AdminSidebar />
      </div>

      <div className="bg-blue-50" style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <div className="bg-white ml-7 rounded-lg shadow-md p-6 md:p-8">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Cover"
              className="rounded-t-lg w-full h-48 object-cover"
            />
          </div>
          <ToastContainer />

          <div className="mt-20 md:flex md:justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{admin.username}</h2>
              <p className="text-gray-600 font-bold text-1xl mb-4">Admin</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center mb-4">
                  <span>Email: {admin.email}</span>
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
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="current-password" className="block mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
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
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={handleChangePassword}
                className="flex mt-5 items-center justify-center text-white bg-blue-500 hover:bg-gray-400 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
