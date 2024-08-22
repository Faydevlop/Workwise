import React, { useState } from "react";

function TestPage() {



  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Top Section */}
      <div className="w-full max-w-6xl bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">New CRM System Implementation</h2>
            <p className="text-gray-500">UI/UX Designer</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-gray-500">Status: <span className="text-blue-500">In Progress</span> 51%</p>
            <p className="text-gray-500">Total Tasks: 15 / 48</p>
            <p className="text-gray-500">Due Date: 29 Jan, 2022</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Left Column */}
        <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow-md">
          <img src="your-image-source" alt="Project" className="rounded-lg mb-4"/>
          <h3 className="font-bold text-lg mb-2">Task Details</h3>
          <div className="space-y-4">
            {/* Task Item */}
            <div>
              <h4 className="text-gray-700">New CRM System Implementation</h4>
              <p className="text-sm text-gray-500">UI/UX Designer</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <span className="text-sm text-gray-500">40%</span>
              </div>
            </div>
            {/* Add more tasks similarly */}
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">Add Task</button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-2/3 flex flex-col space-y-4">
          {/* Task Cards */}
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            {/* Card 1 */}
            <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
              <img src="your-image-source" alt="Task" className="rounded-lg mb-4"/>
              <h4 className="font-bold text-lg mb-2">Requirement Gathering and Analysis</h4>
              <p className="text-gray-500">Priority: <span className="text-red-500">High</span></p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
                <span className="text-sm text-gray-500">90%</span>
              </div>
              <p className="text-gray-500 mt-2">Due Date: 2024-09-30</p>
            </div>
            {/* Repeat similar cards with different content */}
          </div>
        </div>
      </div>
    </div>
  

  
  );
}

export default TestPage;
