import React from 'react';
import { Link } from 'react-router-dom';

const PayrollTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total salary</th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.employee ? `${user.employee.firstName} ${user.employee.lastName}` : ''}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.employee ? `${user.employee.email}` : ''}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.bonuses}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.deductions}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.baseSalary}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.totalAmount}</td>
                  {user.employee && (
                    <td className="p-4 align-middle text-right">
                      <Link to={`/hr/payrollmanagement/edit/${user.employee._id}`}>
                        <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
                          </svg>
                          <span className="sr-only">Edit</span>
                        </button>
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-4">No Payroll details</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayrollTable;
