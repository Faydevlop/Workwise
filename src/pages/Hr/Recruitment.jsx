import React, { useEffect, useState } from 'react'
import HrSidebar from '../../components/Sidebar/HrSidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recruitment = () => {
  const [listData,setListData] = useState([])

  const fetchdata = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/listitems`)
      setListData(response.data.listingData);
      console.log(response.data.listingData);
      
      
    } catch (error) {
      
    }
  }
  

  useEffect(()=>{
    fetchdata()
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

      fetchdata()
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while adding the user."
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

        <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                 
        <div className="flex flex-col w-full min-h-screen">
        <header
  class="bg-background border-b px-4 md:px-6 flex items-center h-16 shrink-0 justify-between"
  id="c13eo4kwptn"
>
  <h1 class="text-xl font-bold">Recruiter Management</h1>
  <Link to={'/hr/recruitment/addpost'} >
  <button class="inline-flex bg-black text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
    Add Job Post
  </button>
  </Link>
</header>
 
 
  <main className="flex-1  gap-2 p-4 md:p-6">
    
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" >
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-4 lg:p-2 items-center justify-between">
          <h3 className="whitespace-nowrap text-xl md:text-2xl font-semibold leading-none tracking-tight">Pending</h3>
          <div className="text-2xl font-bold">24</div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-4 lg:p-2 items-center justify-between">
          <h3 className="whitespace-nowrap text-xl md:text-2xl font-semibold leading-none tracking-tight">Approved</h3>
          <div className="text-2xl font-bold">12</div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-4 lg:p-2 items-center justify-between">
          <h3 className="whitespace-nowrap text-xl md:text-2xl font-semibold leading-none tracking-tight">Rejected</h3>
          <div className="text-2xl font-bold">8</div>
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
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600">Status</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 align-middle">
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-gray-500">Software Engineer</div>
              </td>
              <td className="p-4 align-middle">Software Engineer</td>
              <td className="p-4 align-middle">2023-04-15</td>
              <td className="p-4 align-middle">
                <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                  Pending
                </div>
              </td>
              <td className="p-4 align-middle text-right">
                <button className="mr-2 inline-flex items-center justify-center text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3">
                  Approve
                </button>
                <button className="inline-flex items-center justify-center text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3 text-red-500">
                  Reject
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 align-middle">
                <div className="font-medium">Jane Smith</div>
                <div className="text-sm text-gray-500">Product Manager</div>
              </td>
              <td className="p-4 align-middle">Product Manager</td>
              <td className="p-4 align-middle">2023-04-12</td>
              <td className="p-4 align-middle">
                <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                  Pending
                </div>
              </td>
              <td className="p-4 align-middle text-right">
                <button className="mr-2 inline-flex items-center justify-center text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3">
                  Approve
                </button>
                <button className="inline-flex items-center justify-center text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3 text-red-500">
                  Reject
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 align-middle">
                <div className="font-medium">Michael Johnson</div>
                <div className="text-sm text-gray-500">UI/UX Designer</div>
              </td>
              <td className="p-4 align-middle">UI/UX Designer</td>
              <td className="p-4 align-middle">2023-04-10</td>
              <td className="p-4 align-middle">
                <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                  Pending
                </div>
              </td>
              <td className="p-4 align-middle text-right">
                <button className="mr-2 inline-flex items-center justify-center text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3">
                  Approve
                </button>
                <button className="inline-flex items-center justify-center text-sm font-medium border bg-gray-100 hover:bg-gray-200 h-9 rounded-md px-3 text-red-500">
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
       

      </div>
      
    </div>
    
  </main>
  


  <br />
  
  <main className="flex-1  gap-2 p-4 md:p-6">
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
            <Link to={`/hr/recruitment/editlist/:${job._id}`}>
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
