import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar';
import { useSelector } from 'react-redux';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router-dom';

const ReferForm = () => {

    const [loading ,setLoading] = useState(false)
  // Individual state for each form field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [resume, setResume] = useState(null);
  const [referer,setReferes] = useState('')

  const navigate = useNavigate()
  const {jobId} = useParams()

  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee.user._id

  useEffect(() => {
    setReferes(userId);
  }, [userId]);

  // State for form errors
  const [errors, setErrors] = useState({});

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!phone) newErrors.phone = 'Phone number is required';
    if (!address) newErrors.address = 'Address is required';
    if (!qualifications) newErrors.qualifications = 'Qualifications are required';
    if (!portfolio) newErrors.portfolio = 'Portfolio URL is required';
    // if (!resume) newErrors.resume = 'Resume is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Create form data object for file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('qualifications', qualifications);
    formData.append('portfolio', portfolio);
    if (resume) formData.append('resume', resume); 
    formData.append('referer', referer);
    formData.append('jobId',jobId)

    // console.log('Form data is being submitted', { referer });
    // console.log(formData);
    setLoading(true)
    

    try {
      // Send the form data to the server using Axios
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/jobs/referjob`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted successfully', response);

      toast.success("Form Submited successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose:()=>navigate('/employee/jobs')
       
      });

      // Reset the form state after successful submission
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setQualifications('');
      setPortfolio('');
      setResume(null);
      setErrors({});
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred while submitting the form"
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Error submitting the form', error);
    }finally{
        setLoading(false)
      }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            
          >
            <CircularProgress color="inherit" />
          </Backdrop>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar />
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>
      <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <div id="6fatoo6vwmn" className="container mx-auto max-w-1xl px-4 py-12 border border-muted rounded-lg">
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Refer a New Employee</h1>
              <p className="text-muted-foreground">Help us find the perfect candidate for your team.</p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input
                    id="name"
                    placeholder="Enter the candidate's name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex h-10 w-full rounded-md border"
                  />
                  {errors.name && <span className="text-red-500">{errors.name}</span>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter the candidate's email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex h-10 w-full rounded-md border"
                  />
                  {errors.email && <span className="text-red-500">{errors.email}</span>}
                </div>
              </div>
             

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <input
                    id="phone"
                    placeholder="Enter the candidate's phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex h-10 w-full rounded-md border"
                  />
                  {errors.phone && <span className="text-red-500">{errors.phone}</span>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">Address</label>
                  <input
                    id="address"
                    placeholder="Enter the candidate's address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="flex h-10 w-full rounded-md border"
                  />
                  {errors.address && <span className="text-red-500">{errors.address}</span>}
                </div>
              </div>
            <ToastContainer/>
              <div className="space-y-2">
                <label htmlFor="resume" className="text-sm font-medium">Resume</label>
                <input
                  id="resume"
                  type="file"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="flex h-10 w-full rounded-md border"
                />
                {errors.resume && <span className="text-red-500">{errors.resume}</span>}
              </div>

              <div className="space-y-2">
                <label htmlFor="qualifications" className="text-sm font-medium">Qualifications</label>
                <textarea
                  id="qualifications"
                  placeholder="Enter the candidate's qualifications"
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  className="flex min-h-[80px] w-full rounded-md border"
                ></textarea>
                {errors.qualifications && <span className="text-red-500">{errors.qualifications}</span>}
              </div>

              <div className="space-y-2">
                <label htmlFor="portfolio" className="text-sm font-medium">Portfolio</label>
                <input
                  id="portfolio"
                  placeholder="Enter the candidate's portfolio URL"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="flex h-10 w-full rounded-md border"
                />
                {errors.portfolio && <span className="text-red-500">{errors.portfolio}</span>}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md border bg-background hover:bg-accent h-10 px-4 py-2"
                >
                  Submit Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferForm;
