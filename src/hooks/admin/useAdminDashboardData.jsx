
import { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useAdminDashboardData = () => {
  const [leaves, setLeaves] = useState([]);
  const [department, setDepartment] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/admin/dashboard');
        setLeaves(response.data.leaves || []);
        setDepartment(response.data.department || []);
        setPayroll(response.data.payroll || []);
        setProjects(response.data.projects || []);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return { leaves, department, payroll, projects };
};

export default useAdminDashboardData;
