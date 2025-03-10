import { navLinks } from "../config/navLinks";
import { AuthButtons } from "./AuthButtons";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { NavLink } from "./NavLink";
import { NavLogo } from "./NavLogo";

/**
 * Desktop navigation component
 * 
 * This component is designed to work with the NavbarScrollBehavior wrapper
 * which applies different classes based on scroll position.
 * 
 * Features:
 * - Uses navbar-top-container class for scroll-based styling
 * - Maintains max-width content even in full-screen mode when scrolled
 * - Enhanced with hardware-accelerated transitions for smoother animations
 * - Responsive layout with proper spacing for all screen sizes
 * 
 * TODO: Add hover effects to navigation items
 * TODO: Consider adding dropdown menus for complex navigation structures
 */
export function DesktopNav() {
    return (
      <div className="w-full flex justify-center px-0 transition-all duration-400 ease-out" 
           style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <nav className="w-full max-w-7xl mx-4 transition-all duration-400 ease-out"
             style={{ willChange: 'transform, max-width, margin', transform: 'translateZ(0)' }}>
          <div className="navbar-top-container px-6 py-4 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-full shadow-lg border flex items-center justify-between space-x-6 w-full transition-all duration-400 ease-out"
               style={{ willChange: 'transform, border-radius, padding, box-shadow', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
            
            {/* Content container to maintain max-width in full-screen mode */}
            <div className="navbar-content-container flex items-center justify-between w-full">
              {/* Logo */}
              <NavLogo />
    
              {/* Navigation Items */}
              <div className="flex items-center space-x-8">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    className="bg-transparent font-medium transition-all duration-400 ease-out"
                  />
                ))}
              </div>
    
              {/* Right side items */}
              <div className="flex items-center space-x-6">
                <div className="rounded-full">
                  <LanguageSwitcher />
                </div>
                <AuthButtons />
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }