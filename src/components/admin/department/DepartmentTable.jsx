import React from 'react';
import { Link } from 'react-router-dom';

const DepartmentTable = ({ departments, onDelete, searchTerm }) => {
  // Function to highlight search terms in text
  const highlightText = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (departments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No departments available</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 border-b-2 border-gray-200 font-semibold text-gray-700">
              Department Name
            </th>
            <th className="px-4 py-3 border-b-2 border-gray-200 font-semibold text-gray-700">
              Head of Department
            </th>
            <th className="px-4 py-3 border-b-2 border-gray-200 font-semibold text-gray-700">
              Number of Employees
            </th>
            <th className="px-4 py-3 border-b-2 border-gray-200 font-semibold text-gray-700">
              Contact Information
            </th>
            <th className="px-4 py-3 border-b-2 border-gray-200 font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dep, idx) => {
            const headName = dep.headOfDepartMent 
              ? `${dep.headOfDepartMent.firstName} ${dep.headOfDepartMent.lastName}` 
              : 'Not Available';
            
            return (
              <tr key={dep._id || idx} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-3 border-b border-gray-200">
                  {highlightText(dep.departmentName, searchTerm)}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {highlightText(headName, searchTerm)}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {highlightText(dep.TeamMembers?.length?.toString() || '0', searchTerm)}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {highlightText(dep.email, searchTerm)}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  <div className="flex space-x-2">
                    <Link to={`/admin/department/${dep._id}`}>
                      <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-150">
                        Info
                      </button>
                    </Link>
                    <button 
                      onClick={() => onDelete(dep._id)} 
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors duration-150"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;