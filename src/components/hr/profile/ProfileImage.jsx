import React from 'react';

const ProfileImage = ({ imageUrl, altText }) => {
  return (
    <div className="relative">
      <img
        src={imageUrl ? imageUrl : 'https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg'}
        alt={altText}
        className="rounded-full w-32 h-32 mb-4 md:mb-0 md:mr-6 border-4 border-white"
      />
    </div>
  );
};

export default ProfileImage;
