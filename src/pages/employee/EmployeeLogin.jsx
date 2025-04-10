import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoginAuth } from '../../features/employeeAuth';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import EmployeeLoginForm from '../../components/employee/forms/EmployeeLoginForm';

const EmployeeLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.employeeAuth);
  const [errors, setErrors] = useState({});
  const [errorVisible, setErrorVisible] = useState(false);

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
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      dispatch(LoginAuth({ email, password }))
        .unwrap()
        .then(() => {
          navigate('/employee/dashboard');
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <img src={logo} width={150} className="mx-auto bg-blue-700 rounded-3xl" alt="logo" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
          </div>
        </div>

        <EmployeeLoginForm
          email={email}
          password={password}
          errors={errors}
          error={errorVisible ? error : ''}
          onEmailChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: '' }));
          }}
          onPasswordChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: '' }));
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
};

export default EmployeeLogin;
