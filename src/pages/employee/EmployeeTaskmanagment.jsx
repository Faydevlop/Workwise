import React, { useEffect, useState } from 'react'
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import NotificationBox from '../../components/notification/notificationBox';

const EmployeeTaskmanagment = () => {

  // Initial data for tasks
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [loading ,setLoading] = useState(false)

  const { employee } = useSelector((state) => state.employeeAuth);
  const userId = employee.user._id

  useEffect(()=>{
    setLoading(true)
    const fetchtasks = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/task/listtasks/${userId}`)
        const fetchedTasks = response.data;
        // console.log(response.data);
        

        if (!fetchedTasks) {
          throw new Error("No tasks found");
        }

        const tasksByStatus = {
          todo: [],
          inProgress: [],
          done: [],
        };

        fetchedTasks.forEach(task => {
          switch (task.status) {
            case "Pending":
              tasksByStatus.todo.push(task);
              break;
            case "InProgress":
              tasksByStatus.inProgress.push(task);
              break;
            case "Completed":
              tasksByStatus.done.push(task);
              break;
            default:
              break;
          }
        });

        setTasks(tasksByStatus);

      } catch (error) {
        console.error("Error fetching tasks:", error);
        
      }finally{
        setLoading(false)
      }
    }
    fetchtasks()

  },[])



  

  // Handle drag end event
  const onDragEnd = async (result) => {
    const { destination, source } = result;
  
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
  
    const start = tasks[source.droppableId];
    const finish = tasks[destination.droppableId];
  
    const [movedTask] = start.splice(source.index, 1);
    finish.splice(destination.index, 0, movedTask);
  
    // Update state
    setTasks({
      ...tasks,
      [source.droppableId]: start,
      [destination.droppableId]: finish,
    });
  
    // Update task status in the backend
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/comment/updatestatus/${movedTask._id}`, {
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
        return "Pending"; // Default status
    }
  };

  
  

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar/>
      </div>
      <div className="lg:hidden">
        <EmployeeSidebar />
      </div>
      <Backdrop
  sx={{
    color: '#fff',
    
    zIndex: (theme) => theme.zIndex.drawer + 1,
  }}
  open={loading}
>
  <ScaleLoader
    color="#ffffff" // Adjust the spinner color
    height={35}     // Adjust the height
    width={4}       // Adjust the width
    radius={2}      // Adjust the radius
    margin={2}      // Adjust the margin between spinners
  />
</Backdrop>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
      <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col h-full">
        <header className="bg-background bg-[#2F3849] border-b px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl text-white ">Tasks</h1>
        </header>
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {/* To Do Column */}
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-background rounded-lg border p-4"
              >
                <h2 className="text-lg font-bold">To Do</h2>
                {tasks.todo.map((task, index) => (
                  
                  
                <Draggable key={task._id}  draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={`border text-card-foreground shadow-sm bg-muted rounded-lg p-4 cursor-grab mt-4 ${task.priority === 'Low' ? 'bg-green-200' :
    task.priority === 'Medium' ? 'bg-yellow-200' :
    'bg-red-200'} `}
                    >
                      <div className="flex  items-start justify-between">
                        <Link to={`/employee/tasks/details/${task._id}`}>
                      
                        <div>
                          <h3 className="text-lg font-bold">{task.name}</h3> {/* Changed to task.name */}
                          <p className="text-sm text-muted-foreground">{new Date(task.dueDate).toLocaleDateString()}</p> {/* Changed to task.dueDate */}
                        </div>
                        </Link>
                        <div className="inline-flex w-fit items-center bg-white border font-semibold bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
                       {task.priority}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <img className="aspect-square h-full w-full" src={ task.assignedTo[0].profileImageUrl? task.assignedTo[0].profileImageUrl : `https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg`} alt="" />
                          </span>
                          <div className="text-sm">{task.assignedTo ? `${task.assignedTo[0].firstName}${task.assignedTo[0].lastName}` : 'Not availbale'}</div> {/* Change based on your user data */}
                        </div>
                        <div className="inline-flex w-fit bg-white items-center border font-semibold bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
                {task.cat} 
                </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* In Progress Column */}
          {/* In Progress Column */}
<Droppable droppableId="inProgress">
  {(provided) => (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      className="bg-background rounded-lg border p-4"
    >
      <h2 className="text-lg font-bold">In Progress</h2>
      {tasks.inProgress.map((task, index) => (
        <Draggable key={task._id} draggableId={task._id} index={index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={`border text-card-foreground shadow-sm bg-muted rounded-lg p-4 cursor-grab mt-4 ${task.priority === 'Low' ? 'bg-green-200' :
                task.priority === 'Medium' ? 'bg-yellow-200' :
                'bg-red-200'} `}
            >
              <div className="flex items-start justify-between">
              <Link to={`/employee/tasks/details/${task._id}`}>
                <div>
                  <h3 className="text-lg font-bold">{task.name}</h3>
                  <p className="text-sm text-muted-foreground">{new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                </Link> 
                <div className="inline-flex w-fit bg-white items-center border font-semibold bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
                 {task.priority}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img className="aspect-square h-full w-full"src={ task.assignedTo[0].profileImageUrl? task.assignedTo[0].profileImageUrl : `https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg`} alt="" />
                  </span>
                  <div className="text-sm">{task.assignedTo ? `${task.assignedTo[0].firstName}${task.assignedTo[0].lastName}` : 'Not availbale'}</div>
                </div>
                <div className="inline-flex w-fit bg-white items-center border font-semibold bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
                {task.cat} 
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  )}
</Droppable>


          {/* Done Column */}
          <Droppable droppableId="done">
  {(provided) => (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      className="bg-background rounded-lg border p-4"
    >
      <h2 className="text-lg font-bold">Done</h2>
      {tasks.done.map((task, index) => (
        <Draggable key={task._id} draggableId={task._id} index={index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={`border text-card-foreground shadow-sm bg-muted rounded-lg p-4 cursor-grab mt-4 ${task.priority === 'Low' ? 'bg-green-200' :
                task.priority === 'Medium' ? 'bg-yellow-200' :
                'bg-red-200'} `}
            >
              <div className="flex items-start justify-between">
              <Link to={`/employee/tasks/details/${task._id}`}>
                <div>
                  <h3 className="text-lg font-bold">{task.name}</h3>
                  <p className="text-sm text-muted-foreground">{new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                </Link>
                <div className="inline-flex w-fit bg-white items-center border font-semibold bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
                 {task.priority}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img className="aspect-square h-full w-full" src={ task.assignedTo[0].profileImageUrl? task.assignedTo[0].profileImageUrl : `https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg`} alt="" />
                  </span>
                  <div className="text-sm">
                  {task.assignedTo ? `${task.assignedTo[0].firstName}${task.assignedTo[0].lastName}` : 'Not availbale'}
                  </div>
                  
                </div>
                
                <div className="inline-flex w-fit bg-white items-center border font-semibold bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
                {task.cat} 
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  )}
</Droppable>

        </main>
      </div>
    </DragDropContext>
      </div>
      <NotificationBox userId={userId} />
    </div>
  )
}

export default EmployeeTaskmanagment