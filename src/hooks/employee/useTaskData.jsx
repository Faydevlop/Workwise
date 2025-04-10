import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useTaskData = (userId) => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/task/listtasks/${userId}`);
        const fetchedTasks = response.data;

        if (!fetchedTasks) {
          throw new Error("No tasks found");
        }

        const tasksByStatus = { todo: [], inProgress: [], done: [] };

        fetchedTasks.forEach((task) => {
          switch (task.status) {
            case "Pending":
              tasksByStatus.todo.push(task);
              break;
            case "InProgress":
              tasksByStatus.inProgress.push(task);
              break;
            case "Completed":
              tasksByStatus.done.push(task);
              break;
            default:
              break;
          }
        });

        setTasks(tasksByStatus);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [userId]);

  return { tasks, loading, setTasks };
};

export default useTaskData;
