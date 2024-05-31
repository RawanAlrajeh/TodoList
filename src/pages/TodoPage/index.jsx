import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MainContent from "./components/Todo/MainContent";
import TaskDetails from "./components/Todo/TaskDetails";

const TodoPage = () => {
  // Initialize state with items from local storage
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [view, setView] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Save tasks to local storage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save theme preference to local storage whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const addTask = (task) => {
    const updatedTasks = [...tasks, { ...task, id: Date.now(), status: "todo" }];
    setTasks(updatedTasks);
  };

  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    setSelectedTask(null);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleViewChange = (view) => {
    setView(view);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

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
