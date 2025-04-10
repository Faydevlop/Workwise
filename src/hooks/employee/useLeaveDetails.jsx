// src/hooks/useLeaveDetails.js
import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useLeaveDetails = (leaveId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        const response = await axiosInstance.get(`/leave/getdetails/${leaveId}`);
        setData(response.data.leave);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (leaveId) {
      fetchLeaveDetails();
    }
  }, [leaveId]);

  return { data, loading, error };
};

export default useLeaveDetails;
