import { toast } from 'react-toastify';
import axiosInstance from '../../config/axiosConfig';

const useDeleteMeeting = (fetchData) => {
  const handleDelete = async (meetingId) => {
    try {
      const response = await axiosInstance.post(`/meeting/deletemeeting/${meetingId}`);
      toast.success("Meeting deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchData();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while deleting the meeting.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return { handleDelete };
};

export default useDeleteMeeting;
