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
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.phone) newErrors.phone = 'Phone is required';
    if (!form.address) newErrors.address = 'Address is required';
    if (!form.qualifications) newErrors.qualifications = 'Qualifications required';
    if (!form.portfolio) newErrors.portfolio = 'Portfolio URL is required';
    if (!form.resume) newErrors.resume = 'Resume is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('referer', userId);
    formData.append('jobId', jobId);

    const result = await referCandidate(formData);
    if (result.success) {
  setSuccessMsg('Form submitted');
  setTimeout(() => navigate('/employee/jobs'), 2000);
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
  toast.error(result.error);
}

  };

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
              <InputField label="Name" id="name" value={form.name} onChange={(e) => handleChange('name', e.target.value)} error={errors.name} placeholder="Candidate's name" />
              <InputField label="Email" id="email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} error={errors.email} placeholder="Candidate's email" />
              <InputField label="Phone" id="phone" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} error={errors.phone} placeholder="Phone number" />
              <InputField label="Address" id="address" value={form.address} onChange={(e) => handleChange('address', e.target.value)} error={errors.address} placeholder="Address" />
            </div>
            <FileUpload id="resume" onChange={(e) => handleChange('resume', e.target.files[0])} error={errors.resume} />
            <TextArea label="Qualifications" id="qualifications" value={form.qualifications} onChange={(e) => handleChange('qualifications', e.target.value)} error={errors.qualifications} placeholder="Qualifications" />
            <InputField label="Portfolio" id="portfolio" value={form.portfolio} onChange={(e) => handleChange('portfolio', e.target.value)} error={errors.portfolio} placeholder="Portfolio URL" />
            <div className="flex justify-end">
              <button type="submit" className="inline-flex items-center justify-center rounded-md border bg-background hover:bg-accent h-10 px-4 py-2">
                Submit Referral
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
