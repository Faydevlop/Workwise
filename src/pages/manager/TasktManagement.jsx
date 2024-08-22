import React, { useEffect, useState } from 'react'

import ManagerSidebar from '../../components/Sidebar/ManagerSidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

const TasktManagement = () => {
  const [projectData,setProjectData] = useState([])
  const { manager } = useSelector((state) => state.managerAuth);
  const userId = manager.manager._id

  useEffect(()=>{
    const fetchdata = async()=>{
      try {
        
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/projectlist/${userId}`);
          setProjectData(response.data.projectDetails);
          console.log(response.data.projectDetails);

        
      } catch (error) {
        
      }
    }
    

    fetchdata()

  },[])


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <ManagerSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <ManagerSidebar />
      </div>

        <div className='bg-blue-100' style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <header className="flex border shadow-lg rounded-lg  mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
  <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
    <a className="flex-none font-semibold text-xl  text-black focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
      Projects & Overview
    </a>
    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
      <Link to={'/manager/tasksmanagement/addtask'} >
      <button className="px-4 py-2 bg-blue-700 rounded-xl text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Add Task
      </button>
      </Link>
     
    </div>
  </nav>
</header>
                 
          {/* section 1 */}
         {
          projectData.map((project,index)=>(
            
            <div key={index} className="max-w-8xl bg-blue-50 mx-auto p-8 mt-5   shadow-md ">
            {/* Top Section */}
            <Link to={`/manager/tasksmanagement/addtask/${project._id}`} >
            <div className="w-full max-w-6xl bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h2 className="text">Assigned Project</h2>
                  <h2 className="text-xl font-bold">{project.name}</h2>
                  <p className="text-gray-500">Team:{project.department ? `${project.department.departmentName}` : 'N/A'}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-gray-500">Status: <span className="text-blue-500">{project.status}</span> </p>
                  <p className="text-gray-500">Total Tasks: 15 / 48</p>
                  <p className="text-gray-500">Due Date: {(new Date(project.endDate).toLocaleDateString())}</p>
                </div>
              </div>
            </div>
            </Link>
      
            {/* Main Content */}
            <div className="w-full max-w-6xl flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
              {/* Left Column */}
              <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow-md">
                <img src="your-image-source" alt="Project" className="rounded-lg mb-4"/>
                <h3 className="font-bold text-lg mb-2">Project Overview</h3>
                <div className="space-y-4">
                  {/* Task Item */}
                  <div>
                    <h4 className="text-gray-700">{project.name}</h4>
                    <p className="text-sm text-gray-500"> {project.department ? `${project.department.departmentName}` : 'N/A'}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-sm text-gray-500">40%</span>
                    </div>
                  </div>
                  {/* Add more tasks similarly */}
                  <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">Add Task</button>
                </div>
              </div>
      
              {/* Right Column */}
              <div className="w-full lg:w-2/3 flex flex-col space-y-4">
                {/* Task Cards */}
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
                  {/* Card 1 */}
                  <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
                    <img src="your-image-source" alt="Task" className="rounded-lg mb-4"/>
                    <h4 className="font-bold text-lg mb-2">Requirement Gathering and Analysis</h4>
                    <p className="text-gray-500">Priority: <span className="text-red-500">High</span></p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-sm text-gray-500">90%</span>
                    </div>
                    <p className="text-gray-500 mt-2">Due Date: 2024-09-30</p>
                  </div>
                  {/* Repeat similar cards with different content */}
                </div>
              </div>
            </div>
            </div>
          ))
         }



        </div>
        
    
    </div>
   
  )
}

export default TasktManagement
