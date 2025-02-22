import React from "react";
import TaskList from "../components/TaskList";

function Home() {
  return (
    <div className="w-full max-w-3xl p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
      <TaskList />
    </div>
  );
}

export default Home;
