import React, { useEffect, useState } from 'react'
import HrSidebar from '../../components/Sidebar/HrSidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';

const Recruitment = () => {
  const [listData,setListData] = useState([])
  const [showData,setshowData] = useState([])
  const [loading ,setLoading] = useState(false)

  const fetchdata = async()=>{
    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/listitems`)
      setListData(response.data.listingData);
       
    } catch (error) {
      
    }finally{
      setLoading(false)
    }
  }

  const fetchlist = async()=>{
    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/listJob`)
      setshowData(response.data.listData);
      console.log(response.data.listData);
      
    } catch (error) {
      
    }finally{
      setLoading(false)
    }
  }
  

  useEffect(()=>{
    fetchdata()
    fetchlist()
  },[])

  const handleDelete = async(listId)=>{
    try {
      console.log(listId);
      
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/jobs/deleteitem/${listId}`)
      toast.success("Job lisiting deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // onClose:()=>navigate('/admin/Usermanagment')
       
      });

      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while deleting the job listing."
      toast.error(errorMessage, {
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

  const handleClick = async(appId)=>{
    try {

      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/jobs/deleteapplication/${appId}`)
      toast.success("application deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // onClose:()=>navigate('/admin/Usermanagment')
       
      });
      fetchlist()
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while deleting the application."
      toast.error(errorMessage, {
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
        <HrSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <HrSidebar />
      </div>

        <div className='bg-blue-50' style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                 
        <div className="flex flex-col w-full min-h-screen">
        <header
  class="bg-background bg-[#2F3849] text-white border-b px-4 md:px-6 flex items-center h-16 shrink-0 justify-between"
  id="c13eo4kwptn"
>
  <h1 class="text-xl ">Recruitment Management</h1>
  <Link to={'/hr/recruitment/addpost'} >
  <button class="rounded-full  text-white  hover:bg-white transition-colors duration-300 py-1 px-2 hover:text-slate-600">
    Add Job Post
  </button>
  </Link>
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
 
  <main className="flex-1 bg-white rounded-md  gap-2 p-4 md:p-6">
    
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4" >
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-4 lg:p-2 items-center justify-between">
          <h3 className="whitespace-nowrap text-xl md:text-2xl font-semibold leading-none tracking-tight">Pending Application </h3>
          <div className="text-2xl font-bold">{showData.length}</div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-4 lg:p-2 items-center justify-between">
          <h3 className="whitespace-nowrap text-xl md:text-2xl font-semibold leading-none tracking-tight">Job Listings</h3>
          <div className="text-2xl font-bold">{listData.length}</div>
        </div>
      </div>
     
    </div>

    <ToastContainer/>
    <br />
    <h3 className='whitespace-nowrap text-xl md:text-2xl font-semibold leading-none ml-5 tracking-tight' >Applications</h3>
    <br />
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden mt-2"> {/* Added margin-top */}
      <div className="relative w-full overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr className="border-b">
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Applicant</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Position</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Contact No.</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Refered By</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Job</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
          {showData && showData.length > 0 ? (
    showData.map((item, index) => (
      <tr key={index} className="border-b hover:bg-gray-50">
        <td className="p-4 align-middle">
          
          <div className="font-medium">{item.name}</div>
          <div className="text-sm text-gray-500">{item.email}</div>
        
        </td>
        <td className="p-4 align-middle">{new Date(item.updatedAt).toLocaleDateString()}</td>
        <td className="p-4 align-middle">{item.phone}</td>
        <td className="p-4 align-middle">
          {item.referer ? `${item.referer.firstName}${item.referer.lastName}` : 'Not Found'}
        </td>
        <td className="p-4 align-middle">
          {item.jobId ? `${item.jobId.jobTitle}` : 'Not Found'}
        </td>
        <td className="p-4 align-middle text-right">
        <Link to={`/hr/recruitment/view/${item._id}`} >
          <button className="mr-2 inline-flex items-center justify-center text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3">
              View
            </button>
          </Link>
          <button onClick={()=>handleClick(item._id)}  className="inline-flex items-center justify-center text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3 text-red-500">
            Delete
          </button>
          
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center p-4">
        No applications found
      </td>
    </tr>
  )}
           
           
            
          </tbody>
        </table>
       

      </div>
      
    </div>
    
  </main>
  


  <br />
  
  <main className="flex-1 bg-white gap-2 p-4 md:p-6">
  <h3 className='whitespace-nowrap text-xl md:text-2xl font-semibold leading-none ml-5 tracking-tight' >Job Listings</h3>
  <br />
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
  <div className="relative w-full overflow-auto">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-100">
        <tr className="border-b">
          <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Job Title</th>
          <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Department</th>
          <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Location</th>
          <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Date Posted</th>
          <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Application Deadline</th>
          <th className="h-12 px-4 text-right align-middle font-medium text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          listData.map((job,index)=>(
            <tr key={index} className="border-b hover:bg-gray-50">
          <td className="p-4 align-middle">{job.jobTitle}</td>
          <td className="p-4 align-middle">{job.department}</td>
          <td className="p-4 align-middle">{job.location}</td>
          <td className="p-4 align-middle">{new Date(job.createdAt).toLocaleDateString()}</td>
          <td className="p-4 align-middle">
            <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
              {new Date(job.applicationDeadline).toLocaleDateString()}
            </div>
          </td>
          <td className="p-4 align-middle text-right">
            <Link to={`/hr/recruitment/editlist/${job._id}`}>
            <button className="mr-2 inline-flex items-center justify-center text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3">
              Edit
            </button>
            </Link>

            <button onClick={()=>handleDelete(job._id)} className="inline-flex items-center justify-center text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3 text-red-500">
              Delete
            </button>
          </td>
        </tr>
          ))
        }
        
        
      </tbody>
    </table>
    {
      listData.length == 0 ? (<p className='text-center m-10' >No Job Listings</p>) : ''
    }
  </div>
</div>
</main>

  


  
</div>



        </div>
        
    
    </div>
   
  )
}

export default Recruitment
