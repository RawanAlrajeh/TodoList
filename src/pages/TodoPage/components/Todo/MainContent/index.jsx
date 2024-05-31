import React from "react";
// Import FontAwesomeIcon component to use icons throughout the UI
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import specific icon from FontAwesome for search functionality
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TodoList from "../TodoList";
import TodoForm from "../TodoForm";

// MainContent component displays the main section of the Todo application
const MainContent = ({
  tasks, // Array of task objects
  addTask, // Function to add a new task
  selectTask, // Function to select a task for detailed view
  toggleComplete, // Function to toggle the completion status of a task
  view, // Current view/filter type (e.g., all, today, upcoming)
  handleSearchChange, // Function to handle changes in the search input
}) => {
  return (
    <div className="flex flex-col p-4 gap-4 w-full">
      <div className="flex items-center gap-x-4">
        <h1 className="text-2xl font-bold">
          {/* Display view type with first letter capitalized */}
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </h1>
        <div className="border-black border rounded bg-white dark:bg-gray-700 px-2 py-1">
          {/*  Display the number of tasks in the current view */}
          <span className="text-black dark:text-white">{tasks.length}</span>
        </div>
      </div>

      <TodoForm
        addTask={addTask} // Component to input and submit new tasks
      />

      <div className="relative mb-4 w-full md:w-1/2 lg:w-1/3">
        <input
          type="text"
          placeholder="You can search by task name"
          className="w-full p-2 border rounded pl-10 bg-white dark:bg-gray-800 text-black dark:text-white"
          onChange={(e) => handleSearchChange(e.target.value)} // Updates search query based on user input
        />
        <FontAwesomeIcon
          icon={faSearch}
          size="lg"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" // Icon for visual indication of search functionality
        />
      </div>

      <TodoList
        tasks={tasks}
        selectTask={selectTask}
        toggleComplete={toggleComplete} // Pass tasks and control functions to TodoList for rendering individual tasks
      />
    </div>
  );
};

// Export the MainContent component as the default export
export default MainContent;
