import React, { useState } from 'react';
import { CheckCircle2, Play, Pause, Copy, Check, FileText, Layers, Film } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function VideoOutput({ videoData, selectedOptions }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeQuality, setActiveQuality] = useState(selectedOptions.qualities[selectedOptions.qualities.length - 1] || '1080p');
  const [copied, setCopied] = useState(false);
  const [showManifestModal, setShowManifestModal] = useState(false);

  const manifestUrl = `https://cdn.transcodex.io/streams/vid_${Math.floor(1000 + Math.random() * 9000)}/master.m3u8`;

  const handleCopyManifest = () => {
    navigator.clipboard.writeText(manifestUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleM3U8Content = `#EXTM3U
#EXT-X-VERSION:6
#EXT-X-INDEPENDENT-SEGMENTS

# 360p Low Bandwidth Rendition (Mobile)
#EXT-X-STREAM-INF:BANDWIDTH=800000,AVERAGE-BANDWIDTH=750000,RESOLUTION=640x360,FRAME-RATE=30.000,CODECS="avc1.4d401f,mp4a.40.2"
renditions/360p/index.m3u8

# 720p Standard HD Rendition (Web / Tablet)
#EXT-X-STREAM-INF:BANDWIDTH=2500000,AVERAGE-BANDWIDTH=2300000,RESOLUTION=1280x720,FRAME-RATE=30.000,CODECS="avc1.4d401f,mp4a.40.2"
renditions/720p/index.m3u8

# 1080p Full HD Master Rendition (Desktop / Smart TV)
#EXT-X-STREAM-INF:BANDWIDTH=5000000,AVERAGE-BANDWIDTH=4800000,RESOLUTION=1920x1080,FRAME-RATE=30.000,CODECS="avc1.640028,mp4a.40.2"
renditions/1080p/index.m3u8

#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="English",DEFAULT=YES,AUTOSELECT=YES,LANGUAGE="en",URI="captions/en.vtt"`;

  return (
    <div className="card" style={{ marginTop: '1.5rem', border: '1px solid var(--status-success-border)' }}>
      {/* Header */}
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: 'var(--status-success-bg)',
              color: 'var(--status-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--status-success-border)'
            }}
          >
            <CheckCircle2 size={16} />
          </div>
          <div>
            <h2 className="card-title">
              Processing Complete
            </h2>
            <p className="card-description">
              Adaptive bitrate renditions packaged into HLS streaming chunks.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Badge variant="success" dot>
            Adaptive Streaming Ready
          </Badge>
        </div>
      </div>

      {/* Outputs Checklist */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--status-success-bg)',
          border: '1px solid var(--status-success-border)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem'
        }}
      >
        {selectedOptions.qualities.map((q) => (
          <div key={q} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78125rem', fontWeight: 600, color: 'var(--status-success)' }}>
            <CheckCircle2 size={13} />
            <span>{q} Ready</span>
          </div>
        ))}
        {selectedOptions.thumbnail && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78125rem', fontWeight: 600, color: 'var(--status-success)' }}>
            <CheckCircle2 size={13} />
            <span>Thumbnail Ready</span>
          </div>
        )}
        {selectedOptions.captions && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78125rem', fontWeight: 600, color: 'var(--status-success)' }}>
            <CheckCircle2 size={13} />
            <span>Captions Ready</span>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78125rem', fontWeight: 600, color: 'var(--status-success)' }}>
          <CheckCircle2 size={13} />
          <span>HLS Ready</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem' }}>
        {/* Left Column: Video Preview Player */}
        <div>
          <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
            Adaptive Playback Preview
          </div>

          <div
            style={{
              backgroundColor: '#030712',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-color)',
              minHeight: '210px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {videoData?.objectUrl ? (
              <video
                src={videoData.objectUrl}
                controls
                style={{ width: '100%', maxHeight: '260px', objectFit: 'contain' }}
              />
            ) : (
              /* Simulated Adaptive Video Canvas */
              <div
                style={{
                  width: '100%',
                  padding: '2rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #0b1120 0%, #1e293b 100%)',
                  color: '#ffffff',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(37, 99, 235, 0.25)',
                    color: '#60a5fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.625rem',
                    border: '1px solid rgba(96, 165, 250, 0.35)'
                  }}
                >
                  <Film size={22} />
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#f8fafc', marginBottom: '0.2rem' }}>
                  {videoData?.name || 'HLS Adaptive Video Stream'}
                </div>
                <div style={{ fontSize: '0.71875rem', color: '#94a3b8' }}>
                  Simulated HLS stream playing at <strong>{activeQuality}</strong> (Auto-bitrate negotiation)
                </div>

                {/* Interactive Quality Selector Pill */}
                <div
                  style={{
                    marginTop: '1rem',
                    display: 'inline-flex',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '0.2rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    gap: '0.2rem'
                  }}
                >
                  {selectedOptions.qualities.map((q) => (
                    <button
                      key={q}
                      onClick={() => setActiveQuality(q)}
                      style={{
                        background: activeQuality === q ? 'var(--accent-primary)' : 'transparent',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.15rem 0.55rem',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.15s'
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.71875rem', color: 'var(--text-muted)' }}>
            <span>Segments: <strong>32 chunks (6.0s each)</strong></span>
            <span>Protocol: <strong>RFC 8216 HLS</strong></span>
          </div>
        </div>

        {/* Right Column: Master Playlist & Manifest Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
              Master Playlist Endpoint
            </div>

            <div
              style={{
                padding: '0.875rem 1rem',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.71875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  HLS Master Manifest
                </span>
                <span className="code-inline" style={{ fontSize: '0.6875rem' }}>
                  master.m3u8
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.71875rem',
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-surface)',
                  padding: '0.5rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  wordBreak: 'break-all',
                  userSelect: 'all'
                }}
              >
                {manifestUrl}
              </div>

              <div style={{ display: 'flex', gap: '0.45rem' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyManifest}
                  icon={copied ? Check : Copy}
                  style={{ flex: 1 }}
                >
                  {copied ? 'Copied Manifest URL' : 'Copy Manifest URL'}
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowManifestModal(!showManifestModal)}
                  icon={FileText}
                >
                  {showManifestModal ? 'Hide .m3u8' : 'View .m3u8'}
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Segment Chunks Visualizer */}
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{ fontSize: '0.71875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>Generated HLS Chunks</span>
              <span style={{ color: 'var(--status-success)', fontFamily: 'var(--font-mono)' }}>32 / 32 (.ts)</span>
            </div>
            <div style={{ display: 'flex', gap: '2px', height: '12px', borderRadius: '3px', overflow: 'hidden' }}>
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  title={`segment_${String(i).padStart(3, '0')}.ts (6.0s)`}
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--accent-primary)',
                    opacity: 0.65 + (i % 3) * 0.15,
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible Manifest Modal */}
      {showManifestModal && (
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
            <span style={{ fontSize: '0.78125rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              master.m3u8 (HLS Multivariant Playlist)
            </span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>RFC 8216 Compliant</span>
          </div>
          <pre className="code-box" style={{ fontSize: '0.71875rem', maxHeight: '200px', overflowY: 'auto' }}>
            <code>{sampleM3U8Content}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
