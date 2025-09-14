"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "orange" | "forest" | "cyberpunk" | "matrix";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("orange");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("metafit-theme") as Theme;
    if (savedTheme && ["orange", "forest", "cyberpunk", "matrix"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
    // Set default theme immediately
    document.documentElement.setAttribute("data-theme", savedTheme || "orange");
    setMounted(true);
  }, []);

  useEffect(() => {
    // Apply theme to document and save to localStorage
    if (mounted) {
      console.log("Setting theme to:", theme);
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("metafit-theme", theme);
      console.log("Theme attribute set:", document.documentElement.getAttribute("data-theme"));
    }
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}