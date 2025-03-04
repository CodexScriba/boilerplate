"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "../config/navLinks";

export function LangSwitcher() {
  // Simple mock implementation for now
  return (
    <Select defaultValue="en">
      <SelectTrigger className="w-[120px] md:w-[150px] lg:w-[180px] !rounded-xl border !ring-offset-0">
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
