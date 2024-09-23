import React, { useEffect, useState } from 'react'
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar'
import axios from 'axios'
import { useSelector } from 'react-redux';
import NotificationBox from '../../components/notification/notificationBox';

const EmployeeDashboard = () => {

  const [meetings,setMeetings] = useState([])
  const [tasks,setTasks] = useState([])
  const [payroll,setPayroll] = useState([])
  const [leaves,setLeaves] = useState([])

  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee.user._id

  const fetchData = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/employee/dashboard/${userId}`);
      console.log(response.data);
      setMeetings(response.data.upcomingMeetings)
      setTasks(response.data.tasks)
      setPayroll(response.data.payrollData)
      setLeaves(response.data.leaveRequests)

      


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
        <EmployeeSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <EmployeeSidebar />
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Upcoming Meetings</h3>
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
            className="w-4 h-4 text-muted-foreground"
          >
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
          </svg>
        </div>
        <div className="p-6">
          <div className="grid gap-2">
            {
              meetings.map((meet)=>(
                <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{meet.meetingName}</p>
                  <p className="text-xs text-muted-foreground">{(new Date(meet.date).toLocaleDateString())},{meet.time}</p>
                </div>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  {meet.status}
                </button>
              </div>
              ))
            }

            {
              meetings.length == 0 ? (<p>No Meetings Scheduled</p>) : ""
            }
         
            
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Tasks</h3>
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
            className="w-4 h-4 text-muted-foreground"
          >
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </div>
        <div className="p-6">
          <div className="grid gap-2">
            {
              tasks.map((task,index)=>(
               
                <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{task.name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                <div
                  className="inline-flex w-fit items-center whitespace-nowrap rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 text-xs"
                  data-v0-t="badge"
                >
                 {task.status}
                </div>
              </div>
                
                
              ))
            }
           
           
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Payroll Info</h3>
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
            className="w-4 h-4 text-muted-foreground"
          >
            <line x1="12" x2="12" y1="2" y2="22"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div className="p-6">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Base Salary</p>
                <p className="text-xs text-muted-foreground">{payroll[0]?.permonthsalary} / month</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{payroll[0]?.permonthsalary}</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Bonus</p>
                <p className="text-xs text-muted-foreground">Quarterly performance</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{payroll[0]?.bonuses}</p>
                <p className="text-xs text-muted-foreground">This quarter</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Deductions</p>
                {/* <p className="text-xs text-muted-foreground">Health insurance, 401(k)</p> */}
              </div>
              <div className="text-right">
                <p className="font-medium">₹{payroll[0]?.deductions}</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Leave Requests</h3>
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
            className="w-4 h-4 text-muted-foreground"
          >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            <rect width="20" height="14" x="2" y="6" rx="2"></rect>
          </svg>
        </div>
        <div className="p-6">
          <div className="grid gap-2">
            {
              leaves.map((leave)=>(
                <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{leave.leaveType}</p>
                  <p className="text-xs text-muted-foreground">{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</p>
                </div>
                <div
                  className="inline-flex w-fit items-center whitespace-nowrap rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 text-xs"
                  data-v0-t="badge"
                >
                  {leave.status}
                </div>
              </div>
              ))
            }
           
           
          </div>
        </div>
      </div>
    </div>
  </main>
  <NotificationBox userId={userId} />
</div>

        </div>
        
    
    </div>
   
  )
}

export default EmployeeDashboard
