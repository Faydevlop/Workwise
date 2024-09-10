import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/Sidebar/AdminSidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';

const Departmentmanagment = () => {
  const [data,setData] = useState([])
  const [loading ,setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    const fetchdata = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/department/list`)
        
        setData( response.data);
        console.log(response.data);
        
        

      } catch (error) {
       
      }finally{
        setLoading(false)
      }
    }
    fetchdata()
  },[])

  const deleteDepartment = async(departmentId)=>{
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/department/delete/${departmentId}`);
      toast.success("Department deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });


    } catch (error) {
      toast.error('Error deleting department ', {
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
          <ToastContainer/>
          <header className="flex border shadow-lg bg-[#2F3849] rounded  mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full  text-sm py-3">
          <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <a className="flex-none font-semibold text-xl  text-white focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
              Department Management
            </a>
            <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
            </div>
          </nav>
        </header>
                 
          {/* section 1 */}

          <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6">
  {/* Search Bar */}
  <div className="flex justify-between items-center mb-4">
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      
    </div>
    <Link to={'/admin/addDepartment'}>
    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none">
      Add new department
    </button>
    </Link>
  </div>
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

  {/* Responsive Table */}
  <div className="overflow-x-auto">
    <table className="w-full text-left table-auto">
      <thead>
        <tr>
         
          <th className="px-4 py-2 border-b-2 border-gray-200">Department Name</th>
          <th className="px-4 py-2 border-b-2 border-gray-200">Head of Department</th>
          <th className="px-4 py-2 border-b-2 border-gray-200">Number of Employees</th>
          <th className="px-4 py-2 border-b-2 border-gray-200">Contact Information</th>
          <th className="px-4 py-2 border-b-2 border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Sample Row 1 */}
        {data.map((department, index) => (
        <tr key={index}>
          <td className="px-4 py-2 border-b border-gray-200">{department.departmentName}</td>
          <td className="px-4 py-2 border-b border-gray-200">{department.headOfDepartMent ? `${department.headOfDepartMent.firstName} ${department.headOfDepartMent.lastName}` : 'Not Available'}</td>
          <td className="px-4 py-2 border-b border-gray-200">{department.TeamMembers.length }</td>
          <td className="px-4 py-2 border-b border-gray-200">{department.email}</td>
          <td className="px-4 py-2 border-b border-gray-200 flex space-x-2">
            
            <Link to={`/admin/department/${department._id}`}>
            <button className="text-yellow-500 hover:text-yellow-700">Info</button>
            </Link>
            <button onClick={()=>deleteDepartment(department._id)} className="text-red-600 ml-3 mr-3 hover:text-red-800">Delete</button>
          </td>
        </tr>
      ))}

        {/* Repeat above row for each department */}
      </tbody>
    </table>
  </div>
</div>

    

        </div>
        
    
    </div>
   
  )
}

export default Departmentmanagment
