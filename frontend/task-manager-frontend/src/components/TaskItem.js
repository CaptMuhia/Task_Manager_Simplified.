import React from "react";

const TaskItem = ({ task }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md mb-2">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <span className="text-xs font-medium bg-blue-500 text-white px-2 py-1 rounded">
        {task.status}
      </span>
    </div>
  );
};

export default TaskItem;
