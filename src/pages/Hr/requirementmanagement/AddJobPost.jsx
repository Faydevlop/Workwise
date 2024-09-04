import React, { useState } from 'react';
import HrSidebar from '../../../components/Sidebar/HrSidebar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddJobPost = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [location, setLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [applicationProcess, setApplicationProcess] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [eligibility, setEligibility] = useState('');
  const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!jobTitle) newErrors.jobTitle = 'Job Title is required.';
    if (!role) newErrors.role = 'Role is required.';
    if (!department) newErrors.department = 'Department is required.';
    if (!jobDescription) newErrors.jobDescription = 'Job Description is required.';
    if (!requirements) newErrors.requirements = 'Requirements are required.';
    if (!responsibilities) newErrors.responsibilities = 'Responsibilities are required.';
    if (!location) newErrors.location = 'Location is required.';
    if (!employmentType) newErrors.employmentType = 'Employment Type is required.';
    if (!salaryRange) newErrors.salaryRange = 'Salary Range is required.';
    if (!applicationProcess) newErrors.applicationProcess = 'Application Process is required.';
    if (!contactEmail || !/\S+@\S+\.\S+/.test(contactEmail)) newErrors.contactEmail = 'Valid Contact Email is required.';
    if (!contactPhone || !/^\d+$/.test(contactPhone)) newErrors.contactPhone = 'Valid Contact Phone is required.';
    if (!applicationDeadline) newErrors.applicationDeadline = 'Application Deadline is required.';
    if (!eligibility) newErrors.eligibility = 'Eligibility Criteria is required.';

    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const jobData = {
      jobTitle,
      role,
      department,
      jobDescription,
      requirements,
      responsibilities,
      location,
      employmentType,
      salaryRange,
      applicationProcess,
      contactEmail,
      contactPhone,
      applicationDeadline,
      eligibility,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/jobs/createpost`, jobData);
      console.log('Job posted successfully:', response.data);
      toast.success("User added successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose:()=>navigate('/hr/recruitment')
       
      });
      
      // Reset the form fields after successful submission
      setJobTitle('');
      setRole('');
      setDepartment('');
      setJobDescription('');
      setRequirements('');
      setResponsibilities('');
      setLocation('');
      setEmploymentType('');
      setSalaryRange('');
      setApplicationProcess('');
      setContactEmail('');
      setContactPhone('');
      setApplicationDeadline('');
      setEligibility('');
      setErrors({});
    } catch (error) {
      console.error('Error posting the job:', error);
      const errorMessage = error.response?.data?.message || "An error occurred while adding the user."
      toast.error(errorMessage, {
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
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <HrSidebar />
      </div>
      <div className="lg:hidden">
        <HrSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <header className="bg-background border-b px-4 md:px-6 flex items-center h-14 sm:h-16">
          <div className="flex-1 flex items-center gap-4">
            <a className="flex items-center gap-2 text-lg font-semibold" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <span className="sr-only">Acme Meetings</span>
            </a>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <a className="text-muted-foreground hover:text-foreground" href="/">
                Meetings Management
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2 ">
            <Link to={'/hr/recruitment'}>
              <button className="inline-flex justify-center rounded-md border border-gray-300 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Back
              </button>
            </Link>
          </div>
        </header>
        <br />
    <ToastContainer/>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-1xl">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Post a New Job Opportunity</h3>
            <p className="text-sm text-muted-foreground">Fill out the form below to create a new job posting.</p>
          </div>
          <div className="p-6">
            <form className="grid gap-4" >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="job-title">
                    Job Title
                  </label>
                  <input
                    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.jobTitle ? 'border-red-500' : ''}`}
                    id="job-title"
                    placeholder="e.g. Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                  {errors.jobTitle && <p className="text-red-500 text-xs">{errors.jobTitle}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="role">
                    Role
                  </label>
                  <input
                    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.role ? 'border-red-500' : ''}`}
                    id="role"
                    placeholder="e.g. Full-Stack Developer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="department">
                  Department
                </label>
                <input
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.department ? 'border-red-500' : ''}`}
                  id="department"
                  placeholder="e.g. Engineering, HR, Marketing"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
                {errors.department && <p className="text-red-500 text-xs">{errors.department}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="job-description">
                  Job Description
                </label>
                <textarea
                  className={`flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.jobDescription ? 'border-red-500' : ''}`}
                  id="job-description"
                  placeholder="Provide a detailed description of the job role"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                {errors.jobDescription && <p className="text-red-500 text-xs">{errors.jobDescription}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="requirements">
                  Requirements
                </label>
                <textarea
                  className={`flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.requirements ? 'border-red-500' : ''}`}
                  id="requirements"
                  placeholder="List the requirements for the job"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />
                {errors.requirements && <p className="text-red-500 text-xs">{errors.requirements}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="responsibilities">
                  Responsibilities
                </label>
                <textarea
                  className={`flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.responsibilities ? 'border-red-500' : ''}`}
                  id="responsibilities"
                  placeholder="Outline the responsibilities of the role"
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                />
                {errors.responsibilities && <p className="text-red-500 text-xs">{errors.responsibilities}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="location">
                    Location
                  </label>
                  <input
                    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.location ? 'border-red-500' : ''}`}
                    id="location"
                    placeholder="e.g. New York, Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="employment-type">
                        Employment Type
                    </label>
                    <select
                        className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.employmentType ? 'border-red-500' : ''}`}
                        id="employment-type"
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                    >
                        <option value="">Select Employment Type</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                    </select>
                    {errors.employmentType && <p className="text-red-500 text-xs">{errors.employmentType}</p>}
                    </div>

              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="salary-range">
                    Salary Range
                  </label>
                  <input
                    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.salaryRange ? 'border-red-500' : ''}`}
                    id="salary-range"
                    placeholder="e.g. $50,000 - $70,000"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                  />
                  {errors.salaryRange && <p className="text-red-500 text-xs">{errors.salaryRange}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="application-process">
                    Application Process
                  </label>
                  <input
                    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.applicationProcess ? 'border-red-500' : ''}`}
                    id="application-process"
                    placeholder="How to apply for the job"
                    value={applicationProcess}
                    onChange={(e) => setApplicationProcess(e.target.value)}
                  />
                  {errors.applicationProcess && <p className="text-red-500 text-xs">{errors.applicationProcess}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="contact-email">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.contactEmail ? 'border-red-500' : ''}`}
                    id="contact-email"
                    placeholder="e.g. hr@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                  {errors.contactEmail && <p className="text-red-500 text-xs">{errors.contactEmail}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="contact-phone">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.contactPhone ? 'border-red-500' : ''}`}
                    id="contact-phone"
                    placeholder="e.g. 123-456-7890"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                  {errors.contactPhone && <p className="text-red-500 text-xs">{errors.contactPhone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="application-deadline">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.applicationDeadline ? 'border-red-500' : ''}`}
                    id="application-deadline"
                    value={applicationDeadline}
                    onChange={(e) => setApplicationDeadline(e.target.value)}
                  />
                  {errors.applicationDeadline && <p className="text-red-500 text-xs">{errors.applicationDeadline}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="eligibility">
                    Eligibility Criteria
                  </label>
                  <input
                    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.eligibility ? 'border-red-500' : ''}`}
                    id="eligibility"
                    placeholder="e.g. Bachelor’s degree in related field"
                    value={eligibility}
                    onChange={(e) => setEligibility(e.target.value)}
                  />
                  {errors.eligibility && <p className="text-red-500 text-xs">{errors.eligibility}</p>}
                </div>
              </div>

              <div className="mt-6">
                <button
                onClick={handleSubmit}
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobPost;
