import React, { useEffect, useRef, useState } from 'react'
import AdminSidebar from '../../components/Sidebar/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Usermanagment = () => {

    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(true)
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate()
  
    const toggleDropdown = (userId) => {
      setOpenDropdownId(openDropdownId === userId ? null : userId);
    };
  
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [])


    
const handleDelete = async (userId) =>{
    try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/deleteuser/${userId}`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`,
          }
        })
        toast.success('User deleted successfully', {
            position: 'top-right',
            autoClose: 3000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         
        });


    } catch (error) {
        toast.error('Failed to delete user', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

   
}

    useEffect(()=>{
        const fetchUser = async () =>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/getusers`,{
                  headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                  }
                });
                setUsers(response.data.allUsers)

            } catch (error) {
                //
            }finally{
                setLoading(false)
            }
        }

        fetchUser();
    },[])

    console.log(users);
    
    

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
    <div className="hidden lg:block" style={{ width: '250px' }}>
     <AdminSidebar/>
     </div>
      <div className="lg:hidden">
     {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
     <AdminSidebar />
   </div>
   <ToastContainer/>

     <div className='bg-blue-50'      style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
              
       {/* section 2 */}
       <header className="flex border shadow-lg rounded-lg  mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
  <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
    <a className="flex-none font-semibold text-xl  text-black focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
      Employee List
    </a>
    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
      <Link to={'/admin/Usermanagment/adduser'} >
      <button className="px-4 py-2 bg-blue-700 rounded-xl text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Add Employee
      </button>
      </Link>
     
    </div>
  </nav>
</header>
       
    <div className="mx-auto max-w-screen-xl px- ">
      
      
        
        <div className="bg-white dark:bg-white relative shadow-lg sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  {/* <Link to=''>
                    <button type="button" className="flex items-center justify-center text-white bg-blue-500 hover:bg-gray-400 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                            
                            Search
                        </button>
                  </Link> */}
                   
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        
                        <div id="actionsDropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                <li>
                                    <a href="/" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a href="/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <hr />
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-white dark:text-black">
                        <tr>
                            <th scope="col" className="px-4 py-3">Full Name</th>
                            <th scope="col" className="px-4 py-3">Email</th>
                            <th scope="col" className="px-4 py-3">Role</th>
                            <th scope="col" className="px-4 py-3">Department</th>
                            <th scope="col" className="px-4 py-3">Status</th>
                            <th scope="col" className="px-4 py-3">Date Joined</th>
                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
          <tr className="border-b text-black relative" key={user._id}>
            <td className="px-4 py-3">{user.firstName} {user.lastName}</td>
            <td className="px-4 py-3">{user.email}</td>
            <td className="px-4 py-3">{user.position}</td>
            <td className="px-4 py-3">{user.department}</td>
            <td className="px-4 py-3">{user.employeeStatus}</td>
            <td className="px-4 py-3">
                
              {new Date(user.dateOfJoining).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </td>
            <td className="px-4 py-3 flex items-center justify-end relative">
              <button
                id={`dropdown-button-${user._id}`}
                data-dropdown-toggle={`dropdown-${user._id}`}
                className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-black dark:hover:text-gray-100"
                type="button"
                onClick={() => toggleDropdown(user._id)}
              >
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
              {openDropdownId === user._id && (
                <div
                  ref={dropdownRef}
                  id={`dropdown-${user._id}`}
                  className="absolute right-0 mt-2 z-20 w-44 bg-white rounded divide-y divide-gray-100 shadow "
                >
                  <ul className="py-1 text-sm text-dark dark:text-dark" aria-labelledby={`dropdown-button-${user._id}`}>
                  <Link to={`/admin/showuser/${user._id}`}>
                    <li>
                      <a  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                    </li>
                    </Link>
                    <Link to={`/admin/edituser/${user._id}`}>
                    <li>
                      <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    </Link>
                  </ul>
                  <div className="py-1">
                    <a onClick={()=>handleDelete(user._id)}  className="block py-2 px-4 text-sm text-red-700 hover:bg-gray-100 ">Delete</a>
                  </div>
                  
                </div>
                
              )}
            </td>
          </tr>
        ))}
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            
          >
            <CircularProgress color="inherit" />
          </Backdrop>

                        
                       
                       
                        
                        
                        
                        
                        
                        
                    </tbody>
                </table>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                {/* <span className="text-sm font-normal text-black dark:text-black">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                    of
                    <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                </span> */}
                {/* <ul className="inline-flex items-stretch -space-x-px">
                    <li>
                        <a href="/" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="/" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="/" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="/" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="/" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                    </li>
                    <li>
                        <a href="/" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                    </li>
                    <li>
                        <a href="/" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ul> */}
                <hr />
            </nav>
        </div>
    </div>
 

     </div>
     
 
 </div>
  )
}

export default Usermanagment
