"use client";

import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Theme Toggle Component
 * 
 * Provides a dropdown menu to switch between light, dark, and system themes
 * - Shows current theme icon (sun for light, moon for dark) with smooth animations
 * - Dropdown menu with options for light, dark, and system themes
 * - Compact prop for smaller button size on mobile/tablet views
 * - Uses framer-motion for sleek animations and transitions
 * - Includes ripple effect animation when clicking the toggle button
 * 
 * TODO: Consider adding keyboard shortcuts for theme switching
 * TODO: Add haptic feedback for mobile devices
 */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('Theme');
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0 });

  // Only show the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the actual theme (resolving system preference if needed)
  const resolveTheme = () => {
    if (!mounted) return "light";
    
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return theme;
  };

  const currentTheme = resolveTheme();

  // Handle ripple effect
  const handleRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipple({ active: true, x, y });
    
    // Reset ripple after animation completes
    setTimeout(() => {
      setRipple({ active: false, x: 0, y: 0 });
    }, 600);
  };

  // Animation variants for the icons
  const iconVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.5, 
      rotate: currentTheme === "dark" ? 45 : -45,
      y: currentTheme === "dark" ? -20 : 20 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        duration: 0.5 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.5, 
      rotate: currentTheme === "dark" ? -45 : 45,
      y: currentTheme === "dark" ? 20 : -20,
      transition: { 
        duration: 0.3,
        ease: "easeInOut" 
      } 
    },
    hover: {
      scale: 1.15,
      rotate: currentTheme === "dark" ? -10 : 10,
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    }
  };

  // Animation variants for the dropdown items
  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    hover: { 
      scale: 1.05, 
      x: 5,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  // Animation for the button background
  const buttonVariants = {
    hover: { 
      backgroundColor: "rgba(var(--secondary), 0.2)",
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  // Ripple animation variants
  const rippleVariants = {
    initial: { 
      opacity: 0.7,
      scale: 0,
    },
    animate: { 
      opacity: 0,
      scale: 4,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      } 
    }
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          className={`rounded-full ${compact ? 'w-9 h-9' : 'w-10 h-10'} overflow-hidden theme-transition relative`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          onClick={handleRipple}
        >
          {/* Ripple effect */}
          {ripple.active && (
            <motion.div
              className="absolute rounded-full bg-primary/20"
              style={{ 
                width: 20, 
                height: 20, 
                left: ripple.x - 10, 
                top: ripple.y - 10,
                zIndex: 0
              }}
              variants={rippleVariants}
              initial="initial"
              animate="animate"
            />
          )}
          
          <Button 
            variant="ghost" 
            size={compact ? "sm" : "default"}
            className={`w-full h-full p-0 bg-transparent hover:bg-transparent relative overflow-hidden transition-all duration-300 ease-in-out`}
            aria-label="Toggle theme"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                {currentTheme === "light" ? (
                  <motion.div
                    key="sun"
                    className="absolute"
                    initial="initial"
                    animate={isHovering ? "hover" : "animate"}
                    exit="exit"
                    variants={iconVariants}
                  >
                    <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    className="absolute"
                    initial="initial"
                    animate={isHovering ? "hover" : "animate"}
                    exit="exit"
                    variants={iconVariants}
                  >
                    <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 p-2 theme-transition"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={itemVariants} whileHover="hover">
            <DropdownMenuItem 
              onClick={() => setTheme("light")}
              className="flex items-center gap-2 cursor-pointer transition-all duration-200 rounded-md px-3 py-2 mb-1"
            >
              <Sun className="h-4 w-4 text-amber-500" />
              {t('light')}
            </DropdownMenuItem>
          </motion.div>
          
          <motion.div variants={itemVariants} whileHover="hover">
            <DropdownMenuItem 
              onClick={() => setTheme("dark")}
              className="flex items-center gap-2 cursor-pointer transition-all duration-200 rounded-md px-3 py-2 mb-1"
            >
              <Moon className="h-4 w-4 text-indigo-400" />
              {t('dark')}
            </DropdownMenuItem>
          </motion.div>
          
          <motion.div variants={itemVariants} whileHover="hover">
            <DropdownMenuItem 
              onClick={() => setTheme("system")}
              className="flex items-center gap-2 cursor-pointer transition-all duration-200 rounded-md px-3 py-2"
            >
              <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('system')}
            </DropdownMenuItem>
          </motion.div>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
