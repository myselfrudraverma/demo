import React from 'react';
import { Menu } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';

export default function Topbar({ pageTitle, onMenuToggle }) {
  return (
    <header
      style={{
        height: 'var(--topbar-height)',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuToggle}
          className="btn btn-ghost btn-sm mobile-only"
          style={{ display: 'none', padding: '0.35rem' }}
          aria-label="Open navigation menu"
          id="mobile-nav-button"
        >
          <Menu size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h1
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.015em',
              margin: 0
            }}
          >
            {pageTitle}
          </h1>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* System Status Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.25rem 0.65rem',
            backgroundColor: 'var(--status-success-bg)',
            border: '1px solid var(--status-success-border)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'var(--status-success)'
          }}
          title="Cluster health: 100% SLA"
        >
          <span className="pulse-dot" />
          <span style={{ fontWeight: 600 }}>Processing Service Online</span>
        </div>

        {/* Theme Toggle Button */}
        <ThemeToggle />
      </div>
    </header>
  );
}
