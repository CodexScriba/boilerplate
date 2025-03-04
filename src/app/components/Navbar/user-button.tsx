"use client";

import { Button } from "@/components/ui/button";

type UserButtonsProps = {
  compact?: boolean;
};

export function UserButtons({ compact = false }: UserButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size={compact ? "sm" : "default"}
        className="text-sm font-medium text-muted-foreground hover:text-primary"
      >
        Sign In
      </Button>
      <Button 
        size={compact ? "sm" : "default"}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
      >
        Sign Up
      </Button>
    </div>
  );
}