import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = ({ userId }) => {
  return (
    <div className="mt-8 md:mt-0">
      <Link to={'/employee/request-reset-password'}>
        <button className="bg-blue-500 rounded-lg hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4">
          Change Password
        </button>
      </Link>

      <Link to={`/employee/editprofile/${userId}`}>
        <button className="bg-blue-500 ml-4  rounded-lg hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4">
          Edit Profile
        </button>
      </Link>
    </div>
  );
};

export default ProfileActions;