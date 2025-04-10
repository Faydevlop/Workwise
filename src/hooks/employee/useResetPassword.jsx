import { useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';

const useResetPassword = (userId) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sendResetLink = async (email) => {
    try {
      setLoading(true);
      await axiosInstance.post(`/employee/reqest-reset-password/${userId}`, { email });
      setIsModalOpen(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while sending the reset link.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendResetLink,
    loading,
    isModalOpen,
    setIsModalOpen
  };
};

export default useResetPassword;
