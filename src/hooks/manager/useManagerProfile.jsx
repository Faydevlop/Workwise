// src/hooks/useManagerProfile.js
import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';

const useManagerProfile = (userId) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
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

export default useManagerProfile;
