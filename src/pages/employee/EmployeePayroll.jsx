import React from 'react';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';

import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar';
import NotificationBox from '../../components/notification/notificationBox';
import PayrollCard from '../../components/employee/payroll/PayrollCard';
import useEmployeePayroll from '../../hooks/employee/useEmployeePayroll';

const EmployeePayroll = () => {
  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee.user._id;

  const { payrollData, loading } = useEmployeePayroll(userId);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar />
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        {payrollData.length === 0 ? (
          <p className="text-center">No Payroll Data Found</p>
        ) : (
          <>
            <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Payroll</h1>
            </header>

            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <ScaleLoader color="#ffffff" height={35} width={4} radius={2} margin={2} />
            </Backdrop>

            <main className="flex-1 bg-background p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <PayrollCard
                title="Gross Pay"
                content={payrollData.baseSalary}
                description="Base salary"
              />

              <PayrollCard title="Deduction & bonuses">
                <div className="grid gap-2 text-lg">
                  <div className="flex justify-between">
                    <span>Deduction</span>
                    <span>{payrollData.deductions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bonuses</span>
                    <span>{payrollData.bonuses}</span>
                  </div>
                </div>
              </PayrollCard>

              <PayrollCard
                title="Current Month Pay"
                content={payrollData.permonthsalary}
              />
            </main>
          </>
        )}

        <NotificationBox userId={userId} />
      </div>
    </div>
  );
};

export default EmployeePayroll;
