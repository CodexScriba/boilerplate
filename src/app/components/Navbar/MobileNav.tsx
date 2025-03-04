import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "./client/MobileMenu";

export function MobileNav() {
  return (
    <div className="w-full px-4 py-3 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-semibold text-lg">
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={65}
            height={65}
            priority
          />
        </Link>

        {/* Hamburger Button (client component) */}
        <MobileMenu />
      </div>
    </div>
  );
}
