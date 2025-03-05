import Link from "next/link";
import Image from "next/image";
import { NavLogoProps } from "../types";

export function NavLogo({ size = 95, priority = true }: NavLogoProps) {
  return (
    <Link className="font-semibold" href="/" aria-label="Home">
      <Image
        src="/images/Logo.svg"
        alt="Logo"
        width={size}
        height={size}
        priority={priority}
      />
    </Link>
  );
}