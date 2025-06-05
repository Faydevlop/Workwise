import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import axiosInstance from '../../config/axiosConfig';


const Projectmanagment = () => {
  const [projects,setProjects] = useState([]);
  const [loading ,setLoading] = useState(false)
  useEffect(()=>{
    const fetchData = async()=>{
      setLoading(true)
     try {
      const response = await axiosInstance.get(`/admin/getprojects`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
        }
      })
      setProjects(response.data)
      console.log(response.data);
      
     } catch (error) {
      
     }finally{
      setLoading(false)
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

      

        
        
     

      <div className="w-full min-h-screen bg-background text-foreground">
      <header className="flex items-center bg-[#2F3849] rounded-lg justify-between px-6 py-4 border-b">
        <h1 className="text-2xl text-white ">All Projects</h1>
        <div className="flex items-center gap-4">
          <Link to={'/admin/projectmanagment/addproject'}>
            <button className="inline-flex items-center bg-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
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
                className="w-4 h-4 mr-2"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              New Project
            </button>
          </Link>
         
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

      <div className="container mx-auto py-8 px-6">
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border bg-card bg-white text-card-foreground shadow-lg rounded-xl p-6" data-v0-t="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Total Projects</h3>
                <div className="text-2xl font-bold">{projects.length}</div>
              </div>
              <p className="text-sm text-muted-foreground">Total number of projects in the system.</p>
            </div>
            <div className="border bg-card bg-white text-card-foreground shadow-lg rounded-xl p-6" data-v0-t="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Completed</h3>
                <div className="text-2xl font-bold">
                  {projects.filter(project => project.status === 'Completed').length}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">The number of completed projects.</p>
            </div>
            <div className="border bg-card bg-white text-card-foreground shadow-lg rounded-xl p-6" data-v0-t="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">In Progress</h3>
                <div className="text-2xl font-bold">
                  {projects.filter(project => project.status === 'in-progress').length}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Projects currently in progress.</p>
            </div>
          </div>
        </div>

        <br />
        <hr className='h-2' />
        <h2 className="text-xl font-bold">Current Projects</h2>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
          {projects.slice().reverse().map(project => (
            <Link to={`/admin/Projectmanagment/${project._id}`}>
            <div key={project._id} className="border bg-white bg-card text-card-foreground shadow-lg rounded-xl overflow-hidden" data-v0-t="card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">{project.name}</h2>
                  <div
                    className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    data-v0-t="badge"
                  >
                    {project.status}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="text-sm text-muted-foreground">
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
                      className="w-4 h-4 mr-1 inline-block"
                    >
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                      <path d="M8 14h.01"></path>
                      <path d="M12 14h.01"></path>
                      <path d="M16 14h.01"></path>
                      <path d="M8 18h.01"></path>
                      <path d="M12 18h.01"></path>
                      <path d="M16 18h.01"></path>
                    </svg>
                    {new Date(project.startDate).toLocaleDateString()}
                  </div>
               
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
       
     
      {/* list section end */}

      </div>
    </div>
  );
}

export default Projectmanagment;
