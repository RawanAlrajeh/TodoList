import React from 'react';

// TodoItem component for displaying individual task items
const TodoItem = ({ task, selectTask, toggleComplete }) => {
  return (
    <li className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white shadow rounded mb-2 flex justify-between items-center cursor-pointer">
      <div className="flex-1" onClick={() => selectTask(task)}>
        {/* Display task description, strike-through if completed */}
        <span className={task.completed ? "line-through" : ""}>
          {task.task}
        </span>
        {/* Display task due date */}
        {task.dueDate && (
          <span className="text-sm text-gray-500 ml-2">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
      {/* Button to toggle the completion status of the task */}
      <button
        className="ml-4 p-2 bg-green-500 text-white rounded"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the selectTask event
          toggleComplete(task.id);
        }}
      >
        {/* Display 'Undo' if task is completed, otherwise 'Complete' */}
        {task.completed ? 'Undo' : 'Complete'}
      </button>
    </li>
  );
};

export default TodoItem;
