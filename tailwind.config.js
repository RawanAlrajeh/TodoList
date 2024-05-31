/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "100%": { Transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5 infinite",
      },
    },
  },
  plugins: [],
};
