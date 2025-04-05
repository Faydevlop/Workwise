import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../config/axiosConfig";

const PayrollDetails = () => {
  const {payrollId} = useParams()
  const [data,setData] = useState('')

  const fetchdetails = async()=>{
    try {
      const response = await axiosInstance.get(`/payroll/listdetails/${payrollId}`)
      setData(response.data.employee)
      console.log(response.data);
      
     
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
  fetchdetails()
  },[])


  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className="hidden lg:block" style={{ width: "250px" }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <AdminSidebar />
      </div>
   

      <div
        style={{ flex: 1, padding: "20px", overflow: "auto", marginLeft: "0" }}
      >
        <div className="flex flex-col min-h-screen">
          <header className="sticky bg-white top-0 z-10 bg-background border-b">
            <div className="container max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <nav aria-label="breadcrumb">
                  <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                    <li className="inline-flex items-center gap-1.5">Dashboard</li>
                    <li
                      aria-hidden="true"
                      className="[&>svg]:size-3.5"
                      role="presentation"
                    >
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
                    <li className="inline-flex items-center gap-1.5">Payroll Management</li>
                    
                    <li
                      aria-hidden="true"
                      className="[&>svg]:size-3.5"
                      role="presentation"
                    >
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
                    
                      <span
                        aria-current="page"
                        aria-disabled="true"
                        className="font-normal text-foreground"
                        role="link"
                      >
                        Payroll Details
                      </span>
                      
                    </li>
                  </ol>
                </nav>
              </div>
              <h1 className="text-2xl font-bold">Payroll Details</h1>
            </div>
          </header>
          <main className="flex-1 container max-w-6xl mx-auto px-4 md:px-6 py-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center gap-6">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="aspect-square h-full w-full"
                    alt="Employee Avatar"
                    src={ data?.employee?.profileImageUrl ? data?.employee?.profileImageUrl : "https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"}
                  />
                </span>
                <div className="grid gap-2">
                  <div className="text-2xl font-bold">{data.employee ? `${data.employee.firstName}${data.employee.firstName}` : 'Not available'}</div>
                  {/* <div className="text-muted-foreground">
                    <span className="font-medium">Employee ID:</span> 12345
                  </div> */}
                  {/* <div className="text-muted-foreground">
                    <span className="font-medium">Department:</span> {data.employee ? `${data.employee.firstName}` : 'Not available'}
                  </div> */}
                  <div className="text-muted-foreground">
                    <span className="font-medium">Job Title:</span> {data.employee ? `${data.employee.position}` : 'Not available'}
                    
                  </div>
                  <div className="text-muted-foreground">
                    <span className="font-medium">Contact:</span>{" "}
                    {data.employee ? `${data.employee.email}` : 'Not available'}
                  </div>
                </div>
              </div>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <Link to={`/admin/Payrollmanagment/details/export/${data._id}`}>
                <button className="inline-flex p-5 m-4 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" x2="12" y1="15" y2="3"></line>
                </svg>
                Export
              </button>
              </Link>
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                    Payroll Summary
                  </h3>
                 
                  <p className="text-sm text-muted-foreground">June 2023</p>
                </div>
                <div className="p-6 grid gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Base Salary</span>
                    <span className="font-medium">₹{data.baseSalary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Deductions</span>
                    <span className="font-medium">₹{data.deductions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">bonuses</span>
                    <span className="font-medium">₹{data.bonuses}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Payment Status
                    </span>
                    <div
                      className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      data-v0-t="badge"
                    >
                      {data.paymentStatus}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                    Payroll Details
                  </h3>
                </div>
                <div className="p-6">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                            Component
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                            Base Salary
                          </td>
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          ₹{data.baseSalary}
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          deductions
                          </td>
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          ₹{data.deductions}
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                            Bonus
                          </td>
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          ₹{data.bonuses}
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                            total amount
                          </td>
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          ₹{data.totalAmount}
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                            Permonth salary
                          </td>
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          ₹{data.permonthsalary}
                          </td>
                        </tr>
                      
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PayrollDetails;
