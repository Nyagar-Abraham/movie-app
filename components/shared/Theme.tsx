"use client";

import { Sun, Moon, Laptop } from "lucide-react";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { themes } from "@/constants";
import { useTheme } from "next-themes";

interface Theme {
  theme: string;
  name: string;
}

export default function ThemeToggle() {
  const { theme: Theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="group hover:bg-dark80-light20  p-5 hover:bg-orange80   "
          size="icon"
        >
          <Sun className="absolute size-6 rotate-0 scale-100  transition-all   dark:rotate-90 dark:scale-0" />
          <Moon className="absolute size-6 rotate-0 scale-0   text-orange80 transition-all   dark:rotate-0 dark:scale-100  text-accent-200 hover:text-accent-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="border-none">
        {themes.map((theme: string) => (
          <DropdownMenuItem
            key={theme}
            className={cn(
              "flex items-center gap-4 border-l-4 hover:border-accent-100",
              {
                " border-accent-200 text-accent-100 ": Theme === theme,
                " border-transparent ": Theme !== theme,
              }
            )}
            onClick={() => setTheme(theme)}
          >
            {theme === "dark" && (
              <Moon
                className={cn({
                  "text-accent-100": Theme === "dark",
                })}
              />
            )}
            {theme === "light" && (
              <Sun
                className={cn({
                  "text-accent-100": Theme === "light",
                })}
              />
            )}
            {theme === "system" && (
              <Laptop
                className={cn({
                  "text-accent-100": Theme === "system",
                })}
              />
            )}
            <span>{theme}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>{" "}
    </DropdownMenu>
  );
}
