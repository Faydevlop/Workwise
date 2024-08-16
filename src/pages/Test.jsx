import React from "react";

function TestPage() {
  return (
    <div className="bg-gray-100 p-4 sm:p-6">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Left column */}
      <div className="lg:col-span-1 space-y-4 sm:space-y-6">
        {/* Total Employees */}
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
            {/* Placeholder for chart */}
            <p className="text-center pt-16">Chart Placeholder</p>
         
        </div>
          
        </div>
        
       
      </div>
      
      {/* Right columns */}
      <div className="lg:col-span-3 space-y-4 sm:space-y-6">
        {/* Leave Lists */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
  {/* Leave Lists */}
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
        {/* Add more rows with similar structure */}
      </tbody>
    </table>
  </div>
</div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Who's On Leave */}
          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Who's On Leave</h2>
              <button className="text-gray-500">•••</button>
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
                  <button className="text-gray-500">•••</button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Leave Policy */}
          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Leave Policy</h2>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">5</span>
                <button className="text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button className="text-gray-500">•••</button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {['Sick Leave', 'Unpaid', 'Emergency'].map((policy, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p>{policy}</p>
                  <button className="text-gray-500">•••</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  
  );
}

export default TestPage;
