import React, { useState } from 'react';
import { Code2, Webhook, Copy, Check, ArrowRight, Radio } from 'lucide-react';
import Button from '../common/Button';
import { API_DOCS } from '../../data/mockData';

export default function ApiExample() {
  const [activeLang, setActiveLang] = useState('curl');
  const [copiedRequest, setCopiedRequest] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  const handleCopyRequest = () => {
    navigator.clipboard.writeText(API_DOCS.codeExamples[activeLang]);
    setCopiedRequest(true);
    setTimeout(() => setCopiedRequest(false), 2000);
  };

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(API_DOCS.webhookPayloadExample);
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* REST API Request & Response Documentation */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <Code2 size={16} style={{ color: 'var(--accent-primary)' }} />
              Video Ingestion REST API
            </h2>
            <p className="card-description">
              Trigger asynchronous transcoding jobs programmatically using standard HTTP requests.
            </p>
          </div>

          {/* Language selector tabs */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--bg-subtle)',
              padding: '0.2rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              gap: '0.2rem'
            }}
          >
            {[
              { id: 'curl', label: 'cURL' },
              { id: 'javascript', label: 'Node.js' },
              { id: 'python', label: 'Python' }
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setActiveLang(lang.id)}
                style={{
                  background: activeLang === lang.id ? 'var(--bg-surface)' : 'transparent',
                  color: activeLang === lang.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: activeLang === lang.id ? 600 : 500,
                  boxShadow: activeLang === lang.id ? 'var(--shadow-xs)' : 'none',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
          {/* Request Box */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: '#ffffff',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '0.125rem 0.35rem',
                    borderRadius: 'var(--radius-xs)'
                  }}
                >
                  POST
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  /api/v1/videos
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                icon={copiedRequest ? Check : Copy}
                onClick={handleCopyRequest}
                style={{ fontSize: '0.71875rem', padding: '0.2rem 0.45rem' }}
              >
                {copiedRequest ? 'Copied' : 'Copy'}
              </Button>
            </div>

            <pre className="code-box" style={{ maxHeight: '240px', overflowY: 'auto' }}>
              <code>{API_DOCS.codeExamples[activeLang]}</code>
            </pre>
          </div>

          {/* Response Box */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span
                  style={{
                    backgroundColor: 'var(--status-success)',
                    color: '#ffffff',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '0.125rem 0.35rem',
                    borderRadius: 'var(--radius-xs)'
                  }}
                >
                  202 ACCEPTED
                </span>
                <span style={{ fontSize: '0.71875rem', color: 'var(--text-muted)' }}>Response Payload</span>
              </div>
            </div>

            <pre className="code-box" style={{ maxHeight: '240px', overflowY: 'auto' }}>
              <code>{API_DOCS.responseExample}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Webhook & Callback System */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <Webhook size={16} style={{ color: 'var(--accent-primary)' }} />
              Asynchronous Webhook Subscriptions
            </h2>
            <p className="card-description">
              Receive instant callbacks to your application server once cloud worker transcoding finishes.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={copiedWebhook ? Check : Copy}
            onClick={handleCopyWebhook}
            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
          >
            {copiedWebhook ? 'Copied' : 'Copy Payload'}
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1rem', alignItems: 'start' }}>
          {/* Webhook Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.71875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                Configured Webhook Endpoint
              </label>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78125rem',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              >
                {API_DOCS.webhookUrl}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.71875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                Subscribed Event
              </label>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.3rem 0.55rem', backgroundColor: 'var(--accent-primary-subtle)', border: '1px solid var(--accent-primary-border)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-primary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                ● {API_DOCS.webhookEvent}
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, padding: '0.625rem 0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              Webhooks are signed using <code>HMAC-SHA256</code> headers so your backend server can verify authenticity before serving playback URLs.
            </div>
          </div>

          {/* Webhook Payload JSON */}
          <div>
            <div style={{ fontSize: '0.71875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
              Example Webhook Event Body
            </div>
            <pre className="code-box" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <code>{API_DOCS.webhookPayloadExample}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Developer Integration Lifecycle Flow Diagram */}
      <div className="card">
        <div className="card-header" style={{ marginBottom: '0.75rem', paddingBottom: '0.625rem' }}>
          <h2 className="card-title" style={{ fontSize: '0.875rem' }}>
            <Radio size={15} style={{ color: 'var(--accent-primary)' }} />
            Developer Integration Lifecycle
          </h2>
          <span style={{ fontSize: '0.71875rem', color: 'var(--text-muted)' }}>Non-blocking Asynchronous Pattern</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            padding: '0.75rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}
        >
          {[
            { step: '1', title: 'Your Application', desc: 'Initiates upload' },
            { step: '2', title: 'TranscodeX API', desc: 'Queues transcode job' },
            { step: '3', title: 'Processing Pipeline', desc: 'FFmpeg workers run' },
            { step: '4', title: 'Webhook Callback', desc: 'Delivers master.m3u8' },
            { step: '5', title: 'Your Application', desc: 'Serves adaptive video' }
          ].map((item, idx) => (
            <React.Fragment key={item.step}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  flex: '1 1 150px'
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#ffffff',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.78125rem', color: 'var(--text-primary)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    {item.desc}
                  </div>
                </div>
              </div>

              {idx < 4 && (
                <ArrowRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
