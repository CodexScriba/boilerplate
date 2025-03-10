import { LucideIcon } from 'lucide-react';

/**
 * Interface for navigation link items
 * 
 * Each link has a path (href), icon, and either a label or translationKey
 * If both are provided, translationKey takes precedence
 */
export interface NavLinkItem {
  href: string;
  icon: LucideIcon;
  label?: string; // Optional explicit label
  translationKey?: string; // Translation key for i18n
}

export interface NavLogoProps {
  size?: number;
  priority?: boolean;
}

export interface AuthButtonsProps {
  compact?: boolean;
}

// LangSwitcherProps removed as it's now defined in the main LanguageSwitcher component

export interface NavLinkProps {
  item: NavLinkItem;
  showLabel?: boolean;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
}