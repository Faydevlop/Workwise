import React from 'react';

const FileUpload = ({ id, onChange, error }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium">Resume</label>
    <input
      id={id}
      type="file"
      onChange={onChange}
      className="flex h-10 w-full rounded-md border"
    />
    {error && <span className="text-red-500">{error}</span>}
  </div>
);

export default FileUpload;
