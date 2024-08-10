import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/Sidebar/AdminSidebar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProjectpage = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('pending');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priority, setPriority] = useState('low');
    const [description, setDescription] = useState('');
    const [teamLead, setTeamLead] = useState('');   
    const [teamMates, setTeamMates] = useState([]);
const {projectId } = useParams()



    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name,
            status,
            startDate,
            endDate,
            priority,
            description,
            teamLead,
            teamMates,
        };
        console.log(userData);
        // Handle the submission logic here
    };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <AdminSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px', overflow: 'hidden', marginLeft: '0' }}>
        <header className="flex border border-gray-200 lg:ml-4 flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
          <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <a className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
              Projects and Overview
            </a>
            <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
              <Link to={`/admin/projectmanagment/${projectId}`}>
                <button className="px-4 py-2 bg-blue-700 rounded-xl text-white font-medium hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Edit Details
                </button>
              </Link>
            </div>
          </nav>
        </header>
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                <form className="max-screen-lg lg:ml-10 mx-auto p-5 bg-white border border-gray-200 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Project Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 font-medium">Project Name</label>
                            <input 
                                type="text" 
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Status</label>
                            <select 
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Start Date</label>
                            <input 
                                type="date" 
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">End Date</label>
                            <input 
                                type="date" 
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Priority</label>
                            <select 
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700 font-medium">Description</label>
                            <textarea 
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Team Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 font-medium">Select Team Lead</label>
                            <select 
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={teamLead}
                                onChange={(e) => setTeamLead(e.target.value)}
                            >
                                <option value="lead1">Lead 1</option>
                                <option value="lead2">Lead 2</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-gray-700 font-medium">Select Team Mates</label>
                            <select 
                                multiple 
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={teamMates}
                                onChange={(e) => setTeamMates(Array.from(e.target.selectedOptions, option => option.value))}
                            >
                                <option value="mate1">Mate 1</option>
                                <option value="mate2">Mate 2</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button 
                            type="submit" 
                            className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 font-semibold"
                        >
                            Submit Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
        

        
      </div>
    </div>
  );
}

export default EditProjectpage;
