// Import React and hooks from the React library
import React, { useState, useEffect } from "react";
// Import Sidebar component for navigation
import Sidebar from "../../components/Sidebar/Sidebar";
import MainContent from "./components/Todo/MainContent";
import TaskDetails from "./components/Todo/TaskDetails";


const TodoPage = () => {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to keep track of the selected task for details view
  const [selectedTask, setSelectedTask] = useState(null);
  // State to manage the current view/filter (e.g., today, upcoming)
  const [view, setView] = useState("today");
  // State for storing the current search query to filter tasks
  const [searchQuery, setSearchQuery] = useState("");
  // State to manage the dark mode setting
  const [darkMode, setDarkMode] = useState(false);

  // Effect to load tasks from local storage on initial load
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Effect to save tasks to local storage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Effect to manage dark mode settings and store preference in local storage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Function to add a new task to the tasks array
  const addTask = (task) => {
    setTasks([...tasks, { ...task, status: "todo" }]);
  };

  // Function to update an existing task
  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task from the list
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    setSelectedTask(null);
  };

  // Function to toggle the completion status of a task
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to handle changes in the current view
  const handleViewChange = (view) => {
    setView(view);
  };

  // Function to update the search query state based on user input
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Function to filter tasks based on the current view and search query
  const getTasksForView = () => {
    const today = new Date().toISOString().split("T")[0];
    let filteredTasks = tasks;

    if (view === "today") {
      filteredTasks = tasks.filter((task) => task.dueDate === today);
    } else if (view === "upcoming") {
      filteredTasks = tasks.filter((task) => task.dueDate > today);
    }

    if (searchQuery) {
      filteredTasks = filteredTasks.filter((task) =>
        task.task.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredTasks;
  };

  // Function to toggle the theme between light and dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // JSX structure for the TodoApp component
  return (
    <div className="flex h-screen">
      <Sidebar
        handleViewChange={handleViewChange}
        tasks={tasks}
        view={view}
        toggleTheme={toggleTheme}
      />
     
      <div className="flex-1 flex">
        <MainContent
          tasks={getTasksForView()}
          addTask={addTask}
          selectTask={setSelectedTask}
          toggleComplete={toggleComplete}
          view={view}
          handleSearchChange={handleSearchChange}
        />
        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            updateTask={editTask}
            deleteTask={deleteTask}
            closeDetails={() => setSelectedTask(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TodoPage;
