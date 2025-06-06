import React, { useEffect, useState } from 'react'

import ManagerSidebar from '../../components/Sidebar/ManagerSidebar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import NotificationBox from '../../components/notification/notificationBox'
import axiosInstance from '../../config/axiosConfig'
import useManagerDashboardData from '../../hooks/manager/useManagerDashboardData'

const ManagerDashboard = () => {
  const { manager } = useSelector((state) => state.managerAuth)
  const userId = manager?.manager?._id

  const { meetings, projects, leaves, loading, error } = useManagerDashboardData(userId)

  if (loading) return <p className="p-5">Loading dashboard...</p>
  if (error) return <p className="p-5 text-red-500">Failed to load dashboard data.</p>

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <ManagerSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <ManagerSidebar />
      </div>

        <div style={{ flex: 1, padding: '', overflow: 'auto', marginLeft: '0' }}>
        <header className="flex border bg-[#2F3849]   mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full  text-sm py-3">
  <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
    <a className="flex-none font-semibold text-xl  text-white focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
      Dashboard and Overview
    </a>
    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
     
     
    </div>
  </nav>
</header>
                 
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
  <header className="sticky mb-5 top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
    <nav aria-label="breadcrumb" className="hidden md:flex">
      <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
        <li className="inline-flex items-center gap-1.5"></li>
      </ol>
    </nav>
    <div className="relative ml-auto flex-1 md:grow-0">
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
        className="lucide lucide-search absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
      <input
        className="flex h-10 border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        placeholder="Search..."
        type="search"
       />
    </div>
  </header>
  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
             Leave Requests
          </h3>
        </div>
        <div className="p-6">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Employee
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Request Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">

                {
                  leaves.slice().reverse().map((leave,index)=>(
                    <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{leave?.userId?.firstName}{leave?.userId?.lastName}</td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <div
                        className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                        data-v0-t="badge"
                      >
                        {leave.status}
                      </div>
                    </td>
                  </tr>
                  ))
                }{
                  leaves.length === 0 ? (<p>No leaves Reqests</p>) : ''
                }
               
              
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Project List</h3>
        </div>
        <div className="p-6">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Task
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Status
                  </th>
                
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {
                  projects.slice().reverse().map((project)=>(
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{project?.name}</td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <div
                        className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        data-v0-t="badge"
                      >
                        {project?.status}
                      </div>
                    </td>
                  
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{new Date(project.endDate).toLocaleDateString()}</td>
                  </tr>
                  ))
                }{
                  projects.length === 0 ? (<p>No projects Assigned</p>) : ''
                }


               
               
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 p-6 px-7">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Upcoming Meetings</h3>
          <p className="text-sm text-muted-foreground">View and manage your upcoming meetings.</p>
        </div>
        <div className="p-6">
        <div className="grid gap-4">
          {
            meetings.slice().reverse().map((meet)=>(
              <div className="flex items-center justify-between">
              <div className="grid gap-1">
                <p className="text-sm font-medium">{meet.meetingName}</p>
                <p className="text-sm text-muted-foreground">{new Date(meet.date).toLocaleDateString()},{meet.time}</p>
              </div>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                {meet.status}
              </button>
            </div>
              
            ))
          }
          {
            meetings.length === 0 ? (<p>No Meeings Scheduled</p>) : ''
          }
         
           
           
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

        </div>
        <NotificationBox userId={userId} />
        
    
    </div>
   
  )
}

export default ManagerDashboard
