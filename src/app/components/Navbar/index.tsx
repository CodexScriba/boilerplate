import { DesktopNav } from "./components/DesktopNav";
import { MobileNav } from "./components/MobileNav";
import { NavbarScrollBehavior } from "./components/NavbarScrollBehavior";
import { TabletNav } from "./components/Tablet.Nav";

/**
 * Main Navbar component that renders different navigation bars based on screen size
 * 
 * Features:
 * - Responsive design with different layouts for desktop, tablet, and mobile
 * - Desktop view has scroll-aware behavior that changes appearance when scrolling
 * - Proper spacing with padding that increases on larger screens
 * 
 * TODO: Consider adding animation to mobile menu toggle
 * TODO: Implement accessibility improvements for keyboard navigation
 */
export function Navbar() {
  return (
    <header role="banner" className="py-4 lg:py-6 sticky top-0 z-50">
      <div className="hidden lg:block">
        <NavbarScrollBehavior>
          <DesktopNav />
        </NavbarScrollBehavior>
      </div>
      <div className="hidden md:block lg:hidden">
        <TabletNav />
      </div>
      <div className="block md:hidden">
        <MobileNav />
      </div>
    </header>
  );
}

// Default export for easier imports
export default Navbar;