/**
 * Tablet Navbar Component
 * 
 * Tablet-optimized version of the navbar
 * - Fixed to top of screen with semi-transparent background
 * - Uses Framer Motion for smooth animations
 * - Slightly condensed compared to desktop
 * - Contains logo, navigation links with icons, language switcher, auth buttons, and theme toggle
 * 
 * TODO: Consider collapsing some elements into dropdown menus
 * TODO: Add hover effects for better touch interaction
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import navLinks from "./NavLinks";
import Logo from "./Logo";
import AuthButtons from "../AuthButtons";
import ThemeToggle from "../../ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/**
 * TabletNavbar Component
 * 
 * Optimized navbar for tablet devices with smooth animations
 * and responsive layout.
 */
const TabletNavbar = () => {
  // Animation variants for smoother transitions
  const navbarVariants = {
    hidden: { 
      y: -100, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 1,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 24
      }
    }
  };

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border shadow-sm"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto px-3 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 mr-2"
            variants={itemVariants}
          >
            <Logo />
          </motion.div>
          
          {/* Navigation Links */}
          <motion.nav 
            className="flex items-center space-x-4"
            variants={itemVariants}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                variants={itemVariants}
                custom={index}
              >
                <Link 
                  href={link.href}
                  className="flex items-center gap-1 text-xs font-medium transition-colors hover:text-primary"
                >
                  {link.icon}
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
          
          {/* Right Side Actions */}
          <motion.div 
            className="flex items-center space-x-2"
            variants={itemVariants}
          >
            <LanguageSwitcher />
            <AuthButtons />
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TabletNavbar;
