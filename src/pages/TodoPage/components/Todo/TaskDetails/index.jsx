import React, { useState, useEffect } from "react";
// Import utility function to get today's date
import { today } from "../../../../../utils/SelectedDate/selectedDate";

// TaskDetails component for viewing and editing/deleteing task details 
const TaskDetails = ({ task, updateTask, deleteTask, closeDetails }) => {
  // State for storing the edited task
  const [editedTask, setEditedTask] = useState(task.task);
  // State for storing the edited task due date
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  // Effect to update local state when the task prop changes
  useEffect(() => {
    setEditedTask(task.task);
    setEditedDueDate(task.dueDate);
  }, [task]);

  // Function to handle saving the edited task details
  const handleSave = () => {
    updateTask({ ...task, task: editedTask, dueDate: editedDueDate });
    closeDetails(); // Close the task details view after saving
  };

  return (
    <div className="fixed top-0 right-0 h-full md:h-auto md:static w-full md:w-80 lg:w-1/4 p-4 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg overflow-auto">
      <h2 className="text-lg font-bold mb-4">Task: {task.task}</h2>
      {/* Input for editing the task */}
      <input
        type="text"
        value={editedTask}
        onChange={(e) => setEditedTask(e.target.value)}
        className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-700 text-black dark:text-white"
      />
      {/* Input for editing the task due date */}
      <input
        type="date"
        value={editedDueDate}
        min={today} // Set minimum date to today's date
        onChange={(e) => setEditedDueDate(e.target.value)}
        className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-700 text-black dark:text-white"
      />
      {/* Button to save the changes */}
      <button
        onClick={handleSave}
        className="w-full p-2 bg-yellow-500 text-white rounded mb-2"
      >
        Save changes
      </button>
      {/* Button to delete the task */}
      <button
        onClick={() => deleteTask(task.id)}
        className="w-full p-2 bg-red-500 text-white rounded mb-2"
      >
        Delete Task
      </button>
      {/* Button to cancel the edit and close the details view */}
      <button
        onClick={closeDetails}
        className="w-full p-2 bg-gray-300 dark:bg-gray-600 rounded text-black dark:text-white"
      >
        Cancel
      </button>
    </div>
  );
};

export default TaskDetails;
