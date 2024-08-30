import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Initial data for tasks
const initialTasks = {
  todo: [
    { id: "1", title: "Finish design for new homepage", due: "Due in 3 days", priority: "High", user: "John Doe" },
    { id: "2", title: "Implement new payment gateway", due: "Due in 7 days", priority: "Medium", user: "Sarah Adams" },
  ],
  "in-progress": [
    { id: "3", title: "Refactor backend API", due: "Due in 5 days", priority: "Medium", user: "Michael Johnson" },
    { id: "4", title: "Optimize website performance", due: "Due in 10 days", priority: "Low", user: "Emily Wilson" },
  ],
  done: [
    { id: "5", title: "Finish design for new homepage", due: "Due in 3 days", priority: "High", user: "John Doe" },
    { id: "6", title: "Implement new payment gateway", due: "Due in 7 days", priority: "Medium", user: "Sarah Adams" },
  ],
};

function TestPage() {
  const [tasks, setTasks] = useState(initialTasks);

  // Handle drag end event
  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = tasks[source.droppableId];
    const finish = tasks[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start);
      const [movedTask] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: newTaskIds,
      });
    } else {
      const startTaskIds = Array.from(start);
      const finishTaskIds = Array.from(finish);

      const [movedTask] = startTaskIds.splice(source.index, 1);
      finishTaskIds.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: startTaskIds,
        [destination.droppableId]: finishTaskIds,
      });
    }
  };

  return (
   <></>
  );
}

export default TestPage;
