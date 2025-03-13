"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Theme options
type Theme = "dark" | "light" | "system";

// Theme context type
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

// Theme context definition
type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Create the theme context
const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

/**
 * Theme Provider Component
 * 
 * Provides theme context and functionality for the application
 * - Manages theme state (dark, light, system)
 * - Syncs theme with localStorage
 * - Applies appropriate data-theme attribute to document
 * - Handles system theme preference changes
 * 
 * TODO: Add support for additional theme variants beyond dark/light
 * TODO: Consider adding animation when switching themes
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  // Initialize with default theme (will be updated in useEffect)
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  
  // Initialize theme from localStorage when component mounts (client-side only)
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [storageKey]);

  // Update document classes and localStorage when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove("light", "dark");

    // Add appropriate theme class based on selection
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      root.style.colorScheme = systemTheme;
    } else {
      root.classList.add(theme);
      root.style.colorScheme = theme;
    }

    // Save theme preference to localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // Watch for system theme preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    // Update theme when system preference changes (if using system theme)
    const handleChange = () => {
      if (theme === "system") {
        const root = document.documentElement;
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        
        root.classList.remove("light", "dark");
        root.classList.add(systemTheme);
        root.style.colorScheme = systemTheme;
      }
    };

    // Add event listener for system theme changes
    mediaQuery.addEventListener("change", handleChange);
    
    // Clean up event listener on unmount
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Provide theme context to children
  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * Custom hook to access the theme context
 * 
 * Provides easy access to current theme and setTheme function
 * Throws error if used outside of ThemeProvider
 */
export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
