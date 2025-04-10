import React from 'react';

const ApplyLeaveForm = ({ leaveType, setLeaveType, startDate, setStartDate, endDate, setEndDate, reason, setReason, errors }) => {
  return (
    <form>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Leave Type</label>
          <select
            className={`mt-1 block w-full border rounded-md p-2 ${errors.leaveType ? 'border-red-500' : ''}`}
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="">Select leave type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
            <option value="Paid Leave">Paid Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
          </select>
          {errors.leaveType && <span className="text-red-500 text-sm">{errors.leaveType}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Start Date</label>
          <input
            type="date"
            className={`mt-1 block w-full border rounded-md p-2 ${errors.startDate ? 'border-red-500' : ''}`}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {errors.startDate && <span className="text-red-500 text-sm">{errors.startDate}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">End Date</label>
          <input
            type="date"
            className={`mt-1 block w-full border rounded-md p-2 ${errors.endDate ? 'border-red-500' : ''}`}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {errors.endDate && <span className="text-red-500 text-sm">{errors.endDate}</span>}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-600">Reason</label>
        <textarea
          className={`mt-1 block w-full border rounded-md p-2 ${errors.reason ? 'border-red-500' : ''}`}
          rows="4"
          placeholder="Enter the reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
        {errors.reason && <span className="text-red-500 text-sm">{errors.reason}</span>}
      </div>
    </form>
  );
};

export default ApplyLeaveForm;
