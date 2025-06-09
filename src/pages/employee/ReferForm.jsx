import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar';
import InputField from '../../components/employee/forms/ReferForm/InputField';
import TextArea from '../../components/employee/forms/ReferForm/TextArea';
import FileUpload from '../../components/employee/forms/ReferForm/FileUpload';
import { useReferJob } from '../../hooks/employee/useReferJob';

const ReferForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    qualifications: '',
    portfolio: '',
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee?.user?._id || '';
  const { jobId } = useParams();
  const navigate = useNavigate();

  const { referCandidate, loading } = useReferJob();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name?.trim()) newErrors.name = 'Name is required';
    if (!form.email?.trim()) newErrors.email = 'Email is required';
    if (!form.phone?.trim()) newErrors.phone = 'Phone is required';
    if (!form.address?.trim()) newErrors.address = 'Address is required';
    if (!form.qualifications?.trim()) newErrors.qualifications = 'Qualifications required';
    if (!form.portfolio?.trim()) newErrors.portfolio = 'Portfolio URL is required';
    if (!form.resume) newErrors.resume = 'Resume is required';
    
    // Email validation
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setSuccessMsg('');
    setErrors({});
    
    console.log('Form submission started');
    console.log('Form data:', form);
    console.log('User ID:', userId);
    console.log('Job ID:', jobId);
    
    // Validate required data
    if (!userId) {
      toast.error('User not authenticated');
      return;
    }
    
    if (!jobId) {
      toast.error('Job ID is missing');
      return;
    }
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      console.log('Validation errors:', validationErrors);
      setErrors(validationErrors);
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const formData = new FormData();
      
      // Append form fields
      formData.append('name', form.name.trim());
      formData.append('email', form.email.trim());
      formData.append('phone', form.phone.trim());
      formData.append('address', form.address.trim());
      formData.append('qualifications', form.qualifications.trim());
      formData.append('portfolio', form.portfolio.trim());
      formData.append('referer', userId);
      formData.append('jobId', jobId);
      
      // Append resume file
      if (form.resume) {
        formData.append('resume', form.resume);
      }
      
      // Debug: Log FormData contents
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const result = await referCandidate(formData);
      console.log('API Result:', result);
      
      if (result.success) {
        setSuccessMsg('Form submitted successfully!');
        toast.success('Referral submitted successfully!');
        setTimeout(() => navigate('/employee/jobs'), 2000);
        
        // Reset form
        setForm({
          name: '',
          email: '',
          phone: '',
          address: '',
          qualifications: '',
          portfolio: '',
          resume: null,
        });
      } else {
        console.error('API Error:', result.error);
        toast.error(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  // Debug: Log component state
  useEffect(() => {
    console.log('Component state:', { userId, jobId, employee });
  }, [userId, jobId, employee]);

  return (
    <div className="flex h-full min-h-screen">
      <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="hidden lg:block w-[250px]">
        <EmployeeSidebar />
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>
      <div className="flex-1 p-4">
        <div className="max-w-3xl mx-auto border rounded-lg p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Refer a New Employee</h1>
            <p className="text-muted-foreground">Help us find the perfect candidate.</p>
          </div>
          
          {successMsg && (
            <div className="text-green-600 font-semibold mt-4 text-center">
              {successMsg}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField 
                label="Name" 
                id="name" 
                value={form.name} 
                onChange={(e) => handleChange('name', e.target.value)} 
                error={errors.name} 
                placeholder="Candidate's name" 
              />
              <InputField 
                label="Email" 
                id="email" 
                type="email" 
                value={form.email} 
                onChange={(e) => handleChange('email', e.target.value)} 
                error={errors.email} 
                placeholder="Candidate's email" 
              />
              <InputField 
                label="Phone" 
                id="phone" 
                value={form.phone} 
                onChange={(e) => handleChange('phone', e.target.value)} 
                error={errors.phone} 
                placeholder="Phone number" 
              />
              <InputField 
                label="Address" 
                id="address" 
                value={form.address} 
                onChange={(e) => handleChange('address', e.target.value)} 
                error={errors.address} 
                placeholder="Address" 
              />
            </div>
            
            <FileUpload 
              id="resume" 
              onChange={(e) => handleChange('resume', e.target.files[0])} 
              error={errors.resume} 
            />
            
            <TextArea 
              label="Qualifications" 
              id="qualifications" 
              value={form.qualifications} 
              onChange={(e) => handleChange('qualifications', e.target.value)} 
              error={errors.qualifications} 
              placeholder="Qualifications" 
            />
            
            <InputField 
              label="Portfolio" 
              id="portfolio" 
              value={form.portfolio} 
              onChange={(e) => handleChange('portfolio', e.target.value)} 
              error={errors.portfolio} 
              placeholder="Portfolio URL" 
            />
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                disabled={loading}
                className="inline-flex items-center justify-center rounded-md border bg-background hover:bg-accent h-10 px-4 py-2 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Referral'}
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ReferForm;