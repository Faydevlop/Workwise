import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

export const useJobApplications = () => {
  const [showData, setShowData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/jobs/listJob');
      setShowData(response.data.listData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return { showData, loading, fetchList };
};
