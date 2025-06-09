import React, { useState, useMemo } from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import useDepartments from '../../hooks/admin/useDepartments';
import DepartmentTable from '../../components/admin/department/DepartmentTable';
import SearchAndAddBar from '../../components/admin/department/SearchAndAddBar';

const DepartmentManagement = () => {
  const { departments, loading, deleteDepartment } = useDepartments();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter departments based on search term
  const filteredDepartments = useMemo(() => {
    if (!searchTerm.trim()) {
      return departments;
    }

    return departments.filter((department) => {
      const searchLower = searchTerm.toLowerCase();
      
      // Search in department name
      const departmentNameMatch = department.departmentName?.toLowerCase().includes(searchLower);
      
      // Search in head of department name
      const headName = department.headOfDepartMent 
        ? `${department.headOfDepartMent.firstName} ${department.headOfDepartMent.lastName}`.toLowerCase()
        : '';
      const headMatch = headName.includes(searchLower);
      
      // Search in email
      const emailMatch = department.email?.toLowerCase().includes(searchLower);
      
      // Search in number of employees (convert to string)
      const employeeCountMatch = department.TeamMembers?.length.toString().includes(searchTerm);
      
      return departmentNameMatch || headMatch || emailMatch || employeeCountMatch;
    });
  }, [departments, searchTerm]);

  const handleDelete = async (id) => {
    const result = await deleteDepartment(id);
    if (result.success) {
      toast.success('Department deleted successfully!');
    } else {
      toast.error('Error deleting department.');
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        <AdminSidebar />
      </div>

      <div className='bg-blue-50' style={{ flex: 3, padding: '20px', overflow: 'auto' }}>
        <ToastContainer />
        <header className="flex border shadow-lg bg-[#2F3849] rounded mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3">
          <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <span className="flex-none font-semibold text-xl text-white">Department Management</span>
          </nav>
        </header>

        <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6">
          <SearchAndAddBar 
            onSearch={handleSearch} 
            searchTerm={searchTerm}
            onClearSearch={clearSearch}
          />
          
          {/* Search Results Info */}
          {searchTerm && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                Showing {filteredDepartments.length} of {departments.length} departments 
                {searchTerm && (
                  <>
                    {' '}for "<span className="font-semibold">{searchTerm}</span>"
                    <button 
                      onClick={clearSearch}
                      className="ml-2 text-blue-600 hover:text-blue-800 underline"
                    >
                      Clear search
                    </button>
                  </>
                )}
              </p>
            </div>
          )}

          {/* No Results Message */}
          {searchTerm && filteredDepartments.length === 0 && (
            <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-700">
                No departments found matching "{searchTerm}". 
                <button 
                  onClick={clearSearch}
                  className="ml-1 text-yellow-600 hover:text-yellow-800 underline"
                >
                  Show all departments
                </button>
              </p>
            </div>
          )}
          
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <ScaleLoader color="#ffffff" height={35} width={4} radius={2} margin={2} />
          </Backdrop>
          
          <DepartmentTable 
            departments={filteredDepartments} 
            onDelete={handleDelete} 
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;