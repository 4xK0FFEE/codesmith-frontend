"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-toggle"
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <Label htmlFor="theme-toggle" className="flex items-center gap-1.5">
        {theme === "dark" ? (
          <>
            <Moon className="h-4 w-4" />
            <span className="sr-only">Dark Mode</span>
          </>
        ) : (
          <>
            <Sun className="h-4 w-4" />
            <span className="sr-only">Light Mode</span>
          </>
        )}
      </Label>
    </div>
  );
}
