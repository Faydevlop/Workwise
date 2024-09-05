import React, { useEffect, useState } from 'react'
import HrSidebar from '../../../components/Sidebar/HrSidebar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {ScaleLoader  } from 'react-spinners'

const Detailview = () => {
  const {reqId} = useParams()
  const [list,setList] = useState(null)

  useEffect(()=>{
    const fetchdata = async()=>{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/jobs/listDetails/${reqId}`);
      setList(response.data.listDetail)
      console.log(response.data.listDetail);
      
    }
    fetchdata()
  },[])

  if (!list) {
    return <div> <ScaleLoader   /></div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <HrSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <HrSidebar />
      </div>

        <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>

        <div
  className="rounded-lg border bg-card text-card-foreground shadow-sm max-w-1xl mx-auto p-6 sm:p-8 md:p-10"
  data-v0-t="card"
>
  <div className="flex flex-col space-y-1.5 p-6">
    <h3 className="whitespace-nowrap tracking-tight text-3xl font-bold">Job Requester Details</h3>
  </div>
  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="grid gap-4">
      <div className="grid gap-2">
        <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" htmlFor="name">
          Name
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="name"
          disabled=""
          value={list?.name}
         />
      </div>
      <div className="grid gap-2">
        <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="email"
          disabled=""
          value={list?.email}
         />
      </div>
      <div className="grid gap-2">
        <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" htmlFor="phone">
          Phone
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="phone"
          disabled=""
          value={list?.phone}
         />
      </div>
      <div className="grid gap-2">
        <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" htmlFor="address">
          Address
        </label>
        <textarea
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="address"
          rows="3"
          disabled=""
          value={list?.address}
        >
          
        </textarea>
      </div>
      <div className="grid gap-2">
        <label
          className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
          htmlFor="qualifications"
        >
          Qualifications
        </label>
        <textarea
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="qualifications"
          rows="3"
          disabled=""
        >
          {list?.qualifications}
        </textarea>
      </div>
      <div className="grid gap-2">
        <label
          className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
          htmlFor="portfolio"
        >
          Portfolio
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="portfolio"
          disabled=""
          value={list?.portfolio}
         />
      </div>
      <div className="grid gap-2">
        <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" htmlFor="referrer">
          Referrer
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="referrer"
          disabled=""
          value={ list?.referer ? `${list.referer.firstName}${list.referer.lastName}` : 'Not available' }
         />
      </div>
      <div className="grid gap-2">
        <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" htmlFor="resume">
          Resume
        </label>
        
         
         
          
         <a href={list?.resume} target="_blank" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
         value>
            <button>
            show resume
            </button>
            </a>
      </div>
      <div className="grid gap-2">
        <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" htmlFor="job-id">
          Job title
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="job-id"
          disabled=""
          value={list?.jobId ? `${list?.jobId?.jobTitle}` : ''}
         />
      </div>
      <div className="grid gap-2">
        <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" htmlFor="status">
          Status
        </label>
        <button
          type="button"
          role="combobox"
          aria-controls="radix-:r2:"
          aria-expanded="false"
          aria-autocomplete="none"
          dir="ltr"
          data-state="closed"
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span style={{pointerEvents: "none"}}>{list.status}</span>
       
        </button>
      </div>
    </div>
    <div className="grid gap-4">
      <div className="bg-muted rounded-lg overflow-hidden">
        <img
          src={list?.resume}
          alt="Resume Preview"
          width="600"
          height="800"
          className="w-full h-auto"
          style={{aspectRatio: "600 / 800", objectFit: "cover"}}
         />
      </div>
    </div>
  </div>
</div>
                 
         
        </div>
        
    
    </div>
   
  )
}

export default Detailview
