'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

export default function ThemeToggle() {
  const { isDark, toggleTheme, mounted, setMounted } = useThemeStore();

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);
      
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}

