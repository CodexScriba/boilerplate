"use client";

/**
 * NavbarScrollBehavior Component
 * 
 * A client component that handles the scroll behavior for the navbar.
 * It detects when the user scrolls past a certain threshold and applies
 * different styling classes accordingly.
 * 
 * Features:
 * - Performance optimized with requestAnimationFrame and passive event listeners
 * - Debounced scroll handler to prevent excessive state updates
 * - Hardware acceleration hints for smoother transitions
 * - Configurable scroll threshold
 * 
 * TODO: Add option to customize transition timing and easing
 * TODO: Consider adding scroll direction detection for hide/show on scroll up/down
 */

import { ReactNode, useEffect, useState, useCallback, useRef } from "react";

interface NavbarScrollBehaviorProps {
  children: ReactNode;
  scrollThreshold?: number;
  debounceTime?: number;
}

export function NavbarScrollBehavior({ 
  children, 
  scrollThreshold = 100,
  debounceTime = 10
}: NavbarScrollBehaviorProps) {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  
  // Optimized scroll handler with debouncing and RAF
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Only update if we've scrolled at least 5px to reduce jitter
    if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;
    
    lastScrollY.current = currentScrollY;
    
    // Clear any existing timeout
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    
    // Debounce the state update
    timeoutId.current = setTimeout(() => {
      if (!ticking.current) {
        ticking.current = true;
        
        window.requestAnimationFrame(() => {
          setScrolled(currentScrollY > scrollThreshold);
          ticking.current = false;
        });
      }
    }, debounceTime);
  }, [scrollThreshold, debounceTime]);
  
  useEffect(() => {
    // Add event listener with the optimized handler
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check in case page is loaded in a scrolled position
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [handleScroll]);
  
  return (
    <div 
      className={`transition-all duration-400 ease-in-out ${
        scrolled 
          ? "navbar-scrolled" 
          : "navbar-top"
      }`}
      style={{ 
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      {children}
    </div>
  );
}
