import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/Sidebar/AdminSidebar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../config/axiosConfig';


const EditProjectpage = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('pending');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priority, setPriority] = useState('low');
    const [description, setDescription] = useState('');
    const [sdepartment, setSDepartment] = useState('');   
    const [teamMates, setTeamMates] = useState([]);
    const [department,setDepartment] = useState([])
    
    // New states
    const [managers, setManagers] = useState([]);
    const [unassignedEmployees, setUnassignedEmployees] = useState([]);
    const [managerError, setManagerError] = useState('');
    const [employeeError, setEmployeeError] = useState('');

    const { projectId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await axiosInstance.get(`/admin/project/${projectId}`,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`,
                      }
                });
                const project = response.data;

                setName(project.name);
                setStatus(project.status);
                setStartDate(project.startDate);
                setEndDate(project.endDate);
                setPriority(project.priority);
                setDescription(project.description);
                setSDepartment(project.department);
                setTeamMates(project.teamMates);

            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };
        const fetchDepartments = async () => {
            try {
                const response = await axiosInstance.get(`/department/list`);
                setDepartment(response.data);
                console.log('department details', response.data);
            } catch (error) {
                setManagerError('Error loading departments');
            }
        };
        fetchDepartments();

        
        fetchProjectData();
        
    }, [projectId]);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectData = {
            name,
            status,
            startDate,
            endDate,
            priority,
            description,
            sdepartment,
            teamMates,
        };
        
        try {
            await axiosInstance.post(`/admin/editproject/${projectId}`, projectData,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                  }
            });
            
            toast.success("Project Updated successfully!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose:()=>navigate('/admin/Projectmanagment')
                
               
              });
        } catch (error) {
            console.error('Error updating project:', error);
            toast.error('Error Updateing project', {
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
                <AdminSidebar />
            </div>
            <div className="lg:hidden">
                <AdminSidebar />
            </div>
            <ToastContainer/>

            <div style={{ flex: 1, padding: '20px', overflow: 'hidden', marginLeft: '0' }}>
                <header className="flex border border-gray-200 lg:ml-4 flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
                    <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                        <a className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
                            Projects and Overview
                        </a>
                        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
                            <Link to={`/admin/projectmanagment/${projectId}`}>
                                <button className="px-4 py-2 bg-blue-700 rounded-xl text-white font-medium hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                    back
                                </button>
                            </Link>
                        </div>
                    </nav>
                </header>
                <div style={{ display: 'flex', height: '100vh' }}>
                    <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                        <form className="max-screen-lg lg:ml-10 mx-auto p-5 bg-white border border-gray-200 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Project Info</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-gray-700 font-medium">Project Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
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
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Team Info</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-gray-700 font-medium">Select Team Lead</label>
                                    <select 
                                        className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={sdepartment}
                                        onChange={(e) => setSDepartment(e.target.value)}
                                    >
                                       {department.length > 0 ? (
                                department.map(manager => (
                                    <option key={manager._id} value={manager._id}>
                                        {manager.departmentName} 
                                    </option>
                                ))
                            ) : (
                                <option disabled>{managerError || 'Loading...'}</option>
                            )}
                                    </select>
                                    {managerError && <p className="text-red-500 mt-2">{managerError}</p>}
                                </div>
                               
                            </div>

                            <div className="flex flex-col lg:flex-row">
    <button type="submit" className="px-6 py-3 mb-3 lg:mb-0 lg:mr-3 bg-blue-700 rounded-xl text-white font-medium hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Update Project
    </button>
    
    <Link to="/admin/projects">
        <button type="button" className="px-6 py-3 bg-gray-700 rounded-xl text-white font-medium hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
            Cancel
        </button>
    </Link>
</div>

                            
                        </form>
                        <br />
                            <br />
                            <br />
                            <br />
                        
                           
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default EditProjectpage;
