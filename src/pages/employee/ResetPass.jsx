import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import useResetPassword from '../../hooks/employee/useResetPassword.jsx';
import ModalSuccess from '../../components/employee/modal/ModalSuccess.jsx';

const ResetPass = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();
  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee?.user?._id;

  const { sendResetLink, loading, isModalOpen, setIsModalOpen } = useResetPassword(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    await sendResetLink(email);
  };

  return (
    <div className="mt-24 text-center">
      <ToastContainer />
      <h2 className="text-4xl">Confirm Email</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 mx-auto mt-4">
        <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">Email address</label>
        <input
          id="email"
          type="email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
          Send Reset Password
        </button>

        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </form>

      {isModalOpen && <ModalSuccess onClose={() => setIsModalOpen(false)} onContinue={() => navigate('/employee/profile')} />}
    </div>
  );
};

export default ResetPass;
