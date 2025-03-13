/**
 * Main Navbar Component
 * 
 * Responsive navbar that renders different variants based on screen size:
 * - Desktop: For large screens (lg and up)
 * - Tablet: For medium screens (md)
 * - Mobile: For small screens (sm and below)
 * 
 * Uses Framer Motion for smooth animations and transitions
 * Maintains consistent styling and branding across all variants
 * 
 * TODO: Add active state indicators for current page
 * TODO: Consider adding dropdown menus for nested navigation
 */

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DesktopNavbar from "./DesktopNavbar";
import TabletNavbar from "./TabletNavbar";
import MobileNavbar from "./MobileNavbar";

/**
 * Simple media query hook
 * 
 * @param query CSS media query string
 * @returns boolean indicating if the query matches
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Create media query list
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);
    
    // Define handler
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add listener
    mediaQuery.addEventListener("change", handleChange);
    
    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);
  
  return matches;
}

/**
 * Navbar Component
 * 
 * Main navigation component that renders the appropriate navbar
 * variant based on the current screen size.
 */
const Navbar = () => {
  // Track which navbar variant to display based on screen size
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  
  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't render anything until after hydration to prevent mismatch
  if (!mounted) return null;
  
  // Determine which navbar variant to render
  let NavbarComponent;
  if (isDesktop) {
    NavbarComponent = DesktopNavbar;
  } else if (isTablet) {
    NavbarComponent = TabletNavbar;
  } else {
    NavbarComponent = MobileNavbar;
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isDesktop ? "desktop" : isTablet ? "tablet" : "mobile"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.3
        }}
      >
        <NavbarComponent />
      </motion.div>
    </AnimatePresence>
  );
};

export default Navbar;