import React from 'react';

const LeaveSummary = ({ pendingLeavesCount }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md w-full lg:w-1/4 mt-8 lg:mt-0">
      <h3 className="text-lg font-semibold text-gray-800">Leave Summary</h3>
      <ul className="mt-4 space-y-2">
        <li className="flex justify-between">
          <span className="text-gray-600">Taken Leaves</span>
          <span className="font-semibold text-gray-800">{pendingLeavesCount}</span>
        </li>
      </ul>
    </div>
  );
};

export default LeaveSummary;
