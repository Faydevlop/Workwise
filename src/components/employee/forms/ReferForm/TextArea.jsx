import React from 'react';

const TextArea = ({ label, id, value, onChange, error, placeholder }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium">{label}</label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="flex min-h-[80px] w-full rounded-md border"
    />
    {error && <span className="text-red-500">{error}</span>}
  </div>
);

export default TextArea;
