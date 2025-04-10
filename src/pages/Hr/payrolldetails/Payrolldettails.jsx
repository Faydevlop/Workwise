import React from 'react';
import HrSidebar from '../../../components/Sidebar/HrSidebar';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import usePayrollData from '../../../hooks/hr/useFetchPayrollData';
import PayrollCard from '../../../components/hr/cards/PayrollCard';
import PayrollForm from '../../../components/hr/form/PayrollForm';

const Payrolldettails = () => {
  const { userId } = useParams();
  const { data, bonuses, setBonuses, deduction, setDeduction } = usePayrollData(userId);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <HrSidebar />
      </div>
      <div className="lg:hidden">
        <HrSidebar />
      </div>
      <ToastContainer />
      <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        <div className="flex flex-col gap-8 bg-background p-6 sm:p-8 md:p-10">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex flex-col items-center gap-1 sm:items-start">
              <h1 className="text-2xl font-bold">Payroll Details</h1>
              <p className="text-muted-foreground">Edit employee payroll information</p>
            </div>
          </div>

          {data && <PayrollCard data={data} />}
          {data && (
            <PayrollForm
              data={data}
              bonuses={bonuses}
              setBonuses={setBonuses}
              deduction={deduction}
              setDeduction={setDeduction}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Payrolldettails;
