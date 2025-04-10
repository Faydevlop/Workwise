import { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/department/list');
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await axiosInstance.post(`/department/delete/${id}`);
      setDepartments((prev) => prev.filter(dep => dep._id !== id));
      return { success: true };
    } catch (error) {
      console.error("Error deleting department", error);
      return { success: false };
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return { departments, loading, deleteDepartment };
};

export default useDepartments;
