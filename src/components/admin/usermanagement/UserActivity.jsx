const UserActivity = () => (
    <div className="w-full md:w-1/3 bg-gray-100 p-6 md:p-8">
      <h3 className="text-lg font-semibold text-gray-800">Activity</h3>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Tasks Assigned</span><span>15</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tasks Completed</span><span>12</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Attendance</span><span>98%</span>
        </div>
      </div>
    </div>
  );
  
  export default UserActivity;
  