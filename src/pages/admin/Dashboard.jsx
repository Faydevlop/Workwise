import React from 'react'
import AdminSidebar from '../../components/Sidebar/AdminSidebar'

const AdminDashBoard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      
       <div className="hidden lg:block" style={{ width: '250px' }}>
        
        <AdminSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <AdminSidebar />\
      </div>
      

        <div className='bg-blue-50' style={{ flex: 3, padding: '20px', overflow: 'auto', marginLeft: '' }}>
          
          
                 
        
  <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <a
        href="/"
        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
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
          className="h-4 w-4 transition-all group-hover:scale-110"
        >
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01"></path>
          <path d="M16 6h.01"></path>
          <path d="M12 6h.01"></path>
          <path d="M12 10h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M16 10h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M8 10h.01"></path>
          <path d="M8 14h.01"></path>
        </svg>
        <span className="sr-only">Acme Inc</span>
      </a>
    </nav>
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5"></nav>
  </aside>
  <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
    <header className="sticky   top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="relative  ml-auto  flex-1 md:grow-0">
        <div className="absolute  left-2.5 top-2.5 h-4 w-4 text-muted-foreground"></div>
        <input
          className="flex h-10 border  border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          placeholder="Search..."
          type="search"
         />
      </div>
    </header>
    <main className="grid  flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid  grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="rounded-lg bg-white border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Total Employees</h3>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold">245</div>
          </div>
        </div>
        <div className="rounded-lg border bg-white bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Open Tickets</h3>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold">12</div>
          </div>
        </div>
        <div className="rounded-lg border bg-white bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col  space-y-1.5 p-6 pb-2">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Upcoming Events</h3>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold">4</div>
          </div>
        </div>
        <div className="rounded-lg border bg-white bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Pending Leaves</h3>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold">7</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-white bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex  flex-col space-y-1.5 p-6 pb-2">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                  className="h-4 w-4 mr-2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Add Employee
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                  className="h-4 w-4 mr-2"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                Request Leave
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                  className="h-4 w-4 mr-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Mark Attendance
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                  className="h-4 w-4 mr-2"
                >
                  <line x1="12" x2="12" y1="20" y2="10"></line>
                  <line x1="18" x2="18" y1="20" y2="4"></line>
                  <line x1="6" x2="6" y1="20" y2="16"></line>
                </svg>
                View Reports
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card bg-white text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Upcoming Events</h3>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
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
                    className="h-4 w-4"
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Team Offsite</p>
                  <p className="text-sm text-muted-foreground">June 15, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
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
                    className="h-4 w-4"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">New Hire Onboarding</p>
                  <p className="text-sm text-muted-foreground">July 1, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
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
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Quarterly Review</p>
                  <p className="text-sm text-muted-foreground">August 10, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card bg-white text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Pending Approvals</h3>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
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
                    className="h-4 w-4"
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Leave Request</p>
                  <p className="text-sm text-muted-foreground">John Doe, 5 days</p>
                </div>
                <div className="ml-auto">
                  <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    Approve
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
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
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>


        </div>
        
    
    </div>
   
  )
}

export default AdminDashBoard
