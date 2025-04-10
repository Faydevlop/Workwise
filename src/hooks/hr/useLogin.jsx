import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginAuth } from '../../features/hrAuthSlice';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [errorVisible, setErrorVisible] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { error, loading } = useSelector((state) => state.hrAuth);

  useEffect(() => {
    if (error) {
      setErrorVisible(true);
      const timer = setTimeout(() => {
        setErrorVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const validate = () => {
    const errors = {};
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(loginAuth({ email, password }))
        .unwrap()
        .then(() => {
          navigate('/hr/dashboard');
        });
    } else {
      setErrors(validationErrors);
    }
  };

  return {
    email, setEmail, password, setPassword, errors, handleSubmit, error, errorVisible, setErrors
  };
};

export default useLogin;
