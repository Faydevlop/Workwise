const PayrollCard = ({ payroll }) => {
    if (!payroll[0]) return <p className="p-6">Payroll Data Not Available</p>;
  
    const { permonthsalary, bonuses, deductions } = payroll[0];
  
    return (
      <div className="p-6 grid gap-2">
        <PayrollItem title="Base Salary" value={permonthsalary} note="This month" />
        <PayrollItem title="Bonus" value={bonuses} note="This quarter" />
        <PayrollItem title="Deductions" value={deductions} note="This month" />
      </div>
    );
  };
  
  const PayrollItem = ({ title, value, note }) => (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">₹{value}</p>
        <p className="text-xs text-muted-foreground">{note}</p>
      </div>
    </div>
  );
  
  export default PayrollCard;
  