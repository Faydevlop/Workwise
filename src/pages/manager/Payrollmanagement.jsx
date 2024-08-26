import React, { useEffect, useState } from 'react'
import ManagerSidebar from '../../components/Sidebar/ManagerSidebar'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Payrollmanagement = () => {
    const [data,setData] = useState([])
    const { manager } = useSelector((state) => state.managerAuth);
    const userId = manager.manager._id;
  
  

     const fetchdata = async()=>{
        

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/payroll/listdepartmentwise/${userId}`)
            setData(response.data.users)
            console.log(response.data.users);
        } catch (error) {
            
        }
     }

     useEffect(()=>{
        fetchdata()
     },[])

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-64 lg:flex-shrink-0">
        <div className="hidden lg:block">
          <ManagerSidebar/>
        </div>
        <div className="lg:hidden">
          {/* Mobile sidebar toggle button */}
          <button className="p-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-x-hidden">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-4 sm:px-6">
          <div className="flex-1 flex items-center">
            <form className="w-full max-w-sm">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8" placeholder="Search employees" type="search" />
              </div>
            </form>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <h1 className="font-semibold text-lg md:text-xl mb-4 sm:mb-0">Payroll</h1>
            <div className="flex flex-wrap justify-center sm:justify-end gap-2">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" x2="12" y1="15" y2="3"></line>
                </svg>
                Export
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                Add Employee
              </button>
            </div>
          </div>

          <div className="grid gap-6 mb-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card components */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6">
            <p className="text-sm text-muted-foreground">Total Payroll</p>
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">$20709.00</h3>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6">
            <p className="text-sm text-muted-foreground">Average Payroll</p>
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">$5177.25</h3>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6">
            <p className="text-sm text-muted-foreground">Employees</p>
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">4</h3>
          </div>
        </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base salary</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total salary</th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                        data.map((user)=>(
                            <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.payroll ? ` ₹${user.payroll.bonuses}` : 'Not available'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.payroll ? `₹${user.payroll.deductions}` : 'Not available'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.payroll ? `₹${user.payroll.baseSalary}` : 'Not available'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.payroll ? `₹${user.payroll.totalAmount}` : 'Not available'}</td>
                      {
                        user.payroll  ? ( <td className="p-4 align-middle text-right">
                            <Link to={`/manager/payrollmanagement/edit/${user._id}`}>
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
                              </svg>
                              <span className="sr-only">Edit</span>
                            </button>
                            </Link>
                            
                          </td>)
                          :
                          ""
                      }
                      
                      
                    </tr>
                        ))
                    }

                    
                    {/* Add more rows as needed */}
                  </tbody>
                  
                </table>
                {
                        data.length === 0 ? (<p className='p-2 text-center'>No Payroll details</p>) : ""
                    }
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Payrollmanagement