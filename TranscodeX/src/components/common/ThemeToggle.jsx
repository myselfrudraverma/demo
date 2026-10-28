import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('transcodex_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('transcodex_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-secondary btn-sm"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.35rem 0.65rem',
        fontSize: '0.8125rem'
      }}
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <>
          <Moon size={15} style={{ color: 'var(--text-secondary)' }} />
          <span>Dark Mode</span>
        </>
      ) : (
        <>
          <Sun size={15} style={{ color: '#f59e0b' }} />
          <span>Light Mode</span>
        </>
      )}
    </button>
  );
}
