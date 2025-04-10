import React from 'react';
import HrSidebar from '../../components/Sidebar/HrSidebar';
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import NotificationBox from '../../components/notification/notificationBox';
import { useSelector } from 'react-redux';
import usePayrollData from '../../hooks/hr/usePayrollData';
import PayrollTable from '../../components/hr/Payroll/PayrollTable';

const PayrollManagement = () => {
  const { hr } = useSelector((state) => state.hrAuth);
  const userId = hr.hr._id;
  const { data, listData, loading } = usePayrollData();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <HrSidebar />
      </div>
      <div className="lg:hidden">
        <HrSidebar />
      </div>
      <div className='bg-blue-50' style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <div className="flex flex-col lg:flex-row min-h-screen">
          <div className="flex-grow bg-white overflow-x-hidden">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 bg-[#2F3849] border-b bg-muted/40 px-4 sm:px-6">
              <div className="flex-1 flex items-center">
                <h1 className="text-xl text-white">Payroll Management</h1>
              </div>
            </header>

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                <h1 className="font-semibold text-lg md:text-xl mb-4 sm:mb-0">Payroll</h1>
              </div>

              <div className="grid gap-6 mb-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                      <p className="text-sm text-muted-foreground">No Payroll Employees</p>
                      <h3 className="text-2xl font-semibold">{listData.nopayrollUser}</h3>
                    </div>
                  </div>
                  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                    <ScaleLoader color="#ffffff" height={35} width={4} radius={2} margin={2} />
                  </Backdrop>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                      <p className="text-sm text-muted-foreground">Total employee</p>
                      <h3 className="text-2xl font-semibold">{listData.totalUser}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <PayrollTable data={data} />
            </main>
          </div>
        </div>
      </div>

      <NotificationBox userId={userId} />
    </div>
  );
};

export default PayrollManagement;
