import React, { useState } from "react";
// Import FontAwesomeIcon component to use icons throughout the UI
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import specific icons from FontAwesome for sidebar navigation
import {
  faListUl,
  faAngleDoubleRight,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
// Import ThemeToggle component to toggle between light and dark themes
import ThemeToggle from "../ThemeToggle";

// Sidebar component for navigation and theme toggling
const Sidebar = ({ handleViewChange, tasks, view, toggleTheme }) => {
  // State to manage the visibility of the sidebar on smaller screens
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle menu item click and close the sidebar
  const handleMenuClick = (view) => {
    handleViewChange(view);
    setIsOpen(false); // Close the sidebar after a menu item is clicked
  };

  // Count the number of tasks due in the future
  const upcomingTasksCount = tasks.filter(
    (task) => task.dueDate > new Date().toISOString().split("T")[0]
  ).length;
  
  // Count the number of tasks due today
  const todayTasksCount = tasks.filter(
    (task) => task.dueDate === new Date().toISOString().split("T")[0]
  ).length;

  return (
    <div className="flex">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out p-4 w-20 md:w-64 dark:bg-gray-800 bg-gray-900 text-white`}
      >
        <div className="flex flex-col items-center md:items-start">
          <div className="flex md:flex-row flex-col">
            {/* User initials or logo */}
            <div className="mb-4 cursor-pointer border rounded bg-white p-2">
              <span className="md:inline-block text-black">RA</span>
            </div>
            {/* Theme toggle button */}
            <div className="flex justify-end mb-4">
              <ThemeToggle toggleTheme={toggleTheme} />
            </div>
          </div>
          {/* Button to toggle sidebar visibility on smaller screens */}
          <button
            className="md:hidden text-white mb-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              size="lg"
              alt="Toggle Sidebar"
            />
          </button>
          {/* Sidebar menu items */}
          <ul className="flex flex-col items-center md:items-start w-full">
            {/* Upcoming tasks view */}
            <li
              className={`mb-4 cursor-pointer flex items-center justify-between w-full ${
                view === "upcoming" ? "bg-gray-700" : ""
              } rounded-lg p-2`}
              onClick={() => handleMenuClick("upcoming")}
              title="Upcoming"
            >
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  size="lg"
                  alt="Upcoming"
                />
                <span className="hidden md:inline-block ml-2">Upcoming</span>
              </div>
              <span className="hidden md:inline-block ml-2 border-white border rounded px-2 py-1">
                {upcomingTasksCount}
              </span>
            </li>
            {/* Today's tasks view */}
            <li
              className={`mb-4 cursor-pointer flex items-center justify-between w-full ${
                view === "today" ? "bg-gray-700" : ""
              } rounded-lg p-2`}
              onClick={() => handleMenuClick("today")}
              title="Today"
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={faListUl} size="lg" alt="Today" />
                <span className="hidden md:inline-block ml-2">Today</span>
              </div>
              <span className="hidden md:inline-block ml-2 border-white border rounded px-2 py-1">
                {todayTasksCount}
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* Sidebar toggle button for smaller screens */}
      <div className="flex-1 p-4 md:hidden inset-y-0 left-0 duration-200 w-16">
        <button className="md:hidden mb-4" onClick={() => setIsOpen(!isOpen)}>
          {!isOpen && (
            <FontAwesomeIcon
              icon={faBars}
              size="lg"
              alt="open sidebar"
              color={`dark:text-white text-black`}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
