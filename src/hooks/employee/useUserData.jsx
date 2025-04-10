import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useUserData = (userId) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/admin/getuser/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  return { user, loading };
};

export default useUserData;
