/**
 * Main Navbar Component
 * 
 * Responsive navbar that renders different variants based on screen size:
 * - Desktop: For large screens (lg and up)
 * - Tablet: For medium screens (md)
 * - Mobile: For small screens (sm and below)
 * 
 * TODO: Add active state indicators for current page
 * TODO: Consider adding dropdown menus for nested navigation
 * TODO: Implement height-based responsiveness for smaller screens
 */

import DesktopNavbar from "./components/DesktopNavbar";
import MobileNavbar from "./components/MobileNavbar";
import TabletNavbar from "./components/TabletNavbar";

/**
 * Navbar Component
 * 
 * Main navigation component that renders the appropriate navbar
 * variant based on the current screen size.
 */
export function Navbar() {
  return (
    <header role="banner">
      {/* 
        Removed padding-top to eliminate extra space at the top of the header
        while maintaining the navbar visibility
        TODO: Adjust internal component spacing if needed
      */}
      <div className="hidden lg:block">
        <DesktopNavbar />
      </div>
      <div className="hidden md:block lg:hidden">
        <TabletNavbar />
      </div>
      <div className="block md:hidden">
        <MobileNavbar />
      </div>
    </header>
  );
}

// Default export for easier imports
export default Navbar;