import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/Sidebar/AdminSidebar';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../config/axiosConfig';

const AddPayroll = () => {
  const [users,setUsers] = useState([])
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    employeeId: '',
    payPeriodStart: '',
    payPeriodEnd: '',
    payPeriod: '',
    baseSalary: '',
    // bonus: '',
    // deductions: '',
    paymentStatus: 'Pending',
    paymentMethod: ''
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const fetchUsers = async()=>{
    try {
      const response = await axiosInstance.get(`/payroll/listEmpo`);
      setUsers(response.data.users)
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchUsers()
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axiosInstance.post(`/payroll/addpayroll`, formData);

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose:()=>navigate('/admin/Payrollmanagment')
       
      });
    } catch (error) {
    
      toast.error('Error submitting form', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.employeeId) errors.employeeId = 'Employee ID is required';
    if (!data.payPeriodStart) errors.payPeriodStart = 'Pay Period Start is required';
    if (!data.payPeriodEnd) errors.payPeriodEnd = 'Pay Period End is required';
    if (!data.payPeriod) errors.payPeriod = 'Pay Period is required';
    if (!data.baseSalary) errors.baseSalary = 'Base Salary is required';
    if (!data.paymentStatus) errors.paymentStatus = 'Payment Status is required';
    if (!data.paymentMethod) errors.paymentMethod = 'Payment Method is required';
    return errors;
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className="hidden lg:block" style={{ width: "250px" }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        <AdminSidebar />
      </div>
    <ToastContainer/>
      <div style={{ flex: 1, padding: "20px", overflow: "auto", marginLeft: "0" }}>
        <div className="border bg-card conte text-card-foreground w-full max-w-1xl rounded-lg shadow-lg">
          <div className="flex flex-col space-y-1.5 bg-primary text-primary-foreground p-6">
            <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Payroll</h3>
            <p className="text-sm text-muted-foreground">Add employee payroll details.</p>
          </div>
          <form  className="grid gap-6 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="employeeId">Select Employee</label>
                <select
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="flex h-10 w-full ring-offset-background border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <option value="" disabled>Select Employee</option>
                  {
                    users.map((user,index)=>(
                      <option key={index} value={user._id}>{user.firstName}{user.lastName}</option>
                    ))

                  }
                  
                  
                </select>
                {errors.employeeId && <p className="text-red-500">{errors.employeeId}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="payPeriodStart">Pay Period Start</label>
                <input
                  type="date"
                  id="payPeriodStart"
                  value={formData.payPeriodStart}
                  onChange={handleChange}
                  className="flex h-10 w-full ring-offset-background border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                {errors.payPeriodStart && <p className="text-red-500">{errors.payPeriodStart}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="payPeriodEnd">Pay Period End</label>
                <input
                  type="date"
                  id="payPeriodEnd"
                  value={formData.payPeriodEnd}
                  onChange={handleChange}
                  className="flex h-10 w-full ring-offset-background border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                {errors.payPeriodEnd && <p className="text-red-500">{errors.payPeriodEnd}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="payPeriod">Pay Period</label>
                
                <select
                  id="payPeriod"
                  value={formData.payPeriod}
                  onChange={handleChange}
                  className="flex h-10 w-full ring-offset-background border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <option value="" disabled>Select Payperiod</option>
                  {/* <option value="Weekly">Weekly</option>
                  <option value="Biweekly">Biweekly</option>
                  <option value="Semi-monthly">Semi-monthly</option> */}
                  <option value="Monthly">Monthly</option>
                </select>
                {errors.payPeriod && <p className="text-red-500">{errors.payPeriod}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="baseSalary">Base Salary</label>
                <input
                  type="number"
                  id="baseSalary"
                  value={formData.baseSalary}
                  onChange={handleChange}
                  placeholder="50000"
                  className="flex h-10 w-full ring-offset-background border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                {errors.baseSalary && <p className="text-red-500">{errors.baseSalary}</p>}
              </div>
              {/* <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="bonus">Bonus</label>
                <input
                  type="number"
                  id="bonus"
                  value={formData.bonus}
                  onChange={handleChange}
                  placeholder="5000"
                  className="flex h-10 w-full ring-offset-background border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                {errors.bonus && <p className="text-red-500">{errors.bonus}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="deductions">Deductions</label>
                <input
                  type="number"
                  id="deductions"
                  value={formData.deductions}
                  onChange={handleChange}
                  placeholder="1000"
                  className="flex h-10 w-full ring-offset-background border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                {errors.deductions && <p className="text-red-500">{errors.deductions}</p>}
              </div> */}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="paymentStatus">Payment Status</label>
                
                <select
                  id="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="flex h-10 w-full ring-offset-background border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <option value="Pending" >Pending</option>
                  {/* <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option> */}
                </select>
                {errors.paymentStatus && <p className="text-red-500">{errors.paymentStatus}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="paymentMethod">Payment Method</label>
                <select
                  id="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="flex h-10 w-full ring-offset-background border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <option value="" disabled>Select Payment Method</option>
                  <option value="bank-transfer">Direct Deposit</option>
                  <option value="check">Check</option>

                </select>
                {errors.paymentMethod && <p className="text-red-500">{errors.paymentMethod}</p>}
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Add Payroll
            </button>
            <button
              
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
             cancel 
            </button>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPayroll;
