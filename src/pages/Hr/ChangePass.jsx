import React, { useEffect, useState } from 'react';
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const ChangePass = () => {

  const [email,setEmail] = useState('')
  const [emailError, setEmailError] = useState('');
  const [loading,setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const navigate = useNavigate()

  const handleContinue = () => {
    setShowModal(false); // Close the modal
    navigate('/hr/profile'); // Redirect to profile page
  };

  
  const {hr} = useSelector((state)=>state.hrAuth)
  const userId = hr.hr._id
  
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
    setLoading(true);  
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/employee/reqest-reset-password/${userId}`, { email },{
        
      });
      setIsModalOpen(true); // Show the modal on success
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while sending the reset link.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div>
    <div className="text-center mt-24">
      <div className="flex items-center justify-center">
        <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h2 className="text-4xl tracking-tight">Confirm Email</h2>
      <ToastContainer />
    </div>
    <div className="flex justify-center my-2 mx-4 md:mx-0">
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='email'>Email address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              type='email'
              id='email'
            />
            {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
          </div>
          <div className="w-full flex items-center justify-between px-3 mb-3 "></div>
          <div className="w-full md:w-full px-3 mb-6">
            <button type="submit" className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">Send Reset Password</button>
          </div>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </form>
    </div>

    {/* Modal */}
    {isModalOpen && (
      <div id="successModal" tabindex="-1" aria-hidden="true" class="fixed inset-0 z-50 flex justify-center items-center">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative p-4 text-center bg-white rounded-lg shadow  sm:p-5">
            <button
              type="button"
              
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg aria-hidden="true" className="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="sr-only">Success</span>
            </div>
            <p className="mb-4 text-lg font-semibold text-gray-900 ">Successfully sent the reset link.</p>
            <button
              type="button"
              className="py-2 px-3 text-sm font-medium text-center text-black rounded-lg bg-primary-600 hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default ChangePass;