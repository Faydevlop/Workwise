// src/components/LeaveDetail.js
import React from 'react';

const LeaveDetail = ({ data }) => {
  return (
    <div className="border w-1/2 bg-white text-black shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Leave Summary</h3>
      </div>
      <div className="p-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Leave Type :</span>
            <span>{data.leaveType}</span>
          </div>
          <div className="flex justify-between">
            <span>Start Date :</span>
            <span>{new Date(data.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>End Date :</span>
            <span>{new Date(data.endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Request Date :</span>
            <span>{new Date(data.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Leave Status :</span>
            <span>{data.status}</span>
          </div>
          <div className="flex justify-between">
            <span>Reason :</span>
            <span>{data.reason}</span>
          </div>
          <div className="flex justify-between">
            <span>Comments :</span>
            <span>{data.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetail;
