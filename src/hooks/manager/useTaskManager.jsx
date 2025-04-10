import { useState, useCallback } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';

const useTaskManager = (userId) => {
  const [projectData, setProjectData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjectAndTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/admin/projectlist/${userId}`);
      setProjectData(response.data.projectDetails);
      setTasks(response.data.tasks);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const deleteTask = useCallback(async (taskId) => {
    try {
      const response = await axiosInstance.post(`/task/deletetask/${taskId}`);
      toast.success('Task Deleted successfully', {
        position: "top-center",
        autoClose: 1500,
      });
      await fetchProjectAndTasks();
    } catch (error) {
      toast.error('Error deleting task', {
        position: "top-center",
        autoClose: 1500,
      });
    }
  }, [fetchProjectAndTasks]);

  return {
    projectData,
    tasks,
    loading,
    fetchProjectAndTasks,
    deleteTask
  };
};

export default useTaskManager;
