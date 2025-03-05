"use client";

import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LangSwitcherProps } from "../types";

interface Language {
  value: string;
  label: string;
}

const languages: Language[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
];

export function LangSwitcher({ className = "" }: LangSwitcherProps) {
  const handleLanguageChange = useCallback((value: string) => {
    // Here you could implement actual language change logic
    console.log(`Language changed to: ${value}`);
  }, []);

  return (
    <Select defaultValue="en" onValueChange={handleLanguageChange}>
      <SelectTrigger 
        className={`w-[120px] md:w-[150px] lg:w-[180px] !rounded-xl border !ring-offset-0 ${className}`}
        aria-label="Select language"
      >
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="!rounded-xl">
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}