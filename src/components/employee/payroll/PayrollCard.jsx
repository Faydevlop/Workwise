import React from 'react';

const PayrollCard = ({ title, content, description, children }) => (
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
    <div className="flex flex-col space-y-1.5 p-6">
      <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">{title}</h3>
    </div>
    <div className="p-6">
      {children || (
        <>
          <div className="text-4xl font-bold">{content}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </>
      )}
    </div>
  </div>
);

export default PayrollCard;
