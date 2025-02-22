import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTasks } from './TaskContext'; // Assuming you have a context for tasks

const EditTask = () => {
  const { id } = useParams();
  const { tasks, updateTask } = useTasks();
  const history = useHistory();
  
  const task = tasks.find(task => task.id === id);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(id, { title, description, dueDate, status });
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Update Task</button>
    </form>
  );
};

export default EditTask;