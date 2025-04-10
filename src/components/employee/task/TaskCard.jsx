import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
  return (
    <div
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
        <div className="inline-flex w-fit items-center bg-white border font-semibold bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
          {task.priority}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <img className="aspect-square h-full w-full" src={task.assignedTo[0].profileImageUrl ? task.assignedTo[0].profileImageUrl : `https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg`} alt="" />
          </span>
          <div className="text-sm">{task.assignedTo ? `${task.assignedTo[0].firstName} ${task.assignedTo[0].lastName}` : 'Not available'}</div>
        </div>
        <div className="inline-flex w-fit bg-white items-center border font-semibold bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
          {task.cat}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
