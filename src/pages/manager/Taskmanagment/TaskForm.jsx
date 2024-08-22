import React, { useState } from 'react';
import ManagerSidebar from '../../../components/Sidebar/ManagerSidebar';

const TaskForm = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!taskTitle.trim()) newErrors.taskTitle = 'Task title is required';
    if (!status) newErrors.status = 'Status is required';
    if (!assignedTo) newErrors.assignedTo = 'Assigned To is required';
    if (!priority) newErrors.priority = 'Priority is required';
    if (!startDate) newErrors.startDate = 'Start date is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    if (!description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Handle form submission logic here
    console.log({
      taskTitle,
      status,
      assignedTo,
      priority,
      startDate,
      dueDate,
      description,
    });
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <ManagerSidebar/>
      </div>
      <div className="lg:hidden">
        <ManagerSidebar />
      </div>
      <div className='bg-blue-50' style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <div className=" mx-auto p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Add a New Task</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Task Name/Title</label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className={`border rounded-lg px-4 py-2 ${errors.taskTitle ? 'border-red-500' : ''}`}
              />
              {errors.taskTitle && <p className="text-red-500 text-sm mt-1">{errors.taskTitle}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`border rounded-lg px-4 py-2 ${errors.status ? 'border-red-500' : ''}`}
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="InProgress">InProgress</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Assigned To</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className={`border rounded-lg px-4 py-2 ${errors.assignedTo ? 'border-red-500' : ''}`}
              >
                <option value="">Select a team member</option>
                <option value="employee1">Employee 1</option>
                <option value="employee2">Employee 2</option>
                <option value="employee3">Employee 3</option>
              </select>
              {errors.assignedTo && <p className="text-red-500 text-sm mt-1">{errors.assignedTo}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`border rounded-lg px-4 py-2 ${errors.priority ? 'border-red-500' : ''}`}
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`border rounded-lg px-4 py-2 ${errors.startDate ? 'border-red-500' : ''}`}
              />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`border rounded-lg px-4 py-2 ${errors.dueDate ? 'border-red-500' : ''}`}
              />
              {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`border rounded-lg px-4 py-2 ${errors.description ? 'border-red-500' : ''}`}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="md:col-span-2 flex justify-between">
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg">
                Add Task
              </button>
              <button type="button" className="bg-gray-800 text-white py-2 px-4 rounded-lg">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
