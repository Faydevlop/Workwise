import React from "react";

function TestPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Section */}
        <div className="w-1/2 p-6">
          <div className="relative mb-6">
            <div className="h-24 bg-gradient-to-r from-blue-700 to-purple-600 rounded-t-lg"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <img src="profile-picture.jpg" alt="John Doe" className="w-20 h-20 rounded-full border-4 border-white" />
            </div>
          </div>
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-sm text-gray-500">User ID: 101</p>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Full Name:</span> John Doe</p>
                <p><span className="font-medium">Email:</span> john@example.com</p>
                <p><span className="font-medium">Phone Number:</span> +1234567890</p>
                <p><span className="font-medium">Address:</span> 123 Main St, Anytown, USA</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Professional Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Role:</span> Manager</p>
                <p><span className="font-medium">Department:</span> IT</p>
                <p><span className="font-medium">Date Joined:</span> 2023-01-01</p>
                <p><span className="font-medium">Employment Status:</span> Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Section */}
        <div className="w-1/2 p-6 bg-gray-50">
          <h2 className="text-2xl font-semibold mb-6">Detail page</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Leave Request Details</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Request ID:</span> 1001</p>
              <p><span className="font-medium">Leave Type:</span> Vacation</p>
              <p><span className="font-medium">Start Date:</span> 2024-08-01</p>
              <p><span className="font-medium">End Date:</span> 2024-08-10</p>
              <p><span className="font-medium">Duration:</span> 10 days</p>
              <p><span className="font-medium">Request Date:</span> 2024-07-15</p>
              <p><span className="font-medium">Leave Status:</span> <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">Pending</span></p>
              <p><span className="font-medium">Reason:</span> Family Trip</p>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Approve</button>
              <button className="px-4 py-2 bg-black text-white rounded-lg">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default TestPage;
