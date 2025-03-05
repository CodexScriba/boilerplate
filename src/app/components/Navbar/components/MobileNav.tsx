import { MobileMenu } from "./MobileMenu";
import { NavLogo } from "./NavLogo";

export function MobileNav() {
  return (
    <div className="w-full px-4 py-3 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <NavLogo size={65} />

        {/* Hamburger Button (client component) */}
        <MobileMenu />
      </div>
    </div>
  );
}