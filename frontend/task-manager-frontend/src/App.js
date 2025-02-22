import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ChevronRight, Search, Sun, Moon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Load tasks from Local Storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save tasks to Local Storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle Dark Mode
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const addTask = () => {
    if (newTask.trim() === "") return;

    const newTaskObj = {
      id: Date.now().toString(),
      title: newTask,
      status: "Pending",
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");

    toast.success("Task added successfully!");
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.error("Task deleted!");
  };

  const updateStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === "Pending"
                  ? "In Progress"
                  : task.status === "In Progress"
                  ? "Completed"
                  : "Pending",
            }
          : task
      )
    );

    toast.success("Task status updated!");
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (filter === "All" || task.status === filter) &&
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg sm:max-w-2xl transition-colors"
      >
        <Toaster position="top-right" reverseOrder={false} />

        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Task Manager
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 border rounded-lg px-3 py-2 mb-4 shadow-sm">
          <Search className="text-gray-500 dark:text-gray-300" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full bg-transparent outline-none ml-2 text-gray-700 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Task Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            onClick={addTask}
          >
            Add
          </motion.button>
        </div>

        {/* Task Filter Dropdown */}
        <div className="mb-5">
          <label className="block text-gray-700 dark:text-white font-semibold mb-1">
            Filter by Status:
          </label>
          <select
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Task List */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                <AnimatePresence>
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <motion.li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-300"
                          >
                            <span className="text-lg dark:text-white">{task.title}</span>
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 text-sm font-semibold rounded-lg transition-colors"
                                onClick={() => updateStatus(task.id)}
                              >
                                {task.status} <ChevronRight size={16} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-red-500 hover:text-red-700"
                                onClick={() => deleteTask(task.id)}
                              >
                                <Trash2 size={20} />
                              </motion.button>
                            </div>
                          </motion.li>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-500 dark:text-gray-400">
                      No tasks found
                    </motion.p>
                  )}
                </AnimatePresence>
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </motion.div>
    </div>
  );
}

export default App;
