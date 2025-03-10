import { navLinks } from "../config/navLinks";
import { AuthButtons } from "./AuthButtons";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { NavLink } from "./NavLink";
import { NavLogo } from "./NavLogo";

export function DesktopNav() {
    return (
      <div className="w-full flex justify-center px-0">
        <nav className="w-full max-w-7xl mx-4">
          <div className="px-6 py-4 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-full shadow-lg border flex items-center justify-between space-x-6 w-full">
            {/* Logo */}
            <NavLogo />
  
            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              {navLinks.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  className="bg-transparent font-medium"
                />
              ))}
            </div>
  
            {/* Right side items */}
            <div className="flex items-center space-x-6">
              <div className="rounded-full">
                <LanguageSwitcher />
              </div>
              <AuthButtons />
            </div>
          </div>
        </nav>
      </div>
    );
  }