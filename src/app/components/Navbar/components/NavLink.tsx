import Link from "next/link";
import { NavLinkProps } from "../types";

export function NavLink({ 
  item, 
  showLabel = true, 
  className = "", 
  iconClassName = "h-4 w-4 text-secondary",
  onClick
}: NavLinkProps) {
  const { href, icon: Icon, label } = item;
  const displayLabel = label || (href.substring(1) || "Home");
  
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