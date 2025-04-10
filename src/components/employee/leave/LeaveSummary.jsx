const LeaveSummary = ({ leaves }) => {
    const leaveCount = leaves?.[0]?.monthlyLeaveCount || 0;
  
    return (
      <div className="rounded-lg border bg-white text-black shadow-sm">
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">Leave Summary</h3>
          <div className="flex justify-between">
            <span>Leave Taken This Month</span>
            <span>{leaveCount}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default LeaveSummary;
  