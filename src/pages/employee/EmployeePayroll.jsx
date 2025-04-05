import React, { useEffect, useState } from 'react'
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar'
import axios from 'axios'
import { useSelector } from 'react-redux';

import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import NotificationBox from '../../components/notification/notificationBox';
import axiosInstance from '../../config/axiosConfig';

const EmployeePayroll = () => {
  const [data,setDate] = useState('');
  const [loading ,setLoading] = useState(false)

  const { employee } = useSelector((state) => state.employeeAuth);


  const userId = employee.user._id

  useEffect(()=>{
    setLoading(true)

    const fetchdata = async()=>{
      try {
        const useDate = await axiosInstance.get(`/payroll/userlist/${userId}`);
        setDate(useDate.data.payroll)
        console.log(useDate.data.payroll);
        

      } catch (error) {
        
      }finally{
        setLoading(false)
      }
      
    }

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

          
   
  
  {
    data.length == 0 ? (<p className='text-center'>No Payroll Data Found</p>) : (<><header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Payroll</h1>
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
    <main className="flex-1 bg-background p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Gross Pay</h3>
        </div>
        <div className="p-6">
          <div className="text-4xl font-bold">{data.baseSalary}</div>
          <div className="text-sm text-muted-foreground">Base salary</div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Deduction & bonuses</h3>
        </div>
        <div className="p-6">
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span>Deduction</span>
              <span>{data.deductions}</span>
            </div>
            <div className="flex justify-between">
              <span>Bounses</span>
              <span>{data.bonuses}</span>
            </div>
            
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Current Month Pay</h3>
        </div>
        <div className="p-6">
          <div className="text-4xl font-bold">{data.permonthsalary}</div>
        </div>
      </div>
     
    </main></>)
  }
  <NotificationBox userId={userId} />

      
        </div>
        
    
    </div>
   
  )
}

export default EmployeePayroll
