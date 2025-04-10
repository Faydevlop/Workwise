const UserProfile = ({ user }) => (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
      <div className="mt-2 space-y-1">
        <p className="text-gray-600"><span className="font-medium">Full Name:</span> {user.firstName} {user.lastName}</p>
        <p className="text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>
        <p className="text-gray-600"><span className="font-medium">Phone:</span> {user.phone}</p>
        <p className="text-gray-600"><span className="font-medium">DOB:</span> {user.dob}</p>
        <p className="text-gray-600"><span className="font-medium">Gender:</span> {user.gender}</p>
        <p className="text-gray-600"><span className="font-medium">Address:</span> {user.address}</p>
      </div>
  
      <h3 className="mt-6 text-lg font-semibold text-gray-800">Professional Information</h3>
      <div className="mt-2 space-y-1">
        <p className="text-gray-600"><span className="font-medium">Role:</span> {user.position}</p>
        <p className="text-gray-600"><span className="font-medium">Department:</span> {user.department}</p>
        <p className="text-gray-600"><span className="font-medium">Joined:</span> {user.dateOfJoining}</p>
        <p className="text-gray-600"><span className="font-medium">Status:</span> {user.employeeStatus}</p>
      </div>
    </div>
  );
  
  export default UserProfile;
  