import Link from "next/link";
import Image from "next/image";
import { navLinks } from "./config/navLinks";
import { AuthButtons } from "./client/AuthButtons";
import { LangSwitcher } from "./client/LangSwitcher";

export function TabletNav() {
  return (
    <div className="w-full px-4">
      <nav className="w-full">
        <div className="px-4 py-3 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-full shadow-lg border flex items-center justify-between w-full">
          {/* Logo */}
          <Link className="font-semibold text-lg" href="/">
            <Image
              src="/Logo.svg"
              alt="Logo"
              width={75}
              height={75}
              priority
            />
          </Link>

          {/* Navigation Items - Condensed for tablet */}
          <div className="flex items-center space-x-4">
            {navLinks.map(({ href, icon: Icon }) => (
              <div key={href} className="flex items-center">
                {Icon && (
                  <Link
                    className="p-2 rounded-full hover:bg-secondary/10 transition-colors"
                    href={href}
                    aria-label={href.substring(1) || "home"}
                  >
                    <Icon className="h-5 w-5 text-secondary" />
                  </Link>
                )}
              </div>
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
