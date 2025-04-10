// src/components/admin/SocialLoginButtons.jsx
import React from 'react';

const SocialLoginButtons = () => (
  <div className="grid grid-cols-3 gap-x-3">
    {[...Array(0)].map((_, idx) => (
      <button key={idx} className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
        <svg className="w-5 h-5" viewBox="0 0 48 48">{/* add platform-specific SVG here */}</svg>
      </button>
    ))}
  </div>
);

export default SocialLoginButtons;
