import React, { useEffect, useState } from 'react'

import ManagerSidebar from '../../components/Sidebar/ManagerSidebar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import NotificationBox from '../../components/notification/notificationBox'
import axiosInstance from '../../config/axiosConfig'
import useTaskManager from '../../hooks/manager/useTaskManager';



const TasktManagement = () => {
  const { manager } = useSelector((state) => state.managerAuth);
  const userId = manager?.manager?._id;

  const {
    projectData,
    tasks,
    loading,
    fetchProjectAndTasks,
    deleteTask
  } = useTaskManager(userId); // 👈 use hook

  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  const toggleProjectDropdown = () => setIsProjectDropdownOpen((prev) => !prev);
  const toggleStatusDropdown = () => setIsStatusDropdownOpen((prev) => !prev);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setIsProjectDropdownOpen(false);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setIsStatusDropdownOpen(false);
  };

  useEffect(() => {
    fetchProjectAndTasks();
  }, [fetchProjectAndTasks]);

  const handleDelete = (id) => {
    deleteTask(id);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <ManagerSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <ManagerSidebar />
      </div>

      <ToastContainer/>
        <div className='bg-blue-10' style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
     
      

              
                 
             
      
              
         <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="sticky  top-0 bg-[#2F3849] z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <h1 className="text-xl text-white">Manager's Overview</h1>
        <div className="flex items-center gap-4">
          
        </div>
      </header>
      
      <Backdrop
  sx={{
    color: '#fff',
    
    zIndex: (theme) => theme.zIndex.drawer + 1,
  }}
  open={loading}
>
  <ScaleLoader
    color="#ffffff" // Adjust the spinner color
    height={35}     // Adjust the height
    width={4}       // Adjust the width
    radius={2}      // Adjust the radius
    margin={2}      // Adjust the margin between spinners
  />
</Backdrop>
      <main className="flex-1 p-4 md:p-6">
        <section>
        
          <h2 className="mb-4 text-lg font-semibold">Projects</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projectData.slice().reverse().map((project, index) => (
  <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full" data-v0-t="card">
    <div className="flex flex-col flex-grow p-6">
      <Link to={'/manager/tasksmanagement/projectdetailpage'}>
      <h3 className="text-xl p-1 font-semibold leading-none tracking-tight">{`Project ${project.name}`}</h3>
      </Link>
      <p className="text-sm text-muted-foreground">Due: {(new Date(project.endDate).toLocaleDateString())}</p>
    </div>
    <div className="p-6 flex justify-between items-center mt-auto">
      <div
        className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
        data-v0-t="badge"
      >
        {project.status}
      </div>
      <Link to={`/manager/tasksmanagement/addtask/${project._id}`} >
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
            className="h-4 w-4 mr-2"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>

          Add Task
        </button>
      </Link>
    </div>
  </div>
))}
{
  projectData.length == 0 ? (<p>No Project Assigned</p> ) : ''
}
          </div>
        </section>
        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6"></div>
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Tasks</h2>
            <div className="flex items-center gap-2">
      {/* Project Button */}
<div className="relative hidden md:block"> {/* Hide on small screens */}
  
  {isProjectDropdownOpen && (
    <div className="absolute z-10 mt-1 w-full rounded-md border bg-white border-input bg-background shadow-lg">
      <ul className="py-1 text-sm text-muted-foreground">
        {projectItems.map((item, idx) => (
          <li
            key={idx}
            className="cursor-pointer px-4 py-2 hover:bg-accent hover:text-accent-foreground"
            onClick={() => handleProjectSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

{/* Status Button */}
<div className="relative hidden md:block"> {/* Hide on small screens */}
 
  {isStatusDropdownOpen && (
    <div className="absolute z-10 mt-1 w-full rounded-md bg-white border border-input bg-background shadow-lg">
      <ul className="py-1 text-sm text-muted-foreground">
        {statusItems.map((item, idx) => (
          <li
            key={idx}
            className="cursor-pointer px-4 py-2 hover:bg-accent hover:text-accent-foreground"
            onClick={() => handleStatusSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )}
</div>
    </div>
          </div>
          <div className="relative w-full overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Task
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                    Project
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 hidden md:table-cell">
                    Due Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 hidden lg:table-cell">
                    Priority
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {tasks.slice().reverse().map((row, index) => (
                  <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <div className="font-medium">{row.name}</div>
                      <div className="text-sm text-muted-foreground hidden sm:block">Description of the task</div>
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 hidden sm:table-cell">Project {row.projectId ? `${row.projectId.name}` : 'Not available'}</td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 hidden md:table-cell">{(new Date(row.dueDate).toLocaleDateString())}</td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 hidden lg:table-cell">
                      <div className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${row.priority === 'High' ? 'bg-primary text-primary-foreground hover:bg-primary/80' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`} data-v0-t="badge">
                        {row.priority}
                      </div>
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <div className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${row.status === 'Completed' ? '' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`} data-v0-t="badge">
                        {row.status}
                      </div>
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <div className="relative">
                        <button 
                          onClick={() => toggleDropdown(index)}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                          </svg>
                        </button>
                        {openDropdown === index && (
  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <Link to={`/manager/tasksmanagement/detailpage/${row._id}`}>
      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View</a>
      </Link>

      <button onClick={()=>handleDelete(row._id)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Delete</button>
    </div>
  </div>
)}

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {
  tasks.length == 0 ? (<p className='text-center'>No Tasks are Created</p> ) : ''
}
      </main>
    </div>



        </div>
        <NotificationBox userId={userId} />
        
    
    </div>
   
  )
}

export default TasktManagement
