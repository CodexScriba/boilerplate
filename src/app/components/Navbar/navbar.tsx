import Image from "next/image";
import Link from "next/link";
import { LanguageSelector } from "./language-selector";
import { MobileMenu } from "./mobile-menu";
import { navConfig } from "./nav";
import { UserButtons } from "./user-button";

// Main server component that determines screen sizes and renders appropriate navbar
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Desktop Navbar - hidden on smaller screens */}
      <div className="hidden lg:flex h-16 items-center container mx-auto rounded-full my-2 shadow-sm px-6">
        <div className="flex items-center justify-between w-full">
          <nav className="flex items-center gap-6">
            {navConfig.mainNav.map((item, index) => (
              <Link 
                key={index} 
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <LanguageSelector languages={navConfig.languages} />
            <UserButtons />
            <Link href="/" className="ml-4">
              <Image 
                src={navConfig.logo.src} 
                alt={navConfig.logo.alt} 
                width={120} 
                height={40} 
                className="h-8 w-auto" 
              />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Tablet Navbar - hidden on mobile and desktop */}
      <div className="hidden md:flex lg:hidden h-16 items-center container mx-auto rounded-full my-2 shadow-sm px-4">
        <div className="flex items-center justify-between w-full">
          <nav className="flex items-center gap-4">
            {navConfig.mainNav.map((item, index) => (
              <Link 
                key={index} 
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <LanguageSelector languages={navConfig.languages} />
            <UserButtons compact />
            <Link href="/" className="ml-3">
              <Image 
                src={navConfig.logo.src} 
                alt={navConfig.logo.alt} 
                width={100} 
                height={32} 
                className="h-7 w-auto" 
              />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Navbar with hamburger menu - hidden on tablet and desktop */}
      <div className="md:hidden flex h-14 items-center justify-between px-4">
        <MobileMenu 
          navItems={navConfig.mainNav} 
          languages={navConfig.languages} 
        />
        
        <Link href="/" className="flex-shrink-0">
          <Image 
            src={navConfig.logo.src} 
            alt={navConfig.logo.alt} 
            width={90} 
            height={30} 
            className="h-6 w-auto" 
          />
        </Link>
      </div>
    </header>
  );
}