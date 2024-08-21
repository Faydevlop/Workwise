import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../components/Sidebar/AdminSidebar'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Departdetails = () => {
  const [department,setDepartment] = useState({
    TeamMembers: [],
  });
  const {departmentId} = useParams()
  

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/department/details/${departmentId}`);
        setDepartment(response.data.department);
        console.log(response.department.department);
        



      } catch (error) {
        
      }
    }
    fetchData()
  },[])

  const deleteUser = async(teamMemberIds)=>{
    alert(teamMemberIds)
    try {

        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/department/delete/${departmentId}`,{data: { teamMemberIds }})
          toast.success("User Deleted successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          
           
          });

        
    } catch (error) {
        toast.error('Error Deleteing User form department', {
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
        <AdminSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <AdminSidebar />\
      </div>

        <div className='bg-blue-50' style={{ flex: 3, padding: '20px', overflow: 'auto', marginLeft: '' }}>
                 
          {/* section 1 */}
          
          <header className="flex border shadow-lg rounded  mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
          <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <a className="flex-none font-semibold text-xl  text-black focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
              Department Management
            </a>
            <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
            </div>
          </nav>
        </header>
        <ToastContainer/>


  <div className="flex flex-col lg:flex-row gap-6 md:gap-10">

    {/* Department Overview */}
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full lg:w-2/3">
      <h2 className="text-lg md:text-xl font-semibold text-indigo-900 mb-4">Detail page</h2>
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-md md:text-lg font-medium text-indigo-900 mb-2">Department Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div>
            <p className="text-sm font-semibold text-gray-600">Department ID</p>
            <p className="text-gray-800">1001</p>
          </div> */}
          <div>
            <p className="text-sm font-semibold text-gray-600">Department Name</p>
            <p className="text-gray-800">{department.departmentName ? department.departmentName : 'N/A'}</p>
          </div>
          <div className="col-span-1 md:col-span-2">
            <p className="text-sm font-semibold text-gray-600">Description</p>
            <p className="text-gray-800">
              {department.description}
            </p>
          </div>
         
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-md md:text-lg font-medium text-indigo-900 mt-4">Head of Department</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Name</p>
                <p className="text-gray-800">{department.headOfDepartMent ? `${department.headOfDepartMent.firstName}${department.headOfDepartMent.lastName}` : 'Null' }</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Contact Information</p>
                <p className="text-gray-800">email : {department.email}</p>
                <p className="text-gray-800">phone : {department.phone}</p>
              </div>
            </div>
          </div>
        </div>
        <Link to={`/admin/editdepartment/${department._id}`} >
        <button className="mt-4 md:mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none">
          Edit
        </button>
        
        </Link>
       
      </div>
    </div>

    {/* Current Projects */}
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-full lg:w-1/3">
      <h2 className="text-lg md:text-xl font-semibold text-indigo-900 mb-4">Current Projects</h2>
      <p className="text-gray-600 mb-4">
        Here you can find more details about your projects. Keep your user engaged by providing meaningful information.
      </p>
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="path/to/system-upgrade.jpg"
              alt="System Upgrade"
              className="h-10 md:h-12 w-10 md:w-12 rounded-lg mr-4"
            />
            <div>
              <p className="text-gray-800 font-medium">System Upgrade</p>
              <p className="text-sm text-gray-600">In Progress</p>
              <a href="#" className="text-sm text-blue-600">See project details</a>
            </div>
          </div>
          <button className="text-indigo-600 hover:text-indigo-800 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 4a1 1 0 00-2 0v12a1 1 0 002 0V4zM14 4a1 1 0 10-2 0v12a1 1 0 102 0V4z" />
            </svg>
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="path/to/network-security.jpg"
              alt="Network Security Audit"
              className="h-10 md:h-12 w-10 md:w-12 rounded-lg mr-4"
            />
            <div>
              <p className="text-gray-800 font-medium">Network Security Audit</p>
              <p className="text-sm text-gray-600">Completed</p>
              <a href="#" className="text-sm text-blue-600">See project details</a>
            </div>
          </div>
          <button className="text-indigo-600 hover:text-indigo-800 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 4a1 1 0 00-2 0v12a1 1 0 002 0V4zM14 4a1 1 0 10-2 0v12a1 1 0 102 0V4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* User List */}
  <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mt-6 md:mt-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg md:text-xl font-semibold text-indigo-900">User List</h2>
      <button className="text-indigo-600 hover:text-indigo-800 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      </button>
    </div>
    <div className="overflow-x-auto"> {/* Add this wrapper */}
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
          
            <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200">Full Name</th>
            <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200">Email</th>
            <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200">Role</th>
            <th className="px-2 md:px-4 py-2 border-b-2 border-gray-200 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample Row 1 */}
          {
  department.TeamMembers.map((user) => (
    <tr key={user._id}>
      
      <td className="px-2 md:px-4 py-2 border-b border-gray-200">{user.firstName ? user.firstName + user.lastName : 'N/A'}</td>
      <td className="px-2 md:px-4 py-2 border-b border-gray-200">{user.email ? user.email : 'N/A'}</td>
      <td className="px-2 md:px-4 py-2 border-b border-gray-200">{user.position ? user.position : 'N/A'}</td>
      <td className="px-2 md:px-4 py-2 border-b border-gray-200 flex justify-center space-x-2">
       
        <button onClick={()=>deleteUser(user._id)} className="text-red-600 hover:text-red-800">Delete</button>
      </td>
    </tr>
  ))
}

          {/* Repeat rows as needed */}
        </tbody>
      </table>
    </div> {/* End wrapper */}
  </div>



       

    

        </div>
        
    
    </div>
   
  )
}

export default Departdetails
