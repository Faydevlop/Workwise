import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../components/Sidebar/AdminSidebar'
import { Link, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axiosInstance from '../../../config/axiosConfig'

const Departdetails = () => {
  const [department,setDepartment] = useState({
    TeamMembers: [],
  });
  const [projects,setProjects] = useState([])
  const {departmentId} = useParams()
  

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await axiosInstance.get(`/department/details/${departmentId}`);
        setDepartment(response.data.department);
        setProjects(response.data.projects)
        console.log(response.department.department);
        



      } catch (error) {
        
      }
    }
    fetchData()
  },[])

  const deleteUser = async(teamMemberIds)=>{
    alert(teamMemberIds)
    try {

        const response = await axiosInstance.delete(`/department/delete/${departmentId}`,{data: { teamMemberIds }})
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
        Here you can find more details about the projects that Assigned to the Department.
      </p>
      <div className="space-y-4">
      {
            projects.map((project)=>(<div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="data:image/png;base64,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"
                  alt="System Upgrade"
                  className="h-10 md:h-12 w-10 md:w-12 rounded-full mr-4"
                />
                <div>
                  <p className="text-gray-800 font-medium">{project.name}</p>
                  <p className="text-sm text-gray-600">{project.status}</p>
                  <p className="text-sm text-gray-600">End Date{new Date(project.endDate).toLocaleDateString()}</p>
                  <Link to={`/admin/Projectmanagment/${project._id}`}>
                  <a href="#" className="text-sm text-blue-600">See project details</a>
                  </Link>
                </div>
              </div>
              <Link to={`/admin/Projectmanagment/${project._id}`}>
              <button className="text-indigo-600 hover:text-indigo-800 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 4a1 1 0 00-2 0v12a1 1 0 002 0V4zM14 4a1 1 0 10-2 0v12a1 1 0 102 0V4z" />
                </svg>
              </button>
              </Link>
            </div>))

          }
          {
            projects.length === 0 ? 'Projects Not assigned' : ''
          }
        
       
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
