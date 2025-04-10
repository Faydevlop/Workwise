import { useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';

const useResetPasswordRequest = () => {
  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const requestResetPassword = async (userId, email) => {
    setLoading(true);
    try {
      await axiosInstance.post(`/employee/reqest-reset-password/${userId}`, { email });
      setSuccessModalOpen(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while sending the reset link.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    successModalOpen,
    setSuccessModalOpen,
    requestResetPassword,
  };
};

export default useResetPasswordRequest;
