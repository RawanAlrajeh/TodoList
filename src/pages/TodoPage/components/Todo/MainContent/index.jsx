import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TodoList from "../TodoList";
import TodoForm from "../TodoForm";

const MainContent = ({
  tasks,
  addTask,
  selectTask,
  toggleComplete,
  view,
  handleSearchChange,
}) => {
  return (
    <div className="flex flex-col p-4 gap-4 w-full">
      <div className="flex items-center gap-x-4">
        <h1 className="text-2xl font-bold">
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </h1>
        <div className="border-black border rounded bg-white dark:bg-gray-700 px-2 py-1">
          <span className="text-black dark:text-white">{tasks.length}</span>
        </div>
      </div>

      <TodoForm addTask={addTask} />

      <div className="relative mb-4 w-full md:w-1/2 lg:w-1/3">
        <input
          type="text"
          placeholder="You can search by task name"
          className="w-full p-2 border rounded pl-10 bg-white dark:bg-gray-800 text-black dark:text-white"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faSearch}
          size="lg"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <TodoList
        tasks={tasks}
        selectTask={selectTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};

export default MainContent;
