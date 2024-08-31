import React, { useState } from 'react'

import ManagerSidebar from '../../components/Sidebar/ManagerSidebar'

const Meetings = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };
 
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <ManagerSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <ManagerSidebar />
      </div>

        <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                 
          {/* section 1 */}
          <div className="flex flex-col min-h-screen bg-muted/40">
   <header className="bg-background border-b px-4 md:px-6 flex items-center h-14 sm:h-16">
     <div className="flex-1 flex items-center gap-4">
       <a className="flex items-center gap-2 text-lg font-semibold" href="/">
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
           className="w-6 h-6"
         >
           <path d="M8 2v4"></path>
           <path d="M16 2v4"></path>
           <rect width="18" height="18" x="3" y="4" rx="2"></rect>
           <path d="M3 10h18"></path>
         </svg>
         <span className="sr-only">Acme Meetings</span>
       </a>
       <nav className="hidden md:flex gap-6 text-sm font-medium">
         <a className="text-muted-foreground hover:text-foreground" href="/">
           Meetings Management
         </a>
         
       </nav>
     </div>
     <div className="flex items-center gap-2 md:ml-auto">
      
       <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full md:hidden">
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
           className="w-6 h-6"
         >
           <line x1="4" x2="20" y1="12" y2="12"></line>
           <line x1="4" x2="20" y1="6" y2="6"></line>
           <line x1="4" x2="20" y1="18" y2="18"></line>
         </svg>
         <span className="sr-only">Toggle menu</span>
       </button>
     </div>
   </header>
   <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
     <div>
       <div className="mb-6">
         <h1 className="text-2xl font-bold">Upcoming Meetings</h1>
         <p className="text-muted-foreground">View and manage your upcoming meetings.</p>
       </div>
       
       <div className="border rounded-lg shadow-sm overflow-hidden">
         <div className="relative w-full overflow-auto">
         <table className="w-full caption-bottom text-sm">
      <thead className="[&_tr]:border-b">
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
            Meeting
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
            Date
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
            Time
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
            Attendees
          </th>
          <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="[&_tr:last-child]:border-0">
        {["Weekly Sync", "Sales Review", "Design Review"].map((meeting, index) => (
          <tr
            key={index}
            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          >
            <td className="p-4 align-middle">
              <div className="flex items-center gap-3">
                <div className={`bg-primary text-primary-foreground rounded-md px-2 py-1 text-xs font-medium`}>
                  {meeting}
                </div>
                <div>
                  <div className="font-medium">{meeting}</div>
                  <div className="text-sm text-muted-foreground">Meeting description</div>
                </div>
              </div>
            </td>
            <td className="p-4 align-middle">May 15, 2023</td>
            <td className="p-4 align-middle">2:00 PM - 3:00 PM</td>
            <td className="p-4 align-middle">
              <div className="flex -space-x-2 overflow-hidden">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="relative flex shrink-0 overflow-hidden rounded-full w-6 h-6 border-2 border-background">
                    <img className="aspect-square h-full w-full" alt={`attendee ${i}`} src="https://tailwindui.com/placeholder-user.jpg" />
                  </span>
                ))}
              </div>
            </td>
            <td className="p-4 align-middle text-right">
              <div className="relative inline-block text-left">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Manage
                </button>

                {dropdownOpen === index && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                    style={{ backgroundColor: "white", zIndex: 1000 }}
                  >
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        View Details
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Edit Meeting
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Delete Meeting
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
         </div>
       </div>
     </div>
     <div className="bg-background border rounded-lg shadow-sm p-6 space-y-6">
       <div>
         <h2 className="text-xl font-bold">Next Meeting</h2>
         <p className="text-muted-foreground">Your next upcoming meeting is in 2 hours.</p>
       </div>
       <div className="flex items-center gap-4">
         <div className="bg-primary text-primary-foreground rounded-md px-2 py-1 text-xs font-medium">Weekly Sync</div>
         <div>
           <div className="font-medium">Weekly Sync</div>
           <div className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</div>
         </div>
       </div>
       <div className="flex items-center gap-4">
         <span className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border-2 border-background">
           <img className="aspect-square h-full w-full" alt="@username" src="https://tailwindui.com/placeholder-user.jpg"  />
         </span>
         <span className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border-2 border-background">
           <img className="aspect-square h-full w-full" alt="@username" src="https://tailwindui.com/placeholder-user.jpg"  />
         </span>
         <span className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border-2 border-background">
           <img className="aspect-square h-full w-full" alt="@username" src="https://tailwindui.com/placeholder-user.jpg"  />
         </span>
         <span className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border-2 border-background">
           <img className="aspect-square h-full w-full" alt="@username" src="https://tailwindui.com/placeholder-user.jpg"  />
         </span>
       </div>
       <div className="flex gap-2">
         <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
           Join Meeting
         </button>
       </div>
     </div>
   </main>
 </div>

        </div>
        
    
    </div>
   
  )
}

export default Meetings
