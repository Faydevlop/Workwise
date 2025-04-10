// src/hooks/useHrDashboardData.js
import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useHrDashboardData = (userId) => {
  const [meetings, setMeetings] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [leaves, setLeave] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/hr/dashboard/${userId}`);
      setMeetings(response.data.upcomingMeetings);
      setJobs(response.data.pendingReqeusts);
      setLeave(response.data.leaves);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return { meetings, jobs, leaves, error };
};

export default useHrDashboardData;
