/**
 * Navigation links configuration
 * 
 * Centralized place to define all navigation links
 * - Easy to add, remove, or modify links
 * - Used by all navbar variants (desktop, tablet, mobile)
 * - Includes icons for better visual identification
 * 
 * TODO: Add support for nested dropdown menus
 * TODO: Add support for active link highlighting
 */

import { Briefcase, Info, Mail } from "lucide-react";
import { ReactNode } from "react";

export type NavLink = {
  label: string;
  href: string;
  icon: ReactNode; // Icon for the link
};

export const navLinks: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    label: "About Us",
    href: "/about",
    icon: <Info className="h-4 w-4" />,
  },
  {
    label: "Contact Us",
    href: "/contact",
    icon: <Mail className="h-4 w-4" />,
  },
];

export default navLinks;
