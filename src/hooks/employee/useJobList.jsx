import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useJobList = () => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobList = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/jobs/listitems`);
      setListData(response.data.listingData);
    } catch (error) {
      console.error("Failed to fetch job listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobList(); 
  }, []);

  return { listData, loading };
};

export default useJobList;
