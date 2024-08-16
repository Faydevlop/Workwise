import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../components/Sidebar/AdminSidebar'

const Leavemanagment = () => {
  const [showLeaveMenu, setShowLeaveMenu] = useState(null)
  const [showPolicyMenu, setShowPolicyMenu] = useState(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the dropdown menu if clicking outside
      if (!event.target.closest('.dropdown-menu')) {
        setShowLeaveMenu(null)
        setShowPolicyMenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleLeaveMenu = (index) => {
    setShowLeaveMenu(showLeaveMenu === index ? null : index)
  }

  const togglePolicyMenu = (index) => {
    setShowPolicyMenu(showPolicyMenu === index ? null : index)
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        <AdminSidebar />
      </div>
      <div className='bg-blue-50' style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <header className="flex border shadow-lg rounded  mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
          <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <a className="flex-none font-semibold text-xl  text-black focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
              Leave Management
            </a>
            <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
            </div>
          </nav>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold mb-2">Total Employees</h2>
              <p className="text-4xl font-bold">183</p>
              <div className="mt-4">
                <p className="text-sm text-gray-500">No of working employees</p>
                <p className="text-2xl font-semibold">178</p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Pending Approval</p>
                <p className="text-2xl font-semibold">5</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Leave Statistics</h2>
                <div className="flex space-x-2 text-sm">
                  <span className="text-blue-600">■ Sick Leave</span>
                  <span className="text-purple-600">■ Paid Leave</span>
                </div>
              </div>
              <div className="h-40 bg-gray-200">
                <p className="text-center pt-16">Chart Placeholder</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Leave Lists</h2>
                <button className="text-gray-500">•••</button>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">E12345</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">IT</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">Vacation</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">2024-07-18</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">2024-07-28</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900 mr-2">Reject</button>
                      <button className="text-green-600 hover:text-green-900 mr-2">Approve</button>
                      <button className="text-blue-600  hover:text-blue-900">Info</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Who's On Leave */}
              <div className="bg-white rounded-lg shadow">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold">Who's On Leave</h2>
                  <button className="text-gray-500 dropdown-menu" onClick={() => toggleLeaveMenu(1)}>•••</button>
                </div>
                <div className="p-4 space-y-4">
                  {['Adela Parkson', 'Christian Mad', 'Jason Statham'].map((name, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                        <div>
                          <p className="font-medium">{name}</p>
                          <p className="text-sm text-gray-500">Product Designer</p>
                        </div>
                      </div>
                      <div className="relative">
                        <button className="text-gray-500 dropdown-menu" onClick={() => toggleLeaveMenu(index)}>•••</button>
                        {showLeaveMenu === index && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
                            <ul className="py-1">
                              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Info</li>
                              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leave Policy */}
              <div className="bg-white rounded-lg shadow">
  <div className="p-4 border-b">
    <h2 className="text-lg font-semibold">Leave Policy</h2>
  </div>
  <div className="p-4 space-y-4">
    {[
      "Sick Leave",
      "Casual Leave",
      "Maternity Leave",
      "Paternity Leave",
      "Paid Leave",
      "Unpaid Leave",
    ].map((policy, index) => (
      <div key={index} className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{policy}</p>
        <div className="relative">
          
          
        </div>
      </div>
    ))}
  </div>
</div>

            </div>

            {/* Other Content */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leavemanagment
