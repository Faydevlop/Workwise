import React, { useEffect, useState } from 'react'
import HrSidebar from '../../components/Sidebar/HrSidebar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NotificationBox from '../../components/notification/notificationBox'

const HrDashboard = () => {
  const [meetings,setMeetings]= useState([])
  const [jobs,setJobs] = useState([])
  const [leaves,setLeave] = useState([]) 
  

  const {hr} = useSelector((state)=>state.hrAuth)
  const userId = hr.hr._id

  const fetchData = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/hr/dashboard/${userId}`);
      console.log(response.data);
      setMeetings(response.data.upcomingMeetings)
      setJobs(response.data.pendingReqeusts)
      console.log(response.data.pendingReqeusts);
      
      setLeave(response.data.leaves)
      
     

      


    } catch (error) {
      console.log(error);
      
      
    }
  }

  useEffect(()=>{
    fetchData()
  },[])




  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <HrSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <HrSidebar />
      </div>

        <div style={{ flex: 1,overflow: 'auto', marginLeft: '0' }}>
        <header className="flex border bg-[#2F3849]   mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full  text-sm py-3">
  <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
    <a className="flex-none font-semibold text-xl  text-white focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
      Dashboard and Overview
    </a>
    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-start sm:mt-0 sm:ps-5">
     
     
    </div>
  </nav>
</header>
       
<div className="flex flex-col w-full min-h-screen bg-muted/40">
  <header className="sticky mt-5 mb-5 top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
    <nav aria-label="breadcrumb" className="hidden md:flex">
      <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
        <li className="inline-flex items-center gap-1.5"></li>
        <li aria-hidden="true" className="[&>svg]:size-3.5" role="presentation">
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
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span aria-current="page" aria-disabled="true" className="font-normal text-foreground" role="link">
            HR Dashboard
          </span>
        </li>
      </ol>
    </nav>
   
  </header>
  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 bg-blue-100   p-6 px-7">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Pending Job Vacancy Requests
          </h3>
          <p className="text-sm text-muted-foreground">Review and manage pending</p>
        </div>
        <div className="p-6">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Position
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Contact
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {
                  jobs.map((job)=>(
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">{job.name}</td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{job.email}</td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <div
                        className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                        data-v0-t="badge"
                      >
                        {job.status}
                      </div>
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"></td>
                  </tr>
                 

                  ))
                }
              
               
              </tbody>
            </table>
            {
                  jobs.length === 0 ? (<p className='text-center'>'No Reqestes Here'</p>) : ''
                }
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col bg-blue-100  space-y-1.5 p-6 px-7">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Upcoming Meetings</h3>
          <p className="text-sm text-muted-foreground">View and manage your upcoming meetings.</p>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {
              meetings.map((meet,index)=>(
                <div key={index} className="flex items-center justify-between">
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
            
           
           
          </div>
          {
                  meetings.length === 0 ? (<p className='text-center'>No Meetings Scheduled</p>) : ''
                }
          
        </div>

        
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col bg-blue-100 space-y-1.5 p-6 px-7">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Pending Leave Approvals
          </h3>
          <p className="text-sm text-muted-foreground">Review and approve pending leave requests.</p>
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
                    Leave Dates
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {
                  leaves.map((leave,index)=>(
                    <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">{leave?.userId?.firstName}{leave?.userId?.lastName}</td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <div
                        className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                        data-v0-t="badge"
                      >
                       {leave.status}
                      </div>
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"></td>
                  </tr>
                  ))
                }
             
                
              </tbody>
            </table>
            {
                  leaves.length === 0 ? (<p className='text-center'>No Leave Reqests</p>) : ''
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

export default HrDashboard
