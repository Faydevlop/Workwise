import { Link } from 'react-router-dom';

const DepartmentTable = ({ departments, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-2 border-gray-200">Department Name</th>
            <th className="px-4 py-2 border-b-2 border-gray-200">Head of Department</th>
            <th className="px-4 py-2 border-b-2 border-gray-200">Number of Employees</th>
            <th className="px-4 py-2 border-b-2 border-gray-200">Contact Information</th>
            <th className="px-4 py-2 border-b-2 border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dep, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2 border-b border-gray-200">{dep.departmentName}</td>
              <td className="px-4 py-2 border-b border-gray-200">
                {dep.headOfDepartMent ? `${dep.headOfDepartMent.firstName} ${dep.headOfDepartMent.lastName}` : 'Not Available'}
              </td>
              <td className="px-4 py-2 border-b border-gray-200">{dep.TeamMembers.length}</td>
              <td className="px-4 py-2 border-b border-gray-200">{dep.email}</td>
              <td className="px-4 py-2 border-b border-gray-200 flex space-x-2">
                <Link to={`/admin/department/${dep._id}`}>
                  <button className="text-yellow-500 hover:text-yellow-700">Info</button>
                </Link>
                <button onClick={() => onDelete(dep._id)} className="text-red-600 ml-3 mr-3 hover:text-red-800">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
