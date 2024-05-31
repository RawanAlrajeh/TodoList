import React from "react";
import TodoItem from "../TodoItem/index.jsx";

// TodoList component for displaying a list of tasks
const TodoList = ({ tasks, selectTask, toggleComplete }) => {
  return (
    <ul>
      {/* Map over tasks array and render a TodoItem for each task */}
      {tasks.map((task) => (
        <TodoItem
          key={task.id} // Unique key for each task item
          task={task} // Task object
          selectTask={selectTask} // Function to select a task for detailed view
          toggleComplete={toggleComplete} // Function to toggle the completion status of a task
        />
      ))}
    </ul>
  );
};

export default TodoList;
