import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

export const useJobListings = () => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/jobs/listitems');
      setListData(response.data.listingData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { listData, loading, fetchData };
};
