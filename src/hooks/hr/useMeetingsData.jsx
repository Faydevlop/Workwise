import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useMeetingsData = (userId) => {
  const [listdata, setListdata] = useState([]);
  const [listnext, setListnext] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/meeting/listmeeting/${userId}`);
      setListdata(response.data.listData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextMeetings = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/meeting/nextmeet`);
      setListnext(response.data.upcomingMeetings);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchNextMeetings();
  }, [userId]);

  return { listdata, listnext, loading, fetchData, fetchNextMeetings };
};

export default useMeetingsData;
