import { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useEmployeePayroll = (userId) => {
  const [payrollData, setPayrollData] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchPayrollData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/payroll/userlist/${userId}`);
        setPayrollData(response.data.payroll);
      } catch (error) {
        console.error('Error fetching payroll data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollData();
  }, [userId]);

  return { payrollData, loading };
};

export default useEmployeePayroll;