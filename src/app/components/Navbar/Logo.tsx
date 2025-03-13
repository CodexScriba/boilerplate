/**
 * Logo Component
 * 
 * Displays the site logo with a link to the homepage
 * - Compact size to avoid taking too much space in navbar
 * - Uses the correct path to the logo
 * - Implemented as a server component for better performance
 * 
 * TODO: Add animation for hover state
 * TODO: Consider adding a smaller version for mobile
 */

import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/Logo.svg"
        alt="Site Logo"
        width={24}
        height={24}
        className="h-6 w-auto"
        priority
      />
    </Link>
  );
};

export default Logo;
