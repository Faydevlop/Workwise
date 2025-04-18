
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';



const AddUserForm = () => {

  const [loading ,setLoading] = useState(false)

  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  // const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [salary, setSalary] = useState('');
  const [employeeStatus, setEmployeeStatus] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {};
  
    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!dob) newErrors.dob = 'Date of Birth is required';
    if (!phone) newErrors.phone = 'Phone number is required';
    if (!gender) newErrors.gender = 'Gender is required';
    if (!address) newErrors.address = 'Address is required';
    // if (!department) newErrors.department = 'Department is required';
    if (!position) newErrors.position = 'Position is required';
    if (!dateOfJoining) newErrors.dateOfJoining = 'Date of Joining is required';
    if (!employeeStatus) newErrors.employeeStatus = 'Employee Status is required';
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true)
    
    const UserData = {
      firstName:firstName,
      lastName:lastName,
      email:email,
      dob:dob,
      phone:phone,
      gender:gender,
      address:address,
      // department:department,
      position:position,
      dateOfJoining:dateOfJoining,
      salary:salary,
      employeeStatus:employeeStatus
    }

    try {
      const response = await axiosInstance.post(`/admin/adduser`,UserData,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
        }
      })
      toast.success("User added successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose:()=>navigate('/admin/Usermanagment')
       
      });
      
    } catch (error) {
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
      
      
    }finally{
      setLoading(false)
    }
    
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-md">
       <ToastContainer/>
      <h2 className="text-2xl font-bold mb-6">Add User</h2>
      
      <hr />
     

      <form onSubmit={handleSubmit}>
        {/* Personal Details Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John"  />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe"  />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john.doe@example.com"  />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input type="date" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" value={dob} onChange={(e) => setDob(e.target.value)}  />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567"  />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" value={gender} onChange={(e) => setGender(e.target.value)} >
                
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" value={address} onChange={(e) => setAddress(e.target.value)} rows="3" placeholder="123 Main St, City, Country" ></textarea>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          </div>
        </div>

        {/* Professional Details Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Professional Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input type="text" className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Sales"  />
                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
            </div> */}
            <div>
            <label className="block text-sm font-medium text-gray-700">Employee Status</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" value={position} onChange={(e) => setPosition(e.target.value)}>
                {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
            <option value="">Select Position</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>

            </div>
           

            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Joining</label>
              <input type="date" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" value={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)}  />
                {errors.dateOfJoining && <p className="text-red-500 text-xs mt-1">{errors.dateOfJoining}</p>}
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">Salary</label>
              <input type="number" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="50000"  />
                {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee Status</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" value={employeeStatus} onChange={(e) => setEmployeeStatus(e.target.value)} >
              
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                
              </select>
              {errors.employeeStatus && <p className="text-red-500 text-xs mt-1">{errors.employeeStatus}</p>}
            </div>
          </div>
        </div>

       
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            
          >
            <CircularProgress color="inherit" />
          </Backdrop>

        {/* Submit Button */}
        <div className="mt-6">
          <button type="submit" className="w-28 bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700">
          {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUserForm;
