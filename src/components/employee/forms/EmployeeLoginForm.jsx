import React from 'react';

const EmployeeLoginForm = ({
  email,
  password,
  errors,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <form className="mt-8 space-y-5">
      <div>
        <label className="font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={onEmailChange}
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
          onChange={onPasswordChange}
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
        {errors.password && <div className="text-red-600">{errors.password}</div>}
      </div>
      <button
        onClick={onSubmit}
        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
      >
        Sign in
      </button>
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </form>
  );
};

export default EmployeeLoginForm;