import React, { useState } from 'react'
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar'

const EmployeeTaskmanagment = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (taskId) => {
    setOpenDropdownId(openDropdownId === taskId ? null : taskId);
  };

  // Dummy data for tasks
  const tasks = [
    {
      id: 1,
      title: "Write quarterly report",
      description: "Gather data and prepare the Q3 quarterly report for the executive team.",
      status: "Completed",
      dueDate: "2023-09-01",
      priority: "High"
    },
    {
      id: 2,
      title: "Update client presentation",
      description: "Revise the presentation for the upcoming client meeting next week.",
      status: "In Progress",
      dueDate: "2023-09-15",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Conduct team training",
      description: "Organize and lead a training session on the new project management tool.",
      status: "Pending",
      dueDate: "2023-09-30",
      priority: "Low"
    },
    {
      id: 4,
      title: "Review marketing strategy",
      description: "Analyze current marketing efforts and propose improvements for Q4.",
      status: "In Progress",
      dueDate: "2023-09-20",
      priority: "High"
    },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar/>
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <div className="flex flex-col h-full">
          <header className="bg-primary text-primary-foreground py-4 px-6">
            <h1 className="text-2xl font-bold">Task Management</h1>
          </header>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-6">
            <div className="bg-background rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Task Overview</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-black rounded-lg p-4 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-white text-sm">Pending</p>
                </div>
                <div className="bg-black rounded-lg p-4 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-white">8</p>
                  <p className="text-white text-sm">Progress</p>
                </div>
                <div className="bg-black rounded-lg p-4 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-white">5</p>
                  <p className="text-white text-sm ">Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">All Tasks</h2>
                <div className="flex items-center gap-4">
                  <input
                    className="flex h-10 w-full border border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-muted rounded-lg px-4 py-2 text-sm"
                    placeholder="Search tasks..."
                    type="search"
                    value=""
                  />
                  <button
                    className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 flex items-center gap-2"
                    type="button"
                    id="radix-:r2j:"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    data-state="closed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <line x1="10" x2="21" y1="6" y2="6"></line>
                      <line x1="10" x2="21" y1="12" y2="12"></line>
                      <line x1="10" x2="21" y1="18" y2="18"></line>
                      <path d="M4 6h1v4"></path>
                      <path d="M4 10h2"></path>
                      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
                    </svg>
                    <span>Sort by</span>
                  </button>
                </div>
              </div>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Task</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Due Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Priority</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {tasks.map((task) => (
                      <tr key={task.id} className="border-b transition-colors hover:bg-muted cursor-pointer">
                        <td className="p-4 align-middle">
                          <div className="font-medium">{task.title}</div>
                          <p className="text-muted-foreground text-sm line-clamp-2">{task.description}</p>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                            {task.status}
                          </div>
                        </td>
                        <td className="p-4 align-middle">{task.dueDate}</td>
                        <td className="p-4 align-middle">
                          <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                            {task.priority}
                          </div>
                        </td>
                        <td className="relative p-4 align-middle">
                          <button
                            onClick={() => toggleDropdown(task.id)}
                            className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded={openDropdownId === task.id}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4"
                            >
                              <polyline points="8 18 12 22 16 18"></polyline>
                              <polyline points="8 6 12 2 16 6"></polyline>
                              <line x1="12" x2="12" y1="2" y2="22"></line>
                            </svg>
                          </button>
                          {openDropdownId === task.id && (
                            <div className="absolute right-0 z-50 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none">
                              <ul className="py-1 text-gray-700">
                                <li>
                                  <button className="block px-4 py-2 text-sm w-full text-left">Action 1</button>
                                </li>
                                <li>
                                  <button className="block px-4 py-2 text-sm w-full text-left">Action 2</button>
                                </li>
                                <li>
                                  <button className="block px-4 py-2 text-sm w-full text-left">Action 3</button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeTaskmanagment