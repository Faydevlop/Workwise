import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useLeaves = (userId) => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLeaves = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/leave/getleaves/${userId}`);
        setLeaves(response.data.leaves);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchLeaves();
    }
  }, [userId]);

  return { leaves, loading };
};

export default useLeaves;
