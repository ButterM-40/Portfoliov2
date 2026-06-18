'use client';
import { useState, useEffect } from 'react';

export type Theme = 'coral' | 'midnight';
const THEME_KEY = 'portfolio-theme';

export function useTheme(defaultTheme: Theme = 'coral') {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved === 'coral' || saved === 'midnight') setTheme(saved);

    function onStorage(e: StorageEvent) {
      if (e.key === THEME_KEY) {
        const val = e.newValue as Theme | null;
        if (val === 'coral' || val === 'midnight') setTheme(val);
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === 'coral' ? 'midnight' : 'coral';
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }

  return { theme, toggleTheme };
}
