import React from 'react';
import useLogin from '../../hooks/hr/useLogin'; // Adjust the path based on your file structure
import logo from '../../assets/logo.png';

const Hrlogin = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    handleSubmit,
    error,
    errorVisible,
  } = useLogin();

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <img src={logo} width={150} className="mx-auto bg-blue-700 rounded-3xl" alt="logo" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
          </div>
        </div>
        <form className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
              }}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {errors.email && <div className="text-red-600">{errors.email}</div>}
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
              }}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {errors.password && <div className="text-red-600">{errors.password}</div>}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Sign in
          </button>
          {error && <div className="mt-4 text-red-600">{error}</div>}
        </form>
      </div>
    </main>
  );
};

export default Hrlogin;
