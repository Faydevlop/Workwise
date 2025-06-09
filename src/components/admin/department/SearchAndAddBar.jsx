import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiX, FiPlus } from 'react-icons/fi';

const SearchAndAddBar = ({ onSearch, searchTerm, onClearSearch }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    onClearSearch();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search departments..."
            value={localSearchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
          {localSearchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </form>
      </div>

      {/* Add Department Button */}
      <Link
        to="/admin/addDepartment"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        <FiPlus className="h-4 w-4 mr-2" />
        Add Department
      </Link>
    </div>
  );
};

export default SearchAndAddBar;