import Link from "next/link";
import { NavLinkProps } from "../types";
import { useTranslations } from 'next-intl';

/**
 * NavLink component
 * 
 * Renders a navigation link with an icon and optional label
 * Uses next-intl for internationalization of labels
 * 
 * TODO: Add active state styling based on current route
 */
export function NavLink({ 
  item, 
  showLabel = true, 
  className = "", 
  iconClassName = "h-4 w-4 text-secondary",
  onClick
}: NavLinkProps) {
  // Get translations for navigation items
  const t = useTranslations();
  
  const { href, icon: Icon, label, translationKey } = item;
  
  // Use translation key if available, otherwise fallback to label or path
  const displayLabel = translationKey 
    ? t(translationKey) 
    : (label || (href.substring(1) || "Home"));
  
  return (
    <Link
      href={href}
      className={`flex items-center hover:text-primary ${className}`}
      onClick={onClick}
      aria-label={!showLabel ? displayLabel : undefined}
    >
      {Icon && <Icon className={iconClassName} />}
      {showLabel && <span className="ml-2.5">{displayLabel}</span>}
    </Link>
  );
}