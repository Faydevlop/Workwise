import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';

const UserActions = ({ userId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/admin/deleteuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('User deleted successfully', {
        autoClose: 2000,
        onClose: () => navigate('/admin/Usermanagment'),
      });
    } catch (error) {
      toast.error('Failed to delete user', { autoClose: 2000 });
    }
  };

  return (
    <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
      <Link to={`/admin/edituser/${userId}`}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Edit</button>
      </Link>
    </div>
  );
};

export default UserActions;
