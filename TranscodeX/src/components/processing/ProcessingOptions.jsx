import React from 'react';
import { Sliders, Play, Layers, CheckSquare, Square, Loader2 } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function ProcessingOptions({
  options,
  onOptionsChange,
  onStartProcessing,
  isProcessing,
  isComplete,
  hasVideo
}) {
  const toggleQuality = (quality) => {
    if (isProcessing) return;
    const current = options.qualities;
    const exists = current.includes(quality);
    
    // Ensure at least one quality remains selected
    if (exists && current.length === 1) return;

    const next = exists ? current.filter(q => q !== quality) : [...current, quality];
    onOptionsChange({ ...options, qualities: next });
  };

  const toggleOption = (key) => {
    if (isProcessing) return;
    onOptionsChange({ ...options, [key]: !options[key] });
  };

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <Sliders size={16} style={{ color: 'var(--accent-primary)' }} />
              Transcode Configuration
            </h2>
            <p className="card-description">
              Select adaptive streaming renditions and enhancement workers.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Output Qualities */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                marginBottom: '0.45rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Output Qualities
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {[
                { id: '360p', label: '360p', bitrates: '800 kbps (Mobile)' },
                { id: '720p', label: '720p', bitrates: '2500 kbps (HD)' },
                { id: '1080p', label: '1080p', bitrates: '5000 kbps (FHD)' }
              ].map((item) => {
                const checked = options.qualities.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleQuality(item.id)}
                    style={{
                      padding: '0.65rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: checked ? 'var(--accent-primary-subtle)' : 'var(--bg-subtle)',
                      border: `1.5px solid ${checked ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                      cursor: isProcessing ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem',
                      transition: 'all var(--transition-fast)',
                      boxShadow: checked ? '0 1px 3px rgba(37, 99, 235, 0.12)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.8125rem', color: checked ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                        {item.label}
                      </span>
                      {checked ? (
                        <CheckSquare size={15} style={{ color: 'var(--accent-primary)' }} />
                      ) : (
                        <Square size={15} style={{ color: 'var(--text-muted)' }} />
                      )}
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                      {item.bitrates}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Processing */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                marginBottom: '0.45rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Additional Processing Workers
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              <div
                onClick={() => toggleOption('thumbnail')}
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: options.thumbnail ? 'var(--accent-primary-subtle)' : 'var(--bg-subtle)',
                  border: `1.5px solid ${options.thumbnail ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all var(--transition-fast)',
                  boxShadow: options.thumbnail ? '0 1px 3px rgba(37, 99, 235, 0.12)' : 'none'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: options.thumbnail ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                    Generate Thumbnail
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    Smart keyframe poster
                  </div>
                </div>
                {options.thumbnail ? (
                  <CheckSquare size={15} style={{ color: 'var(--accent-primary)' }} />
                ) : (
                  <Square size={15} style={{ color: 'var(--text-muted)' }} />
                )}
              </div>

              <div
                onClick={() => toggleOption('captions')}
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: options.captions ? 'var(--accent-primary-subtle)' : 'var(--bg-subtle)',
                  border: `1.5px solid ${options.captions ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all var(--transition-fast)',
                  boxShadow: options.captions ? '0 1px 3px rgba(37, 99, 235, 0.12)' : 'none'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: options.captions ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                    Generate Captions
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    AI WebVTT subtitling
                  </div>
                </div>
                {options.captions ? (
                  <CheckSquare size={15} style={{ color: 'var(--accent-primary)' }} />
                ) : (
                  <Square size={15} style={{ color: 'var(--text-muted)' }} />
                )}
              </div>
            </div>
          </div>

          {/* Output Format Details */}
          <div
            style={{
              padding: '0.75rem 0.875rem',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}
          >
            <Layers size={15} style={{ color: 'var(--accent-primary)', marginTop: '0.125rem', flexShrink: 0 }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                <span style={{ fontSize: '0.78125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Output Format:
                </span>
                <Badge variant="info">HLS Adaptive Streaming</Badge>
              </div>
              <p style={{ fontSize: '0.71875rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                Video will be packaged into small streaming segments for adaptive playback.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button CTA */}
      <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <Button
          variant="primary"
          size="lg"
          disabled={!hasVideo || isProcessing}
          onClick={onStartProcessing}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          icon={isProcessing ? Loader2 : Play}
          className={isProcessing ? 'spin-icon' : ''}
        >
          {isProcessing ? 'Transcode Pipeline Running...' : isComplete ? 'Re-Run Pipeline' : 'Start Processing'}
        </Button>
      </div>
    </div>
  );
}
