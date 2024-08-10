import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/Sidebar/AdminSidebar';
import axios from 'axios';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddProjectPage = () => {
    const [managers, setManagers] = useState([]);
    const [unassignedEmployees, setUnassignedEmployees] = useState([]);
    const [managerError, setManagerError] = useState('');
    const [employeeError, setEmployeeError] = useState('');

    const [name, setName] = useState('');
    const [status, setStatus] = useState('pending');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priority, setPriority] = useState('low');
    const [description, setDescription] = useState('');
    const [teamLead, setTeamLead] = useState('');   
    const [teamMates, setTeamMates] = useState([]);

    const [nameError, setNameError] = useState('');
const [dateError, setDateError] = useState('');
const [descriptionError, setDescriptionError] = useState('');
const [teamLeadError, setTeamLeadError] = useState('');
const [teamMatesError, setTeamMatesError] = useState('');

const validateForm = () => {
    let isValid = true;

    if (name.trim() === '') {
        setNameError('Project name is required');
        isValid = false;
    } else {
        setNameError('');
    }

    if (startDate === '' || endDate === '') {
        setDateError('Start date and End date are required');
        isValid = false;
    } else if (new Date(startDate) > new Date(endDate)) {
        setDateError('Start date cannot be later than End date');
        isValid = false;
    } else {
        setDateError('');
    }

    if (description.trim() === '') {
        setDescriptionError('Description is required');
        isValid = false;
    } else {
        setDescriptionError('');
    }

    if (teamLead === '') {
        setTeamLeadError('Team Lead is required');
        isValid = false;
    } else {
        setTeamLeadError('');
    }

    if (teamMates.length === 0) {
        setTeamMatesError('Select at least one team member');
        isValid = false;
    } else {
        setTeamMatesError('');
    }

    return isValid;
}



    

    useEffect(() => {
        const fetchManager = async () => {
            
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getmanagers`);
                const data = response.data;
                if (data.length === 0) {
                    setManagerError('No managers are available.');
                } else {
                    setManagers(data);
                    setManagerError(''); // Clear error if data is found
                }
            } catch (error) {
                console.error('Error fetching managers:', error);
                setManagerError('Error fetching managers.');
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getUnassignedemployees`);
                const data = response.data;
                if (data.length === 0) {
                    setEmployeeError('No unassigned employees are available.');
                } else {
                    setUnassignedEmployees(data);
                    setEmployeeError(''); // Clear error if data is found
                }
            } catch (error) {
                console.error('Error fetching unassigned employees:', error);
                setEmployeeError('Error fetching unassigned employees.');
            }
        };

        fetchManager();
        fetchEmployees();
    }, []);

    const userData = {
        name,
        status,
        startDate,
        endDate,
        priority,
        description,
        teamLead,
        teamMates,
    }
    console.log(userData);

    const navigate = useNavigate()
    

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/addNewProject`,userData)
            toast.success("Project added successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose:()=>navigate('/admin/projectmanagment')
               
              });
            
        } catch (error) {
            toast.error('Error adding project', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            
        }
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
        <div className="hidden lg:block" style={{ width: '250px' }}>
            <AdminSidebar />
        </div>
        <div className="lg:hidden">
            <AdminSidebar />
        </div>
        <ToastContainer/>

        <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
            <form className="max-screen-lg lg:ml-10 mx-auto p-5 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Project Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 font-medium">Project Name</label>
                        <input 
                            type="text" 
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {nameError && <p className="text-red-500">{nameError}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Status</label>
                        <select 
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Start Date</label>
                        <input 
                            type="date" 
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">End Date</label>
                        <input 
                            type="date" 
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                         {dateError && <p className="text-red-500">{dateError}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Priority</label>
                        <select 
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-gray-700 font-medium">Description</label>
                        <textarea 
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        {descriptionError && <p className="text-red-500">{descriptionError}</p>}
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-gray-800">Team Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 font-medium">Select Team Lead</label>
                        <select 
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={teamLead}
                            onChange={(e) => setTeamLead(e.target.value)}
                        >
                            {managers.length > 0 ? (
                                managers.map(manager => (
                                    <option key={manager._id} value={manager._id}>
                                        {manager.firstName} {manager.lastName}
                                    </option>
                                ))
                            ) : (
                                <option disabled>{managerError || 'Loading...'}</option>
                            )}
                        </select>
                        {managerError && <p className="text-red-500">{managerError}</p>}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-gray-700 font-medium">Select Team Mates</label>
                        <select 
                            multiple 
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={teamMates}
                            onChange={(e) => setTeamMates(Array.from(e.target.selectedOptions, option => option.value))}
                        >
                            {unassignedEmployees.length > 0 ? (
                                unassignedEmployees.map(employee => (
                                    <option key={employee._id} value={employee._id}>
                                        {employee.firstName} {employee.lastName}
                                    </option>
                                ))
                            ) : (
                                <option disabled>{employeeError || 'Loading...'}</option>
                            )}
                        </select>
                        {employeeError && <p className="text-red-500">{employeeError}</p>}
                    </div>
                </div>

                <div className="mt-8">
                    <button 
                    onClick={handleSubmit}
                        type="submit" 
                        className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 font-semibold"
                    >
                        Submit Project
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
};

export default AddProjectPage;