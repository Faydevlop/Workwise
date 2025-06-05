import { Link } from 'react-router-dom';

const PendingLeaves = ({ leaves }) => (
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
    <div className="space-y-1.5 p-6 bg-[#2F3849] text-white border flex flex-row items-center justify-between pb-2">
      <h3 className="text-sm font-medium">Pending Leave Approvals</h3>
    </div>
    <div className="p-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-4 text-left">Employee</th>
            <th className="px-4 text-left">Dates</th>
            <th className="px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.slice().reverse().map((leave) => (
            <tr key={leave._id} className="border-b">
              <td className="px-4 py-2">{leave?.userId?.firstName} {leave?.userId?.lastName}</td>
              <td className="px-4 py-2">
                {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                <Link to={`/admin/leavedetails/${leave._id}`}>
                  <button className="border px-3 py-1 rounded">View</button>
                </Link>
              </td>
            </tr>
          ))}
          {leaves.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center text-sm py-2">No Pending Leave Approvals found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default PendingLeaves;
