/**
 * useMediaQuery Hook
 * 
 * A custom React hook that provides a way to check if a media query matches
 * the current viewport size. This is useful for responsive designs where
 * you need to conditionally render components based on screen size.
 * 
 * @param query - The media query to check against (e.g., "(min-width: 768px)")
 * @returns A boolean indicating whether the media query matches
 * 
 * TODO: Add support for server-side rendering
 * TODO: Consider adding debounce to prevent excessive re-renders
 */

"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook for detecting if a media query matches
 * 
 * @param query - CSS media query string
 * @returns boolean - Whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with false to prevent hydration mismatch
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Create a media query list
    const mediaQuery = window.matchMedia(query);
    
    // Set the initial value
    setMatches(mediaQuery.matches);
    
    // Define the event listener
    const handleResize = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add the event listener
    mediaQuery.addEventListener("change", handleResize);
    
    // Clean up the event listener
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [query]); // Re-run if the query changes
  
  return matches;
}

export default useMediaQuery;
