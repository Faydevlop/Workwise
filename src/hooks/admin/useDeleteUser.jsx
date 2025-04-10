import axiosInstance from '../config/axiosConfig';
import { toast } from 'react-toastify';

const useDeleteUser = (setUsers) => {
  const deleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/admin/deleteuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success('User deleted successfully');
      setUsers(prev => prev.filter(user => user._id !== userId));

    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  return deleteUser;
};

export default useDeleteUser;
