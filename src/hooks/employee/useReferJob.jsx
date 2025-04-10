import { useState } from 'react';
import axiosInstance from '../../config/axiosConfig';

export const useReferJob = () => {
  const [loading, setLoading] = useState(false);

  const referCandidate = async (formData) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/jobs/referjob`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return { success: true, data: res.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { referCandidate, loading };
};
