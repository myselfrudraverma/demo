import React from 'react';
import { BarChart3, Video, Clock, Database, Radio } from 'lucide-react';
import { DEVELOPER_METRICS } from '../../data/mockData';

export default function UsageCard() {
  const metricCards = [
    {
      ...DEVELOPER_METRICS.videosProcessed,
      icon: Video,
      color: 'var(--accent-primary)',
      bg: 'var(--accent-primary-subtle)'
    },
    {
      ...DEVELOPER_METRICS.encodingMinutes,
      icon: Clock,
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.1)'
    },
    {
      ...DEVELOPER_METRICS.storageUsed,
      icon: Database,
      color: '#0284c7',
      bg: 'rgba(2, 132, 199, 0.1)'
    },
    {
      ...DEVELOPER_METRICS.apiRequests,
      icon: Radio,
      color: 'var(--status-success)',
      bg: 'var(--status-success-bg)'
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <BarChart3 size={16} style={{ color: 'var(--accent-primary)' }} />
            Developer Compute & Usage Metrics
          </h2>
          <p className="card-description">
            Current billing cycle consumption across distributed encoding nodes and API gateways.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
        {metricCards.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              style={{
                padding: '0.875rem 1rem',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {m.label}
                </span>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: m.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: m.color
                  }}
                >
                  <Icon size={14} />
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  {m.value}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  <span>{m.subtext}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
