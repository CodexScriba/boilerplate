"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { navLinks } from "../config/navLinks";
import { LangSwitcher } from "./LangSwitcher";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <>
      <Button variant="ghost" onClick={toggleMenu} className="p-2">
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-end mb-6">
              <Button variant="ghost" onClick={toggleMenu}>
                <XIcon className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-col space-y-6">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-4">
                {navLinks.map(({ href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center space-x-3 py-2 text-lg font-medium hover:text-primary"
                    onClick={toggleMenu}
                  >
                    {Icon && <Icon className="h-5 w-5 text-secondary" />}
                    <span>{href.substring(1) || "Home"}</span>
                  </Link>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="py-4 border-t border-b">
                <LangSwitcher />
              </div>

              {/* Auth Buttons */}
              <div className="flex flex-col space-y-3 pt-4">
                <Button
                  variant="default"
                  className="rounded-full py-6 w-full bg-secondary text-accent-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link href="/auth/login" onClick={toggleMenu}>
                    Login
                  </Link>
                </Button>

                <Button
                  variant="secondary"
                  className="rounded-full py-6 w-full bg-accent text-accent-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link href="/auth/register" onClick={toggleMenu}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
