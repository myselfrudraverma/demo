import React from 'react';

export default function Badge({ 
  children, 
  variant = 'subtle', // 'success' | 'warning' | 'error' | 'info' | 'subtle'
  dot = false,
  className = ''
}) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {dot && <span className="badge-dot" />}
      {children}
    </span>
  );
}
