"use client";

import { useTheme } from "../../../components/theme/ThemeProvider";
import { useEffect, useState } from "react";

/**
 * ThemeToggle Component
 * 
 * A button that toggles between dark and light themes.
 * - Uses the useTheme hook from our ThemeProvider
 * - Handles hydration by only rendering after mount
 * - Shows different icons based on current theme
 * 
 * TODO: Add animation for smoother transitions between icons
 * TODO: Consider adding tooltip to explain functionality
 * TODO: Add keyboard accessibility improvements (focus styles)
 */
const ThemeToggle = () => {
  // State to handle hydration
  const [mounted, setMounted] = useState(false);
  
  // Get theme information from context
  const { theme, setTheme } = useTheme();

  // Only render component after first mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  // Don't render anything until component is mounted
  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 p-2 text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      {/* Sun icon for dark mode (shown when in dark mode) */}
      <svg
        className="hidden h-5 w-5 dark:block"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
      
      {/* Moon icon for light mode (shown when in light mode) */}
      <svg
        className="block h-5 w-5 dark:hidden"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
    </button>
  );
};

export default ThemeToggle;
