const LeaveCard = ({ leaves }) => {
    if (leaves.length === 0) return <p className="p-6">No Leave Requests</p>;
  
    return (
      <div className="p-6 grid gap-2">
        {leaves.map((leave, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{leave.reason}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="rounded-full bg-secondary px-2 py-1 text-xs font-semibold">
              {leave.status}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default LeaveCard;
  