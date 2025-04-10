// src/hooks/useAdminRegister.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAuth } from '../../features/adminAuthSlice';
import { useNavigate } from 'react-router-dom';

export const useAdminRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!username) errors.username = 'Username is required';
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
      dispatch(registerAuth({ username, email, password }))
        .unwrap()
        .then(() => navigate('/admin/dashboard'))
        .catch(() => {});
    } else {
      setErrors(validationErrors);
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    handleSubmit,
  };
};
