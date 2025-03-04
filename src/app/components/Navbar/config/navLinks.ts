// Navigation links configuration
import { BookOpen, Newspaper, Info, GraduationCap, Users } from "lucide-react";

export type NavLink = {
  label: string;
  labelMessage: () => string; // This will be replaced with actual translations later
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export const navLinks: NavLink[] = [
  {
    label: "Schools",
    labelMessage: () => "Schools",
    href: "/schools",
    icon: GraduationCap,
  },
  {
    label: "News",
    labelMessage: () => "News",
    href: "/news",
    icon: Newspaper,
  },
  {
    label: "About Us",
    labelMessage: () => "About Us",
    href: "/about",
    icon: Info,
  },
];

// Language options available in the app
export const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
];