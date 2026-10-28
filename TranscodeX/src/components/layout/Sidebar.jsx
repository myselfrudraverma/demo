import React from 'react';
import { NavLink } from 'react-router-dom';
import { Video, Activity, Code2, Server, Cloud, Cpu, ChevronRight, X } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    {
      label: 'Processing',
      path: '/',
      icon: Video,
      description: 'Upload & Transcode Pipeline'
    },
    {
      label: 'Jobs',
      path: '/jobs',
      icon: Activity,
      description: 'Encoding Queue & History'
    },
    {
      label: 'Developer Zone',
      path: '/developer',
      icon: Code2,
      description: 'API, SDK & Webhooks'
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 40,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}

      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'var(--sidebar-width)',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          transition: 'transform var(--transition-normal), background-color var(--transition-normal)',
          transform: isOpen ? 'translateX(0)' : undefined
        }}
        className={isOpen ? 'sidebar-open' : 'sidebar-normal'}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '1.125rem 1.25rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)'
              }}
            >
              <Cpu size={18} strokeWidth={2.2} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span
                  style={{
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    color: 'var(--text-primary)'
                  }}
                >
                  Transcode<span style={{ color: 'var(--accent-primary)' }}>X</span>
                </span>
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    backgroundColor: 'var(--accent-primary-subtle)',
                    color: 'var(--accent-primary)',
                    padding: '0.075rem 0.3rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--accent-primary-border)'
                  }}
                >
                  Cloud
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.6875rem',
                  color: 'var(--text-muted)',
                  display: 'block'
                }}
              >
                Media Infrastructure
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm mobile-only"
              style={{ padding: '0.25rem' }}
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <div style={{ padding: '1rem 0.75rem', flex: 1 }}>
          <div
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--text-muted)',
              padding: '0 0.5rem 0.5rem'
            }}
          >
            Platform Menu
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--accent-primary-subtle)' : 'transparent',
                    border: isActive ? '1px solid var(--accent-primary-border)' : '1px solid transparent',
                    transition: 'all var(--transition-fast)'
                  })}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={13} style={{ opacity: 0.4 }} />
                </NavLink>
              );
            })}
          </nav>

          {/* Cloud Nodes Mini Status Box */}
          <div
            style={{
              marginTop: '1.75rem',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.45rem' }}>
              <Server size={13} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontSize: '0.71875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Active Workers
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.71875rem', color: 'var(--text-secondary)' }}>
              <span>Distributed Nodes:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>6 / 8 online</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.71875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              <span>Queue Latency:</span>
              <span style={{ fontWeight: 600, color: 'var(--status-success)', fontFamily: 'var(--font-mono)' }}>~12ms</span>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div
          style={{
            padding: '1rem 1.125rem',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Cloud size={15} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <div style={{ fontSize: '0.71875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Cloud Video Infrastructure
              </div>
              <div style={{ fontSize: '0.65625rem', color: 'var(--text-muted)' }}>
                Adaptive HLS Multi-Bitrate Engine
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
