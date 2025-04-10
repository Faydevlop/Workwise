import { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useEmployeeLeaves = (userId) => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchLeaves = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/leave/getleaves/${userId}`);
        setLeaves(res.data.leaves);
      } catch (err) {
        console.error('Error fetching leaves:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [userId]);

  return { leaves, loading };
};

export default useEmployeeLeaves;
