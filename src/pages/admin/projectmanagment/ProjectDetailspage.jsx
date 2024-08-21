import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/Sidebar/AdminSidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast ,ToastContainer} from 'react-toastify';

const ProjectDetailspage = () => {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/project/${projectId}`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`,
          }
        });
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchData();
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const Deleteproject =async()=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/deleteproject/${projectId}`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`,
          }
        });

        toast.success("Project Deleted successfully!", {
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
        toast.error('Error Deleting project', {
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
      <ToastContainer/>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <AdminSidebar />
      </div>

      <div className='bg-blue-50 ' style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
      <header className="flex border border-gray-200 lg:ml-4 flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
  <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
    <a className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
      Projects and Overview
    </a>
    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
      <Link to={`/admin/projectmanagment/editproject/${projectId}`}>
        <button className="px-4 py-2 bg-blue-700 rounded-xl text-white font-medium hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Edit Details
        </button>
      </Link>
      <button 
        onClick={() => Deleteproject()} 
        className="px-4 py-2 bg-red-700 rounded-xl text-white font-medium hover:bg-red-600 focus:outline-none focus:bg-red-600">
        Delete Project
      </button>
    </div>
  </nav>
</header>


        <div className="p-10 bg-white mt-5 shadow-lg rounded-lg w-full lg:ml-8 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className="flex flex-col md:flex-row">
              <img
                src="https://via.placeholder.com/100" // Replace with your project image source
                alt="Project"
                className="w-24 h-24 rounded-lg mr-4 mb-4 md:mb-0"
              />
              <div>
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p className="text-lg font-medium text-gray-700">Status: {project.status}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Start Date: {new Date(project.startDate).toLocaleDateString()}<br />
                  End Date: {new Date(project.endDate).toLocaleDateString()}<br />
                  Priority: {project.priority}
                </p>
              </div>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
              <h3 className="text-lg font-semibold">Department : {project.department ? `${project.department.departmentName}` : 'Not available'}</h3>
              {/* <p>{project.teamLead ? `${project.teamLead.firstName} ${project.teamLead.lastName}` : "N/A"}</p> */}
              
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-600 mb-4">
              {project.description}
            </p>
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div style={{ width: "60%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
              </div>
              <div className="flex justify-between text-sm font-medium text-blue-600">
                <span>Not Started</span>
                <span>In Progress</span>
                <span>Completed</span>
                <span>Reviewed</span>
              </div>
            </div>
          </div>
          <div className="grid mt-10 grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="Project icon" className="w-10 h-10 mr-3 rounded" />
              <div>
                <h3 className="font-semibold">Requirement Gathering and Analysis</h3>
                <p className="text-sm text-gray-600">Analyze current CRM system capabilities...</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">High</span>
              <div className="flex items-center">
                <span className="text-sm mr-2">Progress</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: "90%"}}></div>
                </div>
                <span className="text-sm ml-2">90%</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              2024-09-30
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="Project icon" className="w-10 h-10 mr-3 rounded" />
              <div>
                <h3 className="font-semibold">Requirement Gathering and Analysis</h3>
                <p className="text-sm text-gray-600">Analyze current CRM system capabilities...</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Low</span>
              <div className="flex items-center">
                <span className="text-sm mr-2">Progress</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: "30%"}}></div>
                </div>
                <span className="text-sm ml-2">30%</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              2024-09-30
            </div>
          </div>
        </div>
        </div>
        
     
      
    
      </div>
      
      
    </div>
    
  );
}

export default ProjectDetailspage;
