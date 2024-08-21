import React, { useState } from "react";

function TestPage() {
  const [departmentName, setDepartmentName] = useState('');
  const [headOfDepartment, setHeadOfDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  // Example options for Head of Department and Team Members
  const headOptions = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson'
  ];

  const teamOptions = [
    { id: 1, name: 'Christian Mad', position: 'Product Designer' },
    { id: 2, name: 'Jason Statham', position: 'Junior Graphic Designer' },
    { id: 3, name: 'Michael Bay', position: 'Senior Developer' }
  ];

  const handleTeamMemberToggle = (member) => {
    setTeamMembers((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      departmentName,
      headOfDepartment,
      description,
      email,
      phone,
      teamMembers
    });
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto">
    <h2 className="text-xl font-bold mb-6">Add details</h2>
    
    <div className="mb-6">
      <h3 className="font-semibold mb-4">Project Information</h3>
      <div className="flex gap-4 mb-4">
        <div className="flex-grow">
          <label className="block text-sm font-medium mb-1">Department Name</label>
          <input 
            type="text" 
            value={departmentName} 
            onChange={(e) => setDepartmentName(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex-grow">
          <label className="block text-sm font-medium mb-1">Head of Department</label>
          <select 
            value={headOfDepartment} 
            onChange={(e) => setHeadOfDepartment(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>Select Head</option>
            {headOptions.map((head) => (
              <option key={head} value={head}>{head}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
        ></textarea>
      </div>
    </div>

    <div className="mb-6">
      <h3 className="font-semibold mb-4">Contact Information</h3>
      <div className="flex gap-4">
        <div className="flex-grow">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex-grow">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
    </div>

    <div className="mb-6">
      <h3 className="font-semibold mb-4">Team Members</h3>
      <div className="bg-gray-100 p-4 rounded-lg">
        {teamOptions.map((member) => (
          <div 
            key={member.id} 
            className={`flex items-center justify-between p-2 mb-2 rounded cursor-pointer 
              ${teamMembers.includes(member) ? 'bg-blue-100' : 'bg-white'}`}
            onClick={() => handleTeamMemberToggle(member)}
          >
            <div className="flex items-center">
              <img 
                src={`https://i.pravatar.cc/150?u=${member.id}`} 
                alt={member.name} 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-medium">{member.name}</div>
                <div className="text-sm text-gray-500">{member.position}</div>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={teamMembers.includes(member)} 
              onChange={() => handleTeamMemberToggle(member)}
              className="form-checkbox"
            />
          </div>
        ))}
      </div>
    </div>

    <div className="flex justify-between">
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Save Changes
      </button>
      <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Cancel
      </button>
    </div>
  </form>
  

  
  );
}

export default TestPage;
