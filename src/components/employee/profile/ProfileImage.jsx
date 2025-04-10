import React from 'react';

const ProfileImage = ({ imageUrl }) => {
  return (
    <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
      <div className="relative">
        <img
          src={imageUrl}
          alt="Profile"
          className="rounded-full w-32 h-32 mb-4 md:mb-0 md:mr-6 border-4 border-white"
        />
      </div>
    </div>
  );
};

export default ProfileImage;