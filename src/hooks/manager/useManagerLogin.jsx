import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAuth } from '../../features/managerAuth';

const useManagerLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    try {
      await dispatch(loginAuth({ email, password })).unwrap();
      navigate('/manager/dashboard');
    } catch (err) {
      throw err; // Let the component handle showing the error
    }
  };

  return { login };
};

export default useManagerLogin;
