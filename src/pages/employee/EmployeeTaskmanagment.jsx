import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar';
import NotificationBox from '../../components/notification/notificationBox';
import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import useTaskData from '../../hooks/employee/useTaskData';  // Import the custom hook
import TaskCard from '../../components/employee/task/TaskCard';  // Import the TaskCard component
import { useSelector } from 'react-redux';

const EmployeeTaskmanagment = () => {
  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee.user._id;
  const { tasks, loading, setTasks } = useTaskData(userId);  // Using the custom hook

  const onDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = tasks[source.droppableId];
    const finish = tasks[destination.droppableId];

    const [movedTask] = start.splice(source.index, 1);
    finish.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: start,
      [destination.droppableId]: finish,
    });

    try {
      await axiosInstance.put(`/comment/updatestatus/${movedTask._id}`, {
        status: mapDroppableIdToStatus(destination.droppableId),
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const mapDroppableIdToStatus = (droppableId) => {
    switch (droppableId) {
      case "todo":
        return "Pending";
      case "inProgress":
        return "InProgress";
      case "done":
        return "Completed";
      default:
        return "Pending";
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar />
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <ScaleLoader color="#ffffff" height={35} width={4} radius={2} margin={2} />
      </Backdrop>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col h-full">
            <header className="bg-background bg-[#2F3849] border-b px-6 py-4 flex items-center justify-between">
              <h1 className="text-2xl text-white ">Tasks</h1>
            </header>
            <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {['todo', 'inProgress', 'done'].map((status) => (
                <Droppable droppableId={status} key={status}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-background rounded-lg border p-4"
                    >
                      <h2 className="text-lg font-bold">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                      {tasks[status].map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </main>
          </div>
        </DragDropContext>
      </div>
      <NotificationBox userId={userId} />
    </div>
  );
};

export default EmployeeTaskmanagment;
