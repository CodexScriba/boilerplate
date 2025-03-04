import Link from "next/link";
import Image from "next/image";
import { navLinks } from "./config/navLinks";
import { AuthButtons } from "./client/AuthButtons";
import { LangSwitcher } from "./client/LangSwitcher";

export function DesktopNav() {
  return (
    <div className="w-full flex justify-center px-0">
      <nav className="w-full max-w-7xl mx-4">
        <div className="px-6 py-3 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-full shadow-lg border flex items-center justify-between space-x-6 w-full">
          {/* Logo */}
          <Link className="font-semibold text-lg" href="/">
            <Image
              src="/Logo.svg"
              alt="Logo"
              width={95}
              height={95}
              priority
            />
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-8">
            {navLinks.map(({ href, icon: Icon }) => (
              <div key={href} className="flex items-center space-x-2.5">
                {Icon && <Icon className="h-4 w-4 text-secondary" />}
                <Link
                  className="bg-transparent font-medium hover:text-primary"
                  href={href}
                >
                  {href.substring(1) || "Home"}
                </Link>
              </div>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-6">
            <div className="rounded-full">
              <LangSwitcher />
            </div>
            <AuthButtons />
          </div>
        </div>
      </nav>
    </div>
  );
}
