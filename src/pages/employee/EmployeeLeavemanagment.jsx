import React from 'react'
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar'
import { Link } from 'react-router-dom'

const EmployeeLeavemanagment = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <EmployeeSidebar />
      </div>

        <div className='bg-blue-50' style={{ flex: 1, padding: '10px', overflow: 'auto', marginLeft: '0' }}>
                 
          {/* content section starts here */}
          <header className="flex border  mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
  <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
    <a className="flex-none font-semibold text-xl  text-black focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
      Leaves and Overview
    </a>
    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
      <Link to={'/employee/leave/applyleave'} >
      <button className="px-4 py-2 bg-blue-700 rounded-xl text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Apply Leave
      </button>
      </Link>
     
    </div>
  </nav>
</header>
       
  {/* Main container to align items */}
  <div className="flex flex-col lg:flex-row lg:space-x-8">
  <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-4xl mx-auto">
    <h3 className="text-lg font-medium text-gray-800 mb-4">Leave History</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-b-2">Request ID</th>
            <th className="p-2 border-b-2">Employee Name</th>
            <th className="p-2 border-b-2">Department</th>
            <th className="p-2 border-b-2">Leave Type</th>
            <th className="p-2 border-b-2">Start Date</th>
            <th className="p-2 border-b-2">End Date</th>
            <th className="p-2 border-b-2">Status</th>
            <th className="p-2 border-b-2">Info</th> {/* New column for info icon */}
          </tr>
        </thead>
        <tbody>
          {[
            { id: 'E12345', name: 'John Doe', dept: 'IT', type: 'Vacation', start: '2024-07-18', end: '2024-07-28', status: 'Approved' },
            { id: 'E12346', name: 'Jane Smith', dept: 'HR', type: 'Sick', start: '2024-07-25', end: '2024-07-29', status: 'Approved' },
            { id: 'E12347', name: 'Mark Johnson', dept: 'Finance', type: 'Unpaid', start: '2024-07-20', end: '2024-07-30', status: 'Rejected' },
            { id: 'E12348', name: 'Emily Davis', dept: 'Sales', type: 'Unpaid', start: '2024-07-21', end: '2024-07-31', status: 'Approved' },
            { id: 'E12349', name: 'Michael Brown', dept: 'IT', type: 'Emergency', start: '2024-07-23', end: '2024-07-25', status: 'Approved' },
          ].map((leave, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-2 border-b">{leave.id}</td>
              <td className="p-2 border-b">{leave.name}</td>
              <td className="p-2 border-b">{leave.dept}</td>
              <td className="p-2 border-b">{leave.type}</td>
              <td className="p-2 border-b">{leave.start}</td>
              <td className="p-2 border-b">{leave.end}</td>
              <td className="p-2 border-b">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${leave.status === 'Approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {leave.status}
                </span>
              </td>
              <td className="p-2 border-b text-center"> {/* Info icon cell */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-9-1a1 1 0 000 2h1v4a1 1 0 002 0v-4h1a1 1 0 100-2h-4zm1-4a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    
    {/* Edit Details Section */}
   

    {/* Leave Summary */}
    <div className="bg-white rounded-lg p-4  shadow-md w-full lg:w-1/4 mt-8 lg:mt-0"> {/* Reduced width */}
      <h3 className="text-lg font-semibold text-gray-800">Leave Summary</h3>
      <ul className="mt-4 space-y-2">
        <li className="flex justify-between">
          <span className="text-gray-600">Annual leave</span>
          <span className="font-semibold text-gray-800">3</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-600">Sick leave</span>
          <span className="font-semibold text-gray-800">2</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-600">Personal leave</span>
          <span className="font-semibold text-gray-800">3</span>
        </li>
      </ul>
    </div>
  </div>
  <br />

  

         

        </div>
        
    
    </div>
   
  )
}

export default EmployeeLeavemanagment
