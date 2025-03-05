import { LucideIcon } from 'lucide-react';

export interface NavLinkItem {
  href: string;
  icon: LucideIcon;
  label?: string; // Optional explicit label
}

export interface NavLogoProps {
  size?: number;
  priority?: boolean;
}

export interface AuthButtonsProps {
  compact?: boolean;
}

export interface LangSwitcherProps {
  className?: string;
}

export interface NavLinkProps {
  item: NavLinkItem;
  showLabel?: boolean;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
}