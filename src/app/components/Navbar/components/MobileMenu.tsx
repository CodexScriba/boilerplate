"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";
import { navLinks } from "../config/navLinks";
import { NavLink } from "./NavLink";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  
  const handleLinkClick = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="p-2 rounded-full"
          aria-label="Toggle menu"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] sm:max-w-md pt-12">
        <div className="flex flex-col space-y-6 mt-4">
          {/* Navigation Links */}
          <div className="flex flex-col space-y-4">
            {navLinks.map((item) => (
              <SheetClose asChild key={item.href}>
                <NavLink
                  item={item}
                  className="py-2 text-lg font-medium"
                  iconClassName="h-5 w-5 mr-3 text-[var(--accent)]"
                  onClick={handleLinkClick}
                />
              </SheetClose>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="py-4 border-t border-b">
            <LanguageSwitcher />
          </div>

          {/* Auth Buttons */}
          <div className="flex flex-col space-y-3 pt-4">
            <SheetClose asChild>
              <Button
                variant="default"
                className="rounded-full py-6 w-full bg-secondary text-accent-foreground hover:bg-primary/90"
                asChild
              >
                <Link href="/auth/login" onClick={handleLinkClick}>
                  Login
                </Link>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button
                variant="secondary"
                className="rounded-full py-6 w-full bg-accent text-accent-foreground hover:bg-primary/90"
                asChild
              >
                <Link href="/auth/register" onClick={handleLinkClick}>
                  Sign Up
                </Link>
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
