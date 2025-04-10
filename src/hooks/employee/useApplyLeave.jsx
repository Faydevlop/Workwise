
import { useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';

const useApplyLeave = () => {
  const [loading, setLoading] = useState(false);

  const applyLeave = async (leaveData, Toast, navigate) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/leave/applyLeave', leaveData);

      Toast.fire({
        icon: 'success',
        title: 'Leave applied successfully!',
        didClose: () => navigate('/employee/leave'),
      });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error applying leave. Please try again.';
      toast.error(errorMsg, {
        position: 'top-right',
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return { applyLeave, loading };
};

export default useApplyLeave;
