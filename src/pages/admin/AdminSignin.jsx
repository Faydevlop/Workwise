// src/pages/admin/AdminSignin.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useAdminRegister } from '../../hooks/admin/useAdminRegister';
import AdminForm from '../../components/admin/form/AdminForm';
import SocialLoginButtons from '../../components/admin/button/SocialLoginButtons';

const AdminSignin = () => {
  const {
    username, setUsername,
    email, setEmail,
    password, setPassword,
    errors, handleSubmit
  } = useAdminRegister();

  return (
    <main className="w-full flex">
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <img src={logo} width={400} alt="Logo" />
        </div>
        <div className="absolute inset-0 my-auto h-[730px]" style={{ background: "blue" }} />
      </div>

      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div>
            <img src="https://floatui.com/logo.svg" width={150} className="lg:hidden" alt="Mobile Logo" />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
              <p>
                Already have an account?{" "}
                <Link to="/admin/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Log in
                </Link>
              </p>
            </div>
          </div>

          <SocialLoginButtons />
          <AdminForm
            username={username}
            email={email}
            password={password}
            errors={errors}
            setUsername={setUsername}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
};

export default AdminSignin;
