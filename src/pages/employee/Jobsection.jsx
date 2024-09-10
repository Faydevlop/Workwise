import React, { useEffect, useState } from 'react'
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';

const Jobsection = () => {
    const [listData,setListData] = useState([])
    const [loading ,setLoading] = useState(false)

    const fetchdata = async()=>{
      setLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/listitems`);
            setListData(response.data.listingData)
            console.log(response.data.listingData);
            
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
                 
          {/* section 1 */}
        
 
  <main className="flex-1 py-12">
    <div className="container grid gap-8 px-4 md:px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Current Job Openings</h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
          Check out the latest job opportunities and refer your friends!
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {
            listData.length == 0 ? (<p>No Job Listings...</p>) : ''
        }

       {
        listData.map((data)=>( <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="p-6 grid gap-4">
              <div>
                <h3 className="text-xl font-semibold">{data.jobTitle}</h3>
                <p className="text-muted-foreground">{data.jobDescription}</p>
                <p className="text-muted-foreground">Application Deadline :{new Date(data.applicationDeadline).toLocaleDateString()   }</p>
              </div>
              <div className="flex items-center gap-2">
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
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-sm text-muted-foreground">{data.location}</span>
              </div>
              <Link to={`/employee/jobs/refer/${data._id}`}>
                   <button className="inline-flex items-center bg-black text-white justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3">
                Refer a Friend
              </button>
              </Link>
           
            </div>
            
          </div>))
       }
       
       
      </div>
    </div>
  </main>

         

        </div>
        
    
    </div>
   
  )
}

export default Jobsection
