import { Link } from 'react-router-dom';

const SearchAndAddBar = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <Link to={'/admin/addDepartment'}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none">
          Add new department
        </button>
      </Link>
    </div>
  );
};

export default SearchAndAddBar;
