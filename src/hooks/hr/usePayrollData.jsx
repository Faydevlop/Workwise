import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

const usePayrollData = () => {
  const [data, setData] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/payroll/hrlist');
      setData(response.data.payroll);
    } catch (error) {
      console.error("Error fetching payroll data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchViewData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/payroll/viewlist');
      setListData(response.data.listView);
    } catch (error) {
      console.error("Error fetching view data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchViewData();
  }, []);

  return { data, listData, loading };
};

export default usePayrollData;
