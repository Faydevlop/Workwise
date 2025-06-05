import { Link } from 'react-router-dom';

const DepartmentList = ({ departments }) => (
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
    <div className="p-6 bg-[#2F3849] text-white flex justify-between">
      <h3 className="text-sm font-medium">Department List</h3>
    </div>
    <div className="p-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-4 text-left">Department</th>
            <th className="px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.slice().reverse().map((d) => (
            <tr key={d._id} className="border-b">
              <td className="px-4 py-2">{d.departmentName}</td>
              <td className="px-4 py-2">
                <Link to={`/admin/department/${d._id}`}>
                  <button className="border px-3 py-1 rounded">More Info</button>
                </Link>
              </td>
            </tr>
          ))}
          {departments.length === 0 && (
            <tr>
              <td colSpan="2" className="text-center py-2">No Departments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default DepartmentList;
