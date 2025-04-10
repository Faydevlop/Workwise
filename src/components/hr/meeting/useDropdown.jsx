import { useState } from 'react';

const useDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return { dropdownOpen, toggleDropdown };
};

export default useDropdown;
