import React from "react";
import { useForm } from "react-hook-form";
// Import uuidv4 function to generate unique IDs for tasks
import { v4 as uuidv4 } from "uuid";
import { today } from "../../../../../utils/SelectedDate/selectedDate";

const TodoForm = ({ addTask }) => {
  const {
    register, // Function to register form inputs
    handleSubmit, // Function to handle form submission
    reset, // Function to reset the form after submission
    formState: { errors }, // Object containing form validation errors
  } = useForm();

  // Function to handle form submission
  const onSubmit = (data) => {
    // Call addTask function passed as prop with new task data
    addTask({
      id: uuidv4(), // Generate unique ID for the task
      task: data.task, // Task description
      dueDate: data.dueDate, // Task due date
      completed: false, // Task completion status (default to false)
    });
    reset(); // Reset the form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 relative">
      <div className="flex flex-col md:flex-row items-start md:items-center mb-2 w-full">
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 mb-7 md:mb-0 md:mr-2 relative">
          {/* Input for task description with validation */}
          <input
            {...register("task", { required: "Task is required" })}
            type="text"
            placeholder="Add a new task"
            className={`p-2 border rounded ${
              errors.task ? "border-red-500" : "border-gray-300"
            } bg-white dark:bg-gray-700 text-black dark:text-white`}
          />
          {/* Display error message if task input is invalid */}
          {errors.task && (
            <span className="text-red-500 absolute -bottom-6">{`* ${errors.task.message}`}</span>
          )}
        </div>

        <div className="flex flex-col w-full md:w-[200px] mb-7 md:mb-0 md:mr-2 relative ">
          {/* Input for task due date with validation */}
          <input
            {...register("dueDate", { required: "Due date is required" })}
            type="date"
            min={today} // Set the minimum date to today's date
            className={`p-2 border rounded ${
              errors.dueDate ? "border-red-500" : "border-gray-300"
            } bg-white dark:bg-gray-700 text-black dark:text-white`}
          />
          {/* Display error message if due date input is invalid */}
          {errors.dueDate && (
            <span className="text-red-500 absolute -bottom-6">{`* ${errors.dueDate.message}`}</span>
          )}
        </div>

        {/* Submit button to add the task */}
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded w-full md:w-auto lg:w-[100px]"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
