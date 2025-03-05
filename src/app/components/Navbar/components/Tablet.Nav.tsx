import { NavLogo } from "./NavLogo";
import { NavLink } from "./NavLink";
import { navLinks } from "../config/navLinks";
import { AuthButtons } from "./AuthButtons";
import { LangSwitcher } from "./LangSwitcher";

export function TabletNav() {
  return (
    <div className="w-full px-4">
      <nav className="w-full">
        <div className="px-4 py-3 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-full shadow-lg border flex items-center justify-between w-full">
          {/* Logo */}
          <NavLogo size={75} />

          {/* Navigation Items - Condensed for tablet */}
          <div className="flex items-center space-x-4">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                showLabel={false}
                className="p-2 rounded-full hover:bg-secondary/10 transition-colors"
                iconClassName="h-5 w-5 text-secondary"
              />
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <LangSwitcher />
            <AuthButtons compact={true} />
          </div>
        </div>
      </nav>
    </div>
  );
}