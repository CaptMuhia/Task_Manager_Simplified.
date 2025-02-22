import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim() === "") return;
    addTask({ ...task, id: Date.now(), status: "Pending" });
    setTask({ title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
