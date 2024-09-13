import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../components/Sidebar/AdminSidebar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import logo from '../../../assets/Screenshot 2024-08-04 184513.png'

const PaySlipPage = () => {
    const {payrollId} = useParams()
    const [data,setData] = useState('')
  
    const fetchdetails = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/payroll/listdetails/${payrollId}`)
        setData(response.data.employee)
        console.log(response.data.employee);
        
       
        
      } catch (error) {
        
      }
    }
  
    useEffect(()=>{
    fetchdetails()
    },[])

    const handlePrint = () => {
        // Hide the sidebar and print button
        const sidebar = document.querySelector('.sidebar')
        const printButton = document.querySelector('.print-button')
        if (sidebar) sidebar.style.display = 'none'
        if (printButton) printButton.style.display = 'none'
    
        // Print the document
        window.print()
    
        // Restore the sidebar and print button after printing
        if (sidebar) sidebar.style.display = ''
        if (printButton) printButton.style.display = ''
      }
    
  return (
    <div  className=' mt-10 '>
    <div className="bg-blue-50 shadow-md w-full rounded-lg p-8 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <img
            src={logo}
            alt="Company Logo"
            width="100"
            
            height="100"
            className="w-20 rounded-full h-20"
            style={{ aspectRatio: "100 / 100", objectFit: "cover" }}
          />
          <h1 className='ml-1 mt-1 font-bold'>WorkWise</h1>
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-bold">Payslip</h1>
          <p className="text-muted-foreground">Pay Period: {(new Date(data.payPeriodStart).toLocaleDateString())} - {(new Date(data.payPeriodEnd).toLocaleDateString())}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Employee Details</h2>
          <div className="space-y-2">
            <div>
              <p className="text-muted-foreground">Name:</p>
              <p>{data.employee ? `${data.employee.firstName}${data.employee.lastName}`: ''}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Employee ID:</p>
              <p>{data.employee ? `${data.employee._id}`: ''}</p>
            </div>
            {/* <div>
              <p className="text-muted-foreground">Department:</p>
              <p>Engineering</p>
            </div> */}
            <div>
              <p className="text-muted-foreground">Position:</p>
              <p>{data.employee ? `${data.employee.position}`: ''}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Earnings</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Base Pay</p>
              <p>₹{data.baseSalary}</p>
            </div>
            <div className="flex justify-between">
              <p>Duductions</p>
              <p>₹{data.deductions}</p>
            </div>
            <div className="flex justify-between">
              <p>Bonus</p>
              <p>₹{data.bonuses}</p>
            </div>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
            <div className="flex justify-between font-semibold">
              <p>Gross Pay</p>
              <p>₹{data.permonthsalary}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Deductions</h2>
          <div className="space-y-2">
            
            {/* <div className="flex justify-between">
              <p>Health Insurance</p>
              <p>$200.00</p>
            </div> */}
            <div className="flex justify-between">
              <p>Other deductions</p>
              <p>₹{data.deductions}</p>
            </div>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
            <div className="flex justify-between font-semibold">
              <p>Total Deductions</p>
              <p>₹{data.deductions}</p>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-semibold">Net Pay</p>
            <p className="text-2xl font-bold">₹{data.permonthsalary - data.deductions}</p>
          </div>
         
        </div>
        <button onClick={handlePrint} className="inline-flex w-full bg-black text-white  items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" x2="12" y1="15" y2="3"></line>
                </svg>
                Export
              </button>
      </div>
      
      
    </div>
    
  </div>
   
  )
}

export default PaySlipPage
