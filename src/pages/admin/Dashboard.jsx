import React from 'react';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import useAdminDashboardData from '../../hooks/admin/useAdminDashboardData';
import PendingLeaves from '../../components/admin/leaveManagement/PendingLeaves';
import DepartmentList from '../../components/admin/leaveManagement/DepartmentList';

const AdminDashBoard = () => {
  const { leaves, department, payroll, projects } = useAdminDashboardData();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="lg:hidden">
        <AdminSidebar />
      </div>

      <div style={{ flex: 3, overflow: 'auto' }}>
        <main className="p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <PendingLeaves leaves={leaves} />
            <DepartmentList departments={department} />
            {/* You can follow the same pattern for Payroll and Projects */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashBoard;
