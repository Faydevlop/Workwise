import React from 'react';

const InputField = ({ label, id, value, onChange, type = "text", error, placeholder }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium">{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="flex h-10 w-full rounded-md border"
    />
    {error && <span className="text-red-500">{error}</span>}
  </div>
);

export default InputField;
