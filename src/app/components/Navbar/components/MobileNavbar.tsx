/**
 * Mobile Navbar Component
 * 
 * Mobile-optimized version of the navbar
 * - Fixed to top of screen with semi-transparent background
 * - Uses Framer Motion for smooth animations
 * - Hamburger menu for navigation links
 * - Slide-out drawer for menu items
 * - Compact header with essential elements
 * - Shows icons for each navigation link
 * 
 * TODO: Add bottom navigation bar for key actions
 * TODO: Improve accessibility for mobile menu
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import navLinks from "./NavLinks";
import Logo from "./Logo";
import AuthButtons from "../AuthButtons";
import ThemeToggle from "../../ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/**
 * MobileNavbar Component
 * 
 * Responsive navbar for mobile devices with smooth animations
 * and a slide-out menu.
 */
const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  
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
        mass: 1
      }
    }
  };

  const menuItemVariants = {
    hidden: { 
      x: -20, 
      opacity: 0 
    },
    visible: (i: number) => ({ 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 24,
        delay: i * 0.05
      }
    })
  };

  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1
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
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          >
            <Logo />
          </motion.div>
          
          {/* Mobile Actions */}
          <motion.div 
            className="flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <ThemeToggle />
            
            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-1 p-1 h-auto">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[350px] p-0">
                <motion.div 
                  className="flex flex-col h-full p-4"
                  variants={menuContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div 
                    className="flex items-center justify-between py-2"
                    variants={menuItemVariants}
                    custom={0}
                  >
                    <Logo />
                    <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="p-1 h-auto">
                      <X className="h-5 w-5" />
                    </Button>
                  </motion.div>
                  
                  {/* Mobile Navigation Links */}
                  <motion.nav 
                    className="flex flex-col gap-3 py-4"
                    variants={menuContainerVariants}
                  >
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        variants={menuItemVariants}
                        custom={index + 1}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link 
                          href={link.href}
                          className="flex items-center gap-3 text-base font-medium py-1 transition-colors hover:text-primary"
                          onClick={() => setOpen(false)}
                        >
                          <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {link.icon}
                          </motion.div>
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.nav>
                  
                  <motion.div 
                    className="mt-auto space-y-3 py-4"
                    variants={menuContainerVariants}
                  >
                    <motion.div variants={menuItemVariants} custom={navLinks.length + 1}>
                      <LanguageSwitcher />
                    </motion.div>
                    <motion.div variants={menuItemVariants} custom={navLinks.length + 2} className="py-1">
                      <AuthButtons />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileNavbar;
