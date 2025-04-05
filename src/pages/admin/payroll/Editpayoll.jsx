import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/Sidebar/AdminSidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../config/axiosConfig';

const EditPayroll = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { payrollId } = useParams();  // Get payroll ID from URL parameters
  const [formData, setFormData] = useState({
    employeeId: '',
    payPeriodStart: '',
    payPeriodEnd: '',
    payPeriod: '',
    baseSalary: '',
    paymentStatus: 'Pending',
    paymentMethod: ''
  });

  const [errors, setErrors] = useState({});

  const fetchPayrollDetails = async () => {
    try {
      const response = await axiosInstance.get(`/payroll/listdetails/${payrollId}`);
      const payrollData = response.data.employee;
      
      const formattedPayPeriodStart = payrollData.payPeriodStart.slice(0, 10);
      const formattedPayPeriodEnd = payrollData.payPeriodEnd.slice(0, 10);

      // Pre-fill form data with payroll details including the employee's ID
      setFormData({
        employeeId: payrollData.employee, // Assuming payrollData contains employeeId object with _id field
        payPeriodStart: formattedPayPeriodStart,
        payPeriodEnd: formattedPayPeriodEnd,
        payPeriod: payrollData.payPeriod,
        baseSalary: payrollData.baseSalary,
        paymentStatus: payrollData.paymentStatus || 'Pending',
        paymentMethod: payrollData.paymentMethod
      });
    } catch (error) {
      console.error('Error fetching payroll details', error);
    }
  };

  useEffect(() => {
    fetchPayrollDetails();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('here is the upcomig data',formData);
    

    try {
      const response = await axiosInstance.post(`/payroll/updatepayroll/${payrollId}`, formData);

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => navigate('/admin/Payrollmanagment')
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
      <ToastContainer />
      <div style={{ flex: 1, padding: "20px", overflow: "auto", marginLeft: "0" }}>
        <div className="border bg-card conte text-card-foreground w-full max-w-1xl rounded-lg shadow-lg">
          <div className="flex flex-col space-y-1.5 bg-primary text-primary-foreground p-6">
            <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Edit Payroll</h3>
            <p className="text-sm text-muted-foreground">Update employee payroll details.</p>
          </div>
          <form className="grid gap-6 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="employeeId">Select Employee</label>
                <input
                  type="text"
                  id="employeeId"
                  value={formData.employeeId ? `${formData.employeeId.firstName} ${formData.employeeId.lastName}` : 'Not Available'}
                  disabled
                  className="flex h-10 w-full ring-offset-background border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
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
                  <option value="" disabled>Select Pay Period</option>
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
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="paymentStatus">Payment Status</label>
                <select
                  id="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="flex h-10 w-full ring-offset-background border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <option value="" disabled>Select Payment Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
                {errors.paymentStatus && <p className="text-red-500">{errors.paymentStatus}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="paymentMethod">Payment Method</label>
                <input
                  type="text"
                  id="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  placeholder="e.g., Bank Transfer"
                  className="flex h-10 w-full ring-offset-background border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                {errors.paymentMethod && <p className="text-red-500">{errors.paymentMethod}</p>}
              </div>
            </div>
            <div className="space-y-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 text-black bg-primary rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Update Payroll
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPayroll;
