// useDashboardData.js (custom hook)

import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useDashboardData = () => {
  const [meetings, setMeetings] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/employee/dashboard`);
      setMeetings(response.data.upcomingMeetings);
      setTasks(response.data.tasks);
      setPayroll(response.data.payrollData);
      setLeaves(response.data.leaveRequests);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { meetings, tasks, payroll, leaves };
};

export default useDashboardData;
