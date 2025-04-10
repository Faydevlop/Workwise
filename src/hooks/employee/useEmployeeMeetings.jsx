
import { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useEmployeeMeetings = (userId) => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/meeting/listmeeting/${userId}/employee`);
      setListData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMeetings();
    }
  }, [userId]);

  return { listData, loading };
};

export default useEmployeeMeetings;
