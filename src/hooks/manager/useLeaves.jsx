import { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosConfig';

const useLeaves = (userId) => {
  const [leaves, setLeaves] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    const fetchLeaves = async () => {
      try {
        const response = await axiosInstance.get(`/leave/getleaves/${userId}`);
        setLeaves(response.data.leaves);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get(`/leave/managerleaveget/${userId}`);
        setRequests(response.data.leaves);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
    fetchRequests();

    const interval = setInterval(() => {
      fetchLeaves();
      fetchRequests();
    }, 5000);

    return () => clearInterval(interval);
  }, [userId]);

  return { leaves, requests, loading };
};

export default useLeaves;
