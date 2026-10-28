import React, { useState } from 'react';
import { Key, Eye, EyeOff, Copy, Check, AlertTriangle } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { API_DOCS } from '../../data/mockData';

export default function ApiKeyCard() {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(API_DOCS.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <Key size={16} style={{ color: 'var(--accent-primary)' }} />
              API Authentication Key
            </h2>
            <p className="card-description">
              Use your secret key to authenticate REST requests and worker cluster triggers.
            </p>
          </div>
          <Badge variant="success" dot>Live Cluster</Badge>
        </div>

        {/* Key Display Container */}
        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.71875rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              marginBottom: '0.45rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            Secret API Key (Production)
          </label>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.625rem 0.875rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              gap: '0.5rem'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                color: 'var(--text-primary)',
                letterSpacing: revealed ? '0' : '0.06em',
                userSelect: 'all',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {revealed ? API_DOCS.apiKey : API_DOCS.maskedKey}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
              <Button
                variant="secondary"
                size="sm"
                icon={revealed ? EyeOff : Eye}
                onClick={() => setRevealed(!revealed)}
                title={revealed ? 'Hide secret key' : 'Reveal secret key'}
                style={{ padding: '0.3rem 0.55rem', fontSize: '0.71875rem' }}
              >
                {revealed ? 'Hide' : 'Reveal'}
              </Button>

              <Button
                variant="primary"
                size="sm"
                icon={copied ? Check : Copy}
                onClick={handleCopy}
                title="Copy API key to clipboard"
                style={{ padding: '0.3rem 0.55rem', fontSize: '0.71875rem' }}
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Warning Box */}
      <div
        style={{
          padding: '0.75rem 0.875rem',
          backgroundColor: 'var(--status-warning-bg)',
          border: '1px solid var(--status-warning-border)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.5rem',
          fontSize: '0.78125rem',
          color: 'var(--status-warning)'
        }}
      >
        <AlertTriangle size={15} style={{ marginTop: '0.1rem', flexShrink: 0 }} />
        <div>
          <strong style={{ display: 'block', marginBottom: '0.1rem' }}>Security Note</strong>
          Keep your API key secure. Do not expose it in client-side applications or public repositories.
        </div>
      </div>
    </div>
  );
}
