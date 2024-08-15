import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    // const [salary, setSalary] = useState('');
    const [employeeStatus, setEmployeeStatus] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getuser/${userId}`,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`,
                      }
                });
                const user = response.data;
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
                setDob(user.dob);
                setPhone(user.phone);
                setGender(user.gender);
                setAddress(user.address);
                setDepartment(user.department);
                setPosition(user.position);
                setDateOfJoining(user.dateOfJoining);
                // setSalary(user.salary);
                setEmployeeStatus(user.employeeStatus);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedUser = {
                firstName,
                lastName,
                email,
                dob,
                phone,
                gender,
                address,
                department,
                position,
                dateOfJoining,
                // salary,
                employeeStatus,
            };
            await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/updateuser/${userId}`, updatedUser,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                  }
            });
            toast.success('User updated successfully',{
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose:()=>navigate('/admin/Usermanagment')
            });
            
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Error updating user');
        } finally {
            setLoading(false);
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

            <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-md">
                    <ToastContainer />
                    <h2 className="text-2xl font-bold mb-6">Edit User</h2>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        {/* Personal Details Section */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john.doe@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <textarea
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        rows="3"
                                        placeholder="123 Main St, City, Country"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Professional Details Section */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Professional Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Department</label>
                                    <input
                                        type="text"
                                        className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        placeholder="Sales"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Position</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                    >
                                        <option value="">Select Position</option>
                                        <option value="HR">HR</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Employee">Employee</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of Joining</label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={dateOfJoining}
                                        onChange={(e) => setDateOfJoining(e.target.value)}
                                    />
                                </div>
                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700">Salary</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        placeholder="$5000"
                                    />
                                </div> */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Employee Status</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={employeeStatus}
                                        onChange={(e) => setEmployeeStatus(e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="inactive">inactive</option>
                                       
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {loading && (
                <Backdrop open={loading} style={{ zIndex: 9999, color: '#fff' }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
        </div>
    );
};

export default EditUser;
