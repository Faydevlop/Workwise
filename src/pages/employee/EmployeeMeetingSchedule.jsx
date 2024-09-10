import React, { useEffect, useState } from 'react'
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar'
import axios from 'axios'
import { useSelector } from 'react-redux'

import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';

const EmployeeMeetingSchedule = () => {
  const [listData,setListData] = useState([])
  const [loading ,setLoading] = useState(false)

  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee.user._id

  const fetchdata = async()=>{
    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/meeting/listmeeting/${userId}/employee`);
      setListData(response.data.data)
      console.log(response.data.data)

    } catch (error) {
      
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchdata()
  },[])
  



  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <EmployeeSidebar />
      </div>

        <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                 
          {/* section 1 */}
          <div className="flex flex-col min-h-screen">
  <header className="bg-primary bg-[#2F3849] text-primary-foreground py-4 px-6 flex items-center justify-between">
    <a className="flex items-center gap-2" href="/">
      
       
      <span className="text-xl text-white">Meetings List</span>
    </a>
    {/* <nav className="hidden md:flex items-center gap-6">
      <a className="text-sm font-medium hover:underline" href="/">
        Dashboard
      </a>
      <a className="text-sm font-medium hover:underline" href="/">
        Employees
      </a>
      <a className="text-sm font-medium hover:underline" href="/">
        Meetings
      </a>
      <a className="text-sm font-medium hover:underline" href="/">
        Settings
      </a>
    </nav> */}
   
  </header>
  <Backdrop
  sx={{
    color: '#fff',
    
    zIndex: (theme) => theme.zIndex.drawer + 1,
  }}
  open={loading}
>
  <ScaleLoader
    color="#ffffff" // Adjust the spinner color
    height={35}     // Adjust the height
    width={4}       // Adjust the width
    radius={2}      // Adjust the radius
    margin={2}      // Adjust the margin between spinners
  />
</Backdrop>
  <main className="flex-1 p-6">
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Upcoming Meetings</h3>
        <p className="text-sm text-muted-foreground">View and manage your upcoming meetings.</p>
      </div>
      <div className="p-6">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Meeting Name
                </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Topic
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Date
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Time
                </th>
                
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Attendees
                </th>
                
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  status
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
           
             {
              listData.map((list)=>(
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{list.meetingName}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{list.topic}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{new Date(list.date).toLocaleDateString()}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{list.time}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div className="flex items-center gap-2">
                   
                    {
                      list.participants.map((user)=>(
                        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <img className="aspect-square h-full w-full" src="https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg?ct=jpeg"  />
                    </span>
                      ))
                    }

                  </div>
                </td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  {
                    list.status == 'ongoing' ? (
                      <a className="inline-flex items-center gap-2" href={list.link}>
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
                      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                      <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                    </svg>
                    Join
                  </a>
                    ) : (<p className='' >scheduled</p>)
                  }
                </td>
              </tr>
              ))
             }
              
            </tbody>
          </table>
          {
                listData.length === 0 ? (<p className='text-center m-2' >No Meeting Schedules</p> ) : ''
              }
             
        </div>
      </div>
    </div>
  </main>
</div>
        
        </div>
        
    
    </div>
   
  )
}

export default EmployeeMeetingSchedule
