"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-lg transition-all ${
          theme === "light" 
            ? "bg-white text-blue-600 shadow-sm" 
            : "text-gray-500 dark:text-gray-400 hover:text-blue-500"
        }`}
        title="Light Mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-lg transition-all ${
          theme === "dark" 
            ? "bg-gray-900 text-yellow-400 shadow-sm" 
            : "text-gray-500 dark:text-gray-400 hover:text-yellow-400"
        }`}
        title="Dark Mode"
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-lg transition-all ${
          theme === "system" 
            ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm" 
            : "text-gray-500 dark:text-gray-400"
        }`}
        title="System Preference"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
}
