"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { NavItem } from "./nav";
import { LanguageSelector } from "./language-selector";

type MobileMenuProps = {
  navItems: NavItem[];
  languages: { code: string; name: string }[];
};

export function MobileMenu({ navItems, languages }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="px-2">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-80">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left">Menu</SheetTitle>
          <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <nav className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href}
              className="text-lg font-medium py-2 border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex flex-col gap-4">
          <div className="w-full">
            <LanguageSelector languages={languages} />
          </div>
          <Button variant="outline" className="w-full">Sign In</Button>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">Sign Up</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}