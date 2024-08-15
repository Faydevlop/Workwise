import React from "react";

function LoginPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">New CRM System Implementation</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-blue-600 font-semibold mr-2">In Progress</span>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">51%</span>
          </div>
          <div className="text-sm text-gray-500">
            <span className="mr-4">Total Tasks: 15/48</span>
            <span>Due Date: 29 Jun, 2022</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "51%"}}></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="Project icon" className="w-10 h-10 mr-3 rounded" />
              <div>
                <h3 className="font-semibold">Requirement Gathering and Analysis</h3>
                <p className="text-sm text-gray-600">Analyze current CRM system capabilities...</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">High</span>
              <div className="flex items-center">
                <span className="text-sm mr-2">Progress</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: "90%"}}></div>
                </div>
                <span className="text-sm ml-2">90%</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              2024-09-30
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="Project icon" className="w-10 h-10 mr-3 rounded" />
              <div>
                <h3 className="font-semibold">Requirement Gathering and Analysis</h3>
                <p className="text-sm text-gray-600">Analyze current CRM system capabilities...</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Low</span>
              <div className="flex items-center">
                <span className="text-sm mr-2">Progress</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: "30%"}}></div>
                </div>
                <span className="text-sm ml-2">30%</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              2024-09-30
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
