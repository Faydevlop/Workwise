import React, { useEffect, useState } from 'react'

import HrSidebar from '../../../components/Sidebar/HrSidebar'
import { useNavigate, useParams } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../config/axiosConfig';

const Payrolldettails = () => {
    const [data,setData] = useState(null)
    const [bonuses,setBonuses] = useState('')
    const [deduction,setDeduction] = useState('')
    const {userId} = useParams()
    const navigate = useNavigate()

    const fetchdata = async()=>{
       

        try {
            const response = await axiosInstance.get(`/payroll/showdata/${userId}`)
            setData(response.data.user)
            
          
            
        } catch (error) {
            toast.error('Error fetching payroll', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            
        }
    }

    useEffect(()=>{
        fetchdata()
    },[])

    const handleSubmit = async()=>{
        console.log(bonuses,deduction);
        
        try {

            const payrolldata = {
                deduction,
                bonuses
            }

            const response = await axiosInstance.post(`/payroll/addpay/${data.payroll._id}`,payrolldata);
            toast.success("payroll added successfully!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose:()=>navigate('/hr/payrollmanagement')
               
              });

            console.log(response.data.user);

        } catch (error) {
            toast.error('Error fetching payroll', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }

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
      <ToastContainer/>

        <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                 
          {/* section 1 */}
          
<div class="flex flex-col gap-8 bg-background p-6 sm:p-8 md:p-10">
  <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
    <div class="flex flex-col items-center gap-1 sm:items-start">
      <h1 class="text-2xl font-bold">Payroll Details</h1>
      <p class="text-muted-foreground">Edit employee payroll information</p>
    </div>
   
  </div>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
    <div class="flex flex-col space-y-1.5 p-6">
      <div class="flex items-center gap-4">
        <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <img class="aspect-square h-full w-full" alt="Employee Avatar" src="/placeholder.svg" />
        </span>
        <div class="flex flex-col">
          <h2 class="text-xl font-bold">{data ? `${data.firstName}${data.lastName}` : 'Not available'}</h2>
          <p class="text-muted-foreground">{data ? `${data.position}` : 'Not available'}</p>
        </div>
      </div>
    </div>
    <div class="p-6 grid gap-6">
      <div class="grid gap-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="salary"
        >
          Current Salary
        </label>
        <input
        disabled
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="salary"
          type="number"
          value={data?.payroll ? `${data.payroll.baseSalary}` : 'Not available'}
        />
      </div>
      <div class="grid gap-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="deduction"
        >
          bonus
        </label>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="deduction"
          type="number"
          value={bonuses}
          onChange={(e)=>setBonuses(e.target.value)}
        />
      </div>
      <div class="grid gap-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="deduction"
        >
          Deduction
        </label>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="deduction"
          type="number"
          value={deduction}
          onChange={(e)=>setDeduction(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} class="inline-flex bg-black text-stone-50 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
      Save
    </button>
    </div>
  </div>
</div>
          

        </div>
        
    
    </div>
   
  )
}

export default Payrolldettails
