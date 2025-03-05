import { MobileMenu } from "./MobileMenu";
import { NavLogo } from "./NavLogo";

export function MobileNav() {
  return (
    <div className="w-full">
      <nav className="w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-md border-b fixed top-0 left-0 right-0 z-50">
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLogo size={70} />

            {/* Hamburger Button (client component) */}
            <MobileMenu />
          </div>
        </div>
      </nav>
    </div>
  );
}