import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../config/axiosConfig';

const PayrollForm = ({ data, bonuses, setBonuses, deduction, setDeduction }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const payrollData = {
        deduction,
        bonuses
      };

      const response = await axiosInstance.post(`/payroll/addpay/${data.payroll._id}`, payrollData);
      toast.success("Payroll added successfully!", {
        position: "top-right",
        autoClose: 1500,
        onClose: () => navigate('/hr/payrollmanagement')
      });
    } catch (error) {
      toast.error('Error adding payroll', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="p-6 grid gap-6">
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="salary">Current Salary</label>
        <input
          disabled
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
          id="salary"
          type="number"
          value={data?.payroll ? `${data.payroll.baseSalary}` : 'Not available'}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="bonuses">Bonus</label>
        <input
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
          id="bonuses"
          type="number"
          value={bonuses}
          onChange={(e) => setBonuses(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="deduction">Deduction</label>
        <input
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
          id="deduction"
          type="number"
          value={deduction}
          onChange={(e) => setDeduction(e.target.value)}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="inline-flex bg-black text-stone-50 items-center justify-center text-sm font-medium rounded-md px-3 h-9"
      >
        Save
      </button>
    </div>
  );
};

export default PayrollForm;
