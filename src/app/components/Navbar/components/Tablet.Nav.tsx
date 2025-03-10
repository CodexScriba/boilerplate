import { navLinks } from "../config/navLinks";
import { AuthButtons } from "./AuthButtons";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { NavLink } from "./NavLink";
import { NavLogo } from "./NavLogo";

export function TabletNav() {
  return (
    <div className="w-full">
      <nav className="w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-md border-b fixed top-0 left-0 right-0 z-50">
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <NavLogo size={80} />

            {/* Navigation Items - Icons for tablet */}
            <div className="flex items-center space-x-1">
              {navLinks.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  showLabel={false}
                  className="p-2 rounded-full hover:bg-secondary/10 transition-colors"
                  iconClassName="h-5 w-5 text-[var(--accent)]"
                />
              ))}
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-3">
              <LanguageSwitcher className="w-[120px]" />
              <AuthButtons compact={true} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}