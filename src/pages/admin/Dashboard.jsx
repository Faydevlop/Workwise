import React from 'react'
import AdminSidebar from '../../components/Sidebar/AdminSidebar'

const AdminDashBoard = () => {
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
          <div className="min-h-screen ml-1  p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">New Tasks</h2>
              <p className="text-3xl font-bold text-gray-900">154</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-500 text-white p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Total Projects
              </h2>
              <p className="text-3xl font-bold text-gray-900">2935</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">This month</h2>
          <div className="flex justify-between items-center mb-6">
            <p className="text-4xl font-bold text-gray-900">$37.5K</p>
            <p className="text-green-500 text-xl">+2.45% On track</p>
          </div>
          <div className="relative">
            {/* Placeholder for Line Chart */}
            <svg className="w-full h-40 text-blue-500" viewBox="0 0 500 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 90L110 70L210 90L310 50L410 70L510 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">April 2021</h2>
            <div className="flex space-x-2">
              <button className="p-1 rounded-lg bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 10a1 1 0 011-1h7a1 1 0 110 2H7a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="p-1 rounded-lg bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 10a1 1 0 000 2h7a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            <div className="text-gray-400">Mo</div>
            <div className="text-gray-400">Tu</div>
            <div className="text-gray-400">We</div>
            <div className="text-gray-400">Th</div>
            <div className="text-gray-400">Fr</div>
            <div className="text-gray-400">Sa</div>
            <div className="text-gray-400">Su</div>
            {/* Add more dates as needed */}
            <div className="text-gray-800">22</div>
            <div className="text-gray-800 bg-blue-100 rounded-full">23</div>
            <div className="text-gray-800">24</div>
            {/* Remaining dates... */}
          </div>
        </div>
      </div>

      {/* Project Table */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Table</h2>
        <table className="w-full">
          <thead>
            <tr className="text-gray-500">
              <th className="text-left">Name</th>
              <th className="text-left">Status</th>
              <th className="text-left">Date</th>
              <th className="text-left">Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-4">Horizon UI PRO</td>
              <td className="text-green-500">Finish</td>
              <td>18 Apr 2021</td>
              <td>
                <div className="h-2 bg-green-200 rounded-full w-24"></div>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>

        </div>
        
    
    </div>
   
  )
}

export default AdminDashBoard
