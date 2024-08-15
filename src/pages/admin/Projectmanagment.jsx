import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Projectmanagment = () => {
  const [projects,setProjects] = useState([]);
  useEffect(()=>{
    const fetchData = async()=>{
     try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getprojects`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
        }
      })
      setProjects(response.data)
     } catch (error) {
      
     }
    }

    fetchData()
  },[])

  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <AdminSidebar />
      </div>

      <div className='bg-blue-50' style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>

      <header className="flex border  mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
  <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
    <a className="flex-none font-semibold text-xl  text-black focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
      Projects and Overview
    </a>
    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
      <Link to={'/admin/projectmanagment/addproject'} >
      <button className="px-4 py-2 bg-blue-700 rounded-xl text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Add Project
      </button>
      </Link>
     
    </div>
  </nav>
</header>

        
        
      {/* list section start */}
      {
        projects.map(project =>(
          
          <div className="bg-white  rounded-lg shadow-md p-6 mb-6">
  <Link to={`/admin/Projectmanagment/${project._id}`}>
    <h2 className="text-xl font-bold mb-4">{project.name}</h2>
  </Link>
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center">
      <span className="text-blue-600 font-semibold mr-2">{project.priority}</span>
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{project.status}</span>
    </div>
    <div className="text-sm text-gray-500">
      <span className="mr-4">Start Date: {new Date(project.startDate).toLocaleDateString()}</span>
      <span>Due Date: {new Date(project.endDate).toLocaleDateString()}</span>
    </div>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "10%"}}></div>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="mb-2">
        <h3 className="font-semibold">Description</h3>
        <p className="text-sm text-gray-600">{project.description}</p>
      </div>
          
      <div className="mt-2 text-sm text-gray-500">
        <div className="flex items-center mb-1">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          Team Lead:{project.teamLead ? `${project.teamLead.firstName} ${project.teamLead.lastName}` : "N/A"}
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          Team Members: {project.teamMates && project.teamMates.length > 0
                    ? project.teamMates.map(mate => `${mate.firstName} ${mate.lastName}`).join(', ')
                    : "No team mates assigned"}
        </div>
      </div>
    </div>
  </div>
</div>


        ))
      }
       
     
      {/* list section end */}

      </div>
    </div>
  );
}

export default Projectmanagment;
