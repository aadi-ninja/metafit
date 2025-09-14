"use client";

import { useTheme, type Theme } from "@/contexts/ThemeContext";
import { PaletteIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const themes: { value: Theme; label: string; description: string; preview: string }[] = [
  {
    value: "orange",
    label: "Orange Cream",
    description: "Warm orange with soft cream background",
    preview: "bg-gradient-to-r from-orange-500 to-orange-100",
  },
  {
    value: "forest",
    label: "Forest Green",
    description: "Fresh green with natural light theme",
    preview: "bg-gradient-to-r from-green-600 to-green-100",
  },
  {
    value: "cyberpunk",
    label: "Cyberpunk Blue",
    description: "Electric blue with dark background",
    preview: "bg-gradient-to-r from-cyan-400 to-slate-800",
  },
  {
    value: "matrix",
    label: "Matrix Yellow",
    description: "Terminal green-yellow with black background",
    preview: "bg-gradient-to-r from-yellow-400 to-stone-900",
  },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10"
        >
          <PaletteIcon size={16} />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.value}
            onClick={() => {
              console.log("Switching theme to:", themeOption.value);
              setTheme(themeOption.value);
            }}
            className={`flex items-center gap-3 p-3 ${
              theme === themeOption.value ? "bg-primary/10" : ""
            }`}
          >
            <div className={`w-6 h-6 rounded-full ${themeOption.preview}`} />
            <div className="flex-1">
              <div className="font-medium">{themeOption.label}</div>
              <div className="text-xs text-muted-foreground">
                {themeOption.description}
              </div>
            </div>
            {theme === themeOption.value && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}