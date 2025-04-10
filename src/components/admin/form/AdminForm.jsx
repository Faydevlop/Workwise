// src/components/admin/AdminForm.jsx
import React from 'react';

const AdminForm = ({ username, email, password, errors, setUsername, setEmail, setPassword, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="space-y-5">
    <div>
      <label className="font-medium">Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
      {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
    </div>
    <div>
      <label className="font-medium">Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
    </div>
    <div>
      <label className="font-medium">Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
    </div>
    <button type="submit" className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150">Sign Up</button>
  </form>
);

export default AdminForm;
