import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';

const usePayrollData = (userId) => {
  const [data, setData] = useState(null);
  const [bonuses, setBonuses] = useState('');
  const [deduction, setDeduction] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/payroll/showdata/${userId}`);
        setData(response.data.user);
      } catch (error) {
        toast.error('Error fetching payroll', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };
    fetchData();
  }, [userId]);

  return { data, bonuses, setBonuses, deduction, setDeduction };
};

export default usePayrollData;
