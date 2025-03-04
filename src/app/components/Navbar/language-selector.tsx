"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";

type LanguageSelectorProps = {
  languages: { code: string; name: string }[];
};

export function LanguageSelector({ languages }: LanguageSelectorProps) {
  const [selectedLang, setSelectedLang] = useState("en");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <span className="hidden sm:inline">Language</span>
          <span className="sm:hidden">{selectedLang.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className="flex items-center gap-2"
          >
            {selectedLang === lang.code && (
              <Check className="h-4 w-4" />
            )}
            <span className={selectedLang === lang.code ? "font-medium" : ""}>
              {lang.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}