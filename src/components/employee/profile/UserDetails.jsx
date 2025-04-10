import React from 'react';

const UserDetails = ({ user }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">{user.firstName} {user.lastName}</h2>
      <p className="text-gray-600 font-bold text-1xl mb-4">{user.position}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center mb-4">
          <span>Email: {user.email}</span>
        </div>
        <div className="flex items-center mb-4">
          <span>Phone: {user.phone}</span>
        </div>
        <div className="flex items-center mb-4">
          <span>DOB: {new Date(user.dob).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center mb-4">
          <span>Gender: {user.gender}</span>
        </div>
        <div className="flex items-center mb-4">
          <span>Address: {user.address}</span>
        </div>
        <div className="flex items-center mb-4">
          <span>Department: {user?.department?.departmentName}</span>
        </div>
        <div className="flex items-center mb-4">
          <span>Position: {user.position}</span>
        </div>
        <div className="flex items-center mb-4">
          <span>Date of Joining: {new Date(user.dateOfJoining).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center mb-4">
          <span>Status: {user.employeeStatus}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;