import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/Sidebar/AdminSidebar';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddDeparment = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [headOfDepartment, setHeadOfDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [managers, setManagers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [errors, setErrors] = useState({}); // For validation errors
  const navigate = useNavigate()

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/department/listmanager`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setManagers(response.data);
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/department/getUsers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchManager();
    fetchEmployees();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!departmentName) {
      newErrors.departmentName = 'Department name is required';
    }

    if (!headOfDepartment) {
      newErrors.headOfDepartment = 'Head of department is required';
    }

    if (!description) {
      newErrors.description = 'Description is required';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      newErrors.email = 'Valid email is required';
    }

    const phonePattern = /^[0-9]{10}$/; // Example for a 10-digit phone number
    if (!phone || !phonePattern.test(phone)) {
      newErrors.phone = 'Valid phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const departmentData = {
      departmentName,
      headOfDepartment,
      description,
      email,
      phone,
      teamMembers,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/department/add`, departmentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Department added');
      toast.success("Department added successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose:()=>navigate('/admin/Departmentmanagment')
       
      });
      // Handle successful form submission (e.g., redirect, clear form, etc.)
    } catch (error) {
      console.error('Error adding department:', error);
      toast.error('Error adding department', {
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

  const handleTeamMemberToggle = (member) => {
    setTeamMembers((prev) =>
      prev.includes(member) ? prev.filter((m) => m !== member) : [...prev, member]
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        <AdminSidebar />
      </div>
      <ToastContainer/>
      <div className="bg-blue-50" style={{ flex: 3, padding: '20px', overflow: 'auto' }}>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md mx-auto">
          <h2 className="text-xl font-bold mb-6">Add Department</h2>

          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-grow">
                <label className="block text-sm font-medium mb-1">Department Name</label>
                <input
                  type="text"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.departmentName && (
                  <p className="text-red-500 text-xs mt-1">{errors.departmentName}</p>
                )}
              </div>
              <div className="flex-grow">
                <label className="block text-sm font-medium mb-1">Head of Department</label>
                <select
                  value={headOfDepartment}
                  onChange={(e) => setHeadOfDepartment(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="" disabled>
                    Select Head
                  </option>
                  <option value="null" >
                   Null
                  </option>
                  {managers.map((head) => (
                    <option key={head._id} value={head._id}>
                      {head.firstName} {head.lastName}
                    </option>
                  ))}
                </select>
                {errors.headOfDepartment && (
                  <p className="text-red-500 text-xs mt-1">{errors.headOfDepartment}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <div className="flex gap-4">
              <div className="flex-grow">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="flex-grow">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-4">Team Members</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              {employees.map((member) => (
                <div
                  key={member._id}
                  className={`flex items-center justify-between p-2 mb-2 rounded cursor-pointer 
                ${teamMembers.includes(member) ? 'bg-blue-100' : 'bg-white'}`}
                  onClick={() => handleTeamMemberToggle(member)}
                >
                  <div className="flex items-center">
                    <img
                      src={`https://i.pravatar.cc/150?u=${member._id}`}
                      alt={member.firstName}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium">
                        {member.firstName} {member.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{member.position}</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={teamMembers.includes(member)}
                    onChange={() => handleTeamMemberToggle(member)}
                    className="form-checkbox"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save Changes
            </button>
            <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeparment;
