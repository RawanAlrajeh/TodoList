import React from 'react';
// Import FontAwesomeIcon component to use icons throughout the UI
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle = ({ toggleTheme, darkMode }) => {
  return (
    <div className="flex items-center">

      <div className="relative inline-block w-12 mx-2 align-middle select-none transition duration-200 ease-in">
        {/* Checkbox input for theme toggle */}
        <input
          type="checkbox"
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          checked={darkMode} // Set checked state based on darkMode prop
          onChange={toggleTheme} // Call toggleTheme function on change
        />
        {/* Span for custom styling of the toggle switch */}
        <span className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"></span>
      </div>
      {/* Icon for dark mode */}
      <FontAwesomeIcon icon={faMoon} className="text-gray-600 dark:text-yellow-500" />
    </div>
  );
};

export default ThemeToggle;
