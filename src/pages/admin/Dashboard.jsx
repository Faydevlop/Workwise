import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/Sidebar/AdminSidebar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AdminDashBoard = () => {
  const [leaves,setLeaves] = useState([])
  const [department,setDepartment] = useState([]);
  const [payroll,setPayroll] = useState([])
  const [projects,setProjects] = useState([])

  const fetchData = async()=>{
    try {

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/dashboard`)

      console.log(response.data);
      
      setLeaves(response.data.leaves)
      setDepartment(response.data.department)
      setPayroll(response.data.payroll)
      setProjects(response.data.projects)
      

      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchData()
  },[])


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      
       <div className="hidden lg:block" style={{ width: '250px' }}>
        
        <AdminSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <AdminSidebar />
      </div>
      

        <div  style={{ flex: 3, overflow: 'auto', marginLeft: '' }}>
          
          
                 
        
        <div className="flex min-h-screen flex-col bg-muted/40">
        <header className="sticky mb-5 mt-5 top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="space-y-1.5 p-6 bg-[#2F3849]  text-white border flex flex-row items-center justify-between pb-2">
          <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Pending Leave Approvals</h3>
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
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Employee
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Dates
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {
                  leaves.map((leave)=>(
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <div className="font-medium">{leave?.userId?.firstName}{leave?.userId?.lastName}</div>
                     
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                     
                      <div className="text-xs text-muted-foreground">{new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <Link to={`/admin/leavedetails/${leave._id}`} >
                  
                      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mr-2">
                        veiw
                      </button>
                      </Link>
                      
                    </td>
                  </tr>

                  ))
                }{
                  leaves.length == 0 ? (<p>No Pending Leave Approvals found</p>) : ''
                }
               
               
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="space-y-1.5 bg-[#2F3849]  text-white p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Department List</h3>
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div className="p-6">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Department
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {
                  department.map((dip)=>(
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <div className="font-medium">{dip.departmentName}</div>
                  </td>
                  <Link to={`/admin/department/${dip._id}`} >
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                      More Info
                    </button>
                  </td>
                  </Link>
                </tr>
                  ))
                }{
                  department.length == 0 ? (<p>No Department found</p>) : ''
                }
                
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="space-y-1.5 bg-[#2F3849]  text-white p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Payroll Details</h3>
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
            <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
          </svg>
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
                    Title
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Salary
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Bonus
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">

                {
                  payroll.map((pay)=>(
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <div className="font-medium">{pay?.employee?.firstName}{pay?.employee?.lastName}</div>
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{pay?.employee?.position}</td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">₹{pay?.permonthsalary}</td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">₹{pay?.bonuses}</td>
                  </tr>
                  ))
                }
                {
                  payroll.length == 0 ? (<p>No Payroll Data found</p>) : ''
                }
               
                
              </tbody>
            </table>
          </div>
        </div>2 
      </div>
    </div>
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div className="space-y-1.5 bg-[#2F3849]  text-white p-6 flex flex-row items-center justify-between pb-2">
        <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">Current Projects</h3>
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
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Project
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Description
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                 Department
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {
                projects.map((project)=>(
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <div className="font-medium">{project.name}</div>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                   {project.description}
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <div className="font-medium">{project?.department?.departmentName}</div>
                  </td>
                </tr>
                ))
              }{
                projects.length == 0 ? (<p>No Projects found</p>) : ''
              }
             
             
            </tbody>
          </table>
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
