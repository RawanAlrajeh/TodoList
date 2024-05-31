import React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { today } from "../../../../../utils/SelectedDate/selectedDate";

const TodoForm = ({ addTask }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addTask({
      id: uuidv4(),
      task: data.task,
      dueDate: data.dueDate,
      completed: false,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 relative">
      <div className="flex flex-col md:flex-row items-start md:items-center mb-2 w-full">
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 mb-7 md:mb-0 md:mr-2 relative">
          <input
            {...register("task", { required: "Task is required" })}
            type="text"
            placeholder="Add a new task"
            className={`p-2 border rounded ${
              errors.task ? "border-red-500" : "border-gray-300"
            } bg-white dark:bg-gray-700 text-black dark:text-white`}
          />
          {errors.task && (
            <span className="text-red-500 absolute -bottom-6">{`* ${errors.task.message}`}</span>
          )}
        </div>

        <div className="flex flex-col w-full md:w-[200px] mb-7 md:mb-0 md:mr-2 relative ">
          <input
            {...register("dueDate", { required: "Due date is required" })}
            type="date"
            min={today}
            className={`p-2 border rounded ${
              errors.dueDate ? "border-red-500" : "border-gray-300"
            } bg-white dark:bg-gray-700 text-black dark:text-white`}
          />
          {errors.dueDate && (
            <span className="text-red-500 absolute -bottom-6">{`* ${errors.dueDate.message}`}</span>
          )}
        </div>

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
