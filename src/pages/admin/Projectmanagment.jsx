import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import axios from 'axios';


const Projectmanagment = () => {
  const [projects,setProjects] = useState([]);
  useEffect(()=>{
    const fetchData = async()=>{
     try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getprojects`)
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

      <div style={{ flex: 1, padding: '20px', overflow: 'hidden', marginLeft: '0' }}>

      <header className="flex border border-gray-200 lg:ml-4 flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
  <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
    <a className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
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

        
        {/* Grid container for the cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          
          {
            projects.map(project =>(
              <Card className="mt-6 lg:ml-6 w-full">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {project.name}
                </Typography>
                <Typography>
                 {project.description}
                </Typography>
                
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={`/admin/Projectmanagment/${project._id}`}>
                <Button className="bg-blue-600 text-white hover:bg-blue-500">View Details</Button>
                </Link>
                
              </CardFooter>
              
            </Card>

            ))

          }
         
          
         
          
          {/* Add more cards as needed */}
        </div>
      </div>
    </div>
  );
}

export default Projectmanagment;
