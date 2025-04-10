import React from 'react';
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

  const handleDelete = async (id) => {
    const result = await deleteDepartment(id);
    if (result.success) {
      toast.success('Department deleted successfully!');
    } else {
      toast.error('Error deleting department.');
    }
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
          <SearchAndAddBar />
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <ScaleLoader color="#ffffff" height={35} width={4} radius={2} margin={2} />
          </Backdrop>
          <DepartmentTable departments={departments} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;
