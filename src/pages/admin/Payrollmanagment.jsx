import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/Sidebar/AdminSidebar'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Payrollmanagment = () => {
  const [users,setUsers] = useState([])
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const fetchlist = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/payroll/listusers`);
      setUsers(response.data.users)
      
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchlist()
  },[])


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <AdminSidebar />
      </div>

        <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                 
          {/* section 1 */}
         
    

          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <nav aria-label="breadcrumb" className="hidden md:flex">
          <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
            <li className="inline-flex items-center gap-1.5">
              <a className="transition-colors hover:text-foreground" href="/" rel="ugc">
                Dashboard
              </a>
            </li>
            <li aria-hidden="true" className="[&>svg]:size-3.5" role="presentation">
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
                className="lucide lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span aria-current="page" aria-disabled="true" className="font-normal text-foreground" role="link">
                Payroll
              </span>
            </li>
          </ol>
        </nav>
        <div className="relative ml-auto flex-1 md:grow-0">
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
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            className="flex h-10 w-full border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            placeholder="Search"
            type="search"
          />
        </div>
        <Link to={'/admin/Payrollmanagment/addpayroll'}>
        <button
          className="inline-flex bg-black text-slate-50 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2 rounded-lg overflow-hidden "
          type="button"
          id="radix-:rq:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed"
        >
          Add Payroll
        </button>
        </Link>
        
        
      </header>

      <main className="flex-1 p-4 sm:px-6 sm:py-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Total Employees", value: "125" },
            { title: "Total Payroll", value: "$450,000" },
            { title: "Paid This Month", value: "$38,000" },
            { title: "Unpaid Invoices", value: "12" },
          ].map((item, index) => (
            <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">{item.title}</h3>
              <div className="text-3xl font-bold">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">
              Recent Payroll Transactions
            </h3>
            <p className="text-sm text-muted-foreground">View and manage your recent payroll transactions.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Employee</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Current Month Pay</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {users.map((employee, index) => (
                  <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">
                      <Link to={'/admin/Payrollmanagment/details'}>
                      <div className="font-medium">{employee.firstName}{employee.lastName}</div>
                      <div className="text-sm text-muted-foreground">{employee.email}</div>
                      </Link>
                    </td>
                    <td className="p-4 align-middle">{employee.payroll ? `${employee.payroll.permonthsalary}` : 'Not available'}</td>
                    <td className="p-4 align-middle">{employee.payroll ? `${employee.payroll.baseSalary}` : 'Not available'}</td>
                    <td className="p-4 align-middle">
                      <div className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${employee.payroll?.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {employee.payroll ? `${employee.payroll?.paymentStatus}` : 'Not available'}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                          aria-haspopup="true"
                          type="button"
                          aria-expanded={openDropdown === index}
                        >
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
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                          <span className="sr-only">Toggle menu</span>
                        </button>
                        {openDropdown === index && (
                          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1">
                              <Link to={`/admin/Payrollmanagment/details/${employee.payroll ? employee.payroll._id : 'not'}`}>
                              <a  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">view</a>
                              </Link>
                              

                            <Link to={`/admin/Payrollmanagment/edit/${employee.payroll ? employee.payroll._id : 'not'}`}>
                              <a  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
                              </Link>
                              {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</a> */}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
            {
              users.length == 0 ? (<p className='p-2 text-center'>No payroll records</p>) : ''
            }
          </div>
        </div>
      </main>

    



        </div>
        
    
    </div>
  )
}

export default Payrollmanagment
