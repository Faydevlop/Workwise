const TaskCard = ({ tasks }) => {
    if (tasks.length === 0) return <p className="p-6">No Tasks Assigned</p>;
  
    return (
      <div className="p-6 grid gap-2">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{task.name}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
            <div className="rounded-full bg-secondary px-2 py-1 text-xs font-semibold">
              {task.status}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default TaskCard;
  