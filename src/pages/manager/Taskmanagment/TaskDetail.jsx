import React from 'react'

import ManagerSidebar from '../../../components/Sidebar/ManagerSidebar'

const TaskDetail = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <ManagerSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <ManagerSidebar />
      </div>

        <div className='bg-blue-50'  style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                 
          {/* section 1 */}
          {/*
// v0 by Vercel.
// https://v0.dev/t/m0FUGYVwwoC
*/}


<div className="grid gap-8 px-4 py-6 mx-auto max-w-6xl sm:px-6 lg:px-8">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-bold">Task Details</h1>
      <div
        className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
        data-v0-t="badge"
      >
        In Progress
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div
        aria-valuemax="100"
        aria-valuemin="0"
        role="progressbar"
        data-state="indeterminate"
        data-max="100"
        className="relative overflow-hidden w-full h-2 rounded-full bg-muted"
      >
        <div
          data-state="indeterminate"
          data-max="100"
          className="h-full w-full flex-1 bg-primary transition-all"
          style={{transform: "translateX(-100%)"}}
        ></div>
      </div>
    </div>
  </div>
  <div className="grid gap-8 md:grid-cols-[1fr_300px]">
    <div className='bg-white'>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Project Details</h3>
        </div>
        <div className="p-6 grid gap-4">
          <div className="grid gap-1">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="task-name"
            >
              Task Name
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="task-name"
              type="text"
              value="Implement new feature"
             />
          </div>
          <div className="grid gap-1">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="task-description"
            >
              Description
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="task-description"
              rows="3"
            >
              Add a new feature to the app that allows users to...
            </textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="task-status"
              >
                Status
              </label>
              <button
                type="button"
                role="combobox"
                aria-controls="radix-:r3a:"
                aria-expanded="false"
                aria-autocomplete="none"
                dir="ltr"
                data-state="closed"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span style={{pointerEvents: "none"}}>In Progress</span>
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
                  className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
            </div>
            <div className="grid gap-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="task-due-date"
              >
                Due Date
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="task-due-date"
                type="date"
                value="2023-06-30"
               />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="task-assigned-to"
              >
                Assigned To
              </label>
              <button
                type="button"
                role="combobox"
                aria-controls="radix-:r3b:"
                aria-expanded="false"
                aria-autocomplete="none"
                dir="ltr"
                data-state="closed"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span style={{pointerEvents: "none"}}>John Doe</span>
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
                  className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
            </div>
            <div className="grid gap-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="task-created-at"
              >
                Created At
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="task-created-at"
                readonly=""
                type="text"
                value="2023-04-15"
               />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='bg-white'>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Comments</h3>
        </div>
        <div className="p-6 grid gap-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-4">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img className="aspect-square h-full w-full" alt="John Doe" src="https://tailwindui.com/placeholder-user.jpg"  />
              </span>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">John Doe</div>
                  <div className="text-xs text-muted-foreground">2 days ago</div>
                </div>
                <p className="text-muted-foreground">
                  Great work on the new feature! I think it will really improve the user experience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img className="aspect-square h-full w-full" alt="Jane Smith" src="https://tailwindui.com/placeholder-user.jpg"  />
              </span>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Jane Smith</div>
                  <div className="text-xs text-muted-foreground">3 days ago</div>
                </div>
                <p className="text-muted-foreground">
                  I have a few suggestions for the new feature. Let's discuss them in our next meeting.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="new-comment"
            >
              Add a comment
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="new-comment"
              rows="3"
              placeholder="Write your comment here..."
            ></textarea>
            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


        </div>
        
    
    </div>
   
  )
}

export default TaskDetail
