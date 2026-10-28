import React, { useRef, useState } from 'react';
import { UploadCloud, FileVideo, CheckCircle2, X, Sparkles, HardDrive, Film } from 'lucide-react';
import { SAMPLE_VIDEOS } from '../../data/mockData';
import Button from '../common/Button';

export default function UploadPanel({ selectedVideo, onVideoSelect, onClearVideo, isProcessing }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isProcessing) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (isProcessing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file) => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(0);
    const sizeFormatted = sizeInMB > 1024 ? `${(file.size / (1024 * 1024 * 1024)).toFixed(1)} GB` : `${sizeInMB} MB`;
    const ext = file.name.split('.').pop().toUpperCase();

    const videoObj = {
      file: file,
      name: file.name,
      size: file.size,
      sizeFormatted: sizeFormatted,
      type: file.type || 'video/mp4',
      typeLabel: ext || 'MP4',
      objectUrl: URL.createObjectURL(file),
      duration: '03:15',
      resolution: '1920x1080'
    };

    onVideoSelect(videoObj);
  };

  const handleSelectSample = (sample) => {
    if (isProcessing) return;
    onVideoSelect({
      ...sample,
      file: null,
      objectUrl: null
    });
  };

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <UploadCloud size={16} style={{ color: 'var(--accent-primary)' }} />
            Source Video Ingestion
          </h2>
          <p className="card-description">
            Upload raw video asset to initialize the distributed cloud transcode workflow.
          </p>
        </div>
      </div>

      {!selectedVideo ? (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          {/* Drag & Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `1.5px dashed ${isDragging ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-lg)',
              backgroundColor: isDragging ? 'var(--accent-primary-subtle)' : 'var(--bg-subtle)',
              padding: '2rem 1.25rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              minHeight: '200px'
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="video/mp4,video/quicktime,video/webm,video/x-matroska,video/avi,.mp4,.mov,.webm,.mkv,.avi"
              style={{ display: 'none' }}
            />

            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: 'var(--accent-primary-subtle)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--accent-primary-border)'
              }}
            >
              <UploadCloud size={24} />
            </div>

            <div>
              <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                Drag & drop video
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                or <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Select Video</span> from computer
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.71875rem', color: 'var(--text-muted)' }}>
              <span>MP4, MOV, WebM</span>
              <span>•</span>
              <span>Max demo size: 2 GB</span>
            </div>
          </div>

          {/* Quick Sample Selector */}
          <div style={{ marginTop: '1rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
              <Sparkles size={13} style={{ color: 'var(--status-warning)' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Or select demo sample video:
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {SAMPLE_VIDEOS.map((sample) => (
                <button
                  key={sample.name}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.71875rem', padding: '0.3rem 0.55rem' }}
                >
                  <FileVideo size={12} style={{ color: 'var(--accent-primary)' }} />
                  <span>{sample.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.6875rem' }}>({sample.sizeFormatted})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Selected Video Info Display */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, justifyContent: 'space-between' }}>
          <div
            style={{
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--accent-primary-border)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', minWidth: 0 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--accent-primary-subtle)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <FileVideo size={22} />
              </div>

              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '220px'
                    }}
                    title={selectedVideo.name}
                  >
                    {selectedVideo.name}
                  </span>
                  <CheckCircle2 size={14} style={{ color: 'var(--status-success)', flexShrink: 0 }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedVideo.sizeFormatted}</span>
                  <span>•</span>
                  <span style={{ textTransform: 'uppercase', backgroundColor: 'var(--bg-surface)', padding: '0.075rem 0.35rem', borderRadius: '3px', border: '1px solid var(--border-color)', fontSize: '0.6875rem' }}>
                    {selectedVideo.typeLabel}
                  </span>
                  {selectedVideo.resolution && (
                    <>
                      <span>•</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>{selectedVideo.resolution}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {!isProcessing && (
              <button
                type="button"
                onClick={onClearVideo}
                className="btn btn-ghost btn-sm"
                style={{ color: 'var(--text-muted)', padding: '0.25rem' }}
                title="Remove and select another file"
                aria-label="Remove video"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <HardDrive size={15} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Target Storage: <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.71875rem' }}>s3://transcodex-raw/{selectedVideo.name}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
