import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Resetpage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the token from the URL query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      
      toast.error('Passwords do not match', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      return;
    }
    try {
      await axiosInstance.post(`/employee/reset-password`, { token, password });
      
      toast.success('Password has been reset', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose:()=>{navigate('/employee/login');}
       
      });
     
    } catch (error) {
      console.error('Error resetting password', error);      
      toast.error('Error resetting password', {
        position: "top-right",
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
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite    
        </a>
        <ToastContainer/>
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
            <div  className="relative">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
              
              <input 
                type={showPassword ? 'text' : 'password'} // For New Password
                name="password" 
                id="password" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                
              />
              <button 
  type="button" 
  onClick={() => setShowPassword(!showPassword)} // For New Password
  className="absolute mt-7 inset-y-0 right-0 flex items-center pr-3"
>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</button>
              
            </div>
            <div className='relative'>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
              
              <input 
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirm-password" 
                id="confirm-password" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                required 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
              
              <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} // For New Password
              className="absolute mt-7 inset-y-0 right-0 flex items-center pr-3"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
              
            </div>
            
            <button 
              type="submit" 
              className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Resetpage;
