import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/Sidebar/AdminSidebar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetailspage = () => {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/project/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchData();
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

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
              <Link to={`/admin/projectmanagment/editproject/${projectId}`}>
                <button className="px-4 py-2 bg-blue-700 rounded-xl text-white font-medium hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Edit Details
                </button>
              </Link>
            </div>
          </nav>
        </header>

        <div className="p-10 bg-white mt-5 shadow-lg rounded-lg w-full lg:ml-5 max-w-8xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className="flex flex-col md:flex-row">
              <img
                src="https://via.placeholder.com/100" // Replace with your project image source
                alt="Project"
                className="w-24 h-24 rounded-lg mr-4 mb-4 md:mb-0"
              />
              <div>
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p className="text-lg font-medium text-gray-700">Status: {project.status}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Start Date: {project.startDate}<br />
                  End Date: {project.endDate}<br />
                  Priority: {project.priority}
                </p>
              </div>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
              <h3 className="text-lg font-semibold">Team Lead</h3>
              <p>{project.teamLead ? `${project.teamLead.firstName} ${project.teamLead.lastName}` : "N/A"}</p>
              <div className="mt-2">
                <h3 className="text-lg font-semibold">Team Mates</h3>
                <p>
                  {project.teamMates && project.teamMates.length > 0
                    ? project.teamMates.map(mate => `${mate.firstName} ${mate.lastName}`).join(', ')
                    : "No team mates assigned"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-600 mb-4">
              {project.description}
            </p>
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div style={{ width: "60%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
              </div>
              <div className="flex justify-between text-sm font-medium text-blue-600">
                <span>Not Started</span>
                <span>In Progress</span>
                <span>Completed</span>
                <span>Reviewed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailspage;
