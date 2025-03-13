/**
 * Desktop Navbar Component
 * 
 * Desktop version of the navbar
 * - Centered and rounded design when at top of page
 * - Transforms to full-width sticky navbar on scroll
 * - Uses Framer Motion for smooth animations
 * - Contains logo, navigation links with icons, language switcher, auth buttons, and theme toggle
 * 
 * TODO: Add dropdown menus for nested navigation
 * TODO: Consider adding active state indicators for current page
 * TODO: Improve accessibility with proper ARIA attributes
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import navLinks from "./NavLinks";
import Logo from "./Logo";
import AuthButtons from "./AuthButtons";
import ThemeToggle from "../ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/**
 * DesktopNavbar Component
 * 
 * Handles the desktop version of the navbar with smooth animations
 * between centered and full-width states.
 */
const DesktopNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Track scroll position to transform navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Set initial scroll state
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div 
      className={cn(
        "z-50",
        scrolled 
          ? "fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border shadow-md" 
          : "absolute left-0 right-0 mx-auto max-w-6xl mt-4 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-sm"
      )}
      layout
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26,
        mass: 1,
        // For contraction animation (going back to centered)
        ...(scrolled ? {} : {
          type: "tween",
          ease: [0.25, 0.1, 0.25, 1.0],
          duration: 0.4,
        })
      }}
    >
      <div className={cn(
        "px-4 py-2",
        scrolled ? "max-w-6xl mx-auto" : ""
      )}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 mr-2">
            <Logo />
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <AuthButtons />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DesktopNavbar;
