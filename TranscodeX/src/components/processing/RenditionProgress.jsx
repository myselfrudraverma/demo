import React from 'react';
import { Loader2, CheckCircle2, Film, Image, Subtitles, Server } from 'lucide-react';
import Badge from '../common/Badge';

export default function RenditionProgress({
  progressState,
  selectedOptions
}) {
  const { stage, renditions, thumbnailStatus, captionsStatus, overallProgress } = progressState;

  const stageList = [
    { id: 'upload', label: 'Upload Complete', minStage: 1 },
    { id: 'queued', label: 'Job Queued', minStage: 2 },
    { id: 'transcoding', label: 'Transcoding', minStage: 3 },
    { id: 'packaging', label: 'HLS Packaging', minStage: 4 },
    { id: 'ready', label: 'Ready', minStage: 5 }
  ];

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Server size={16} style={{ color: 'var(--accent-primary)' }} />
            Cloud Worker Transcoding Execution
          </h2>
          <p className="card-description">
            Live telemetry from asynchronous encoding instances and segment packaging workers.
          </p>
        </div>
        <div>
          <Badge variant={stage >= 5 ? 'success' : 'info'} dot>
            {stage >= 5 ? 'Processing Complete' : `Pipeline Active: ${overallProgress}%`}
          </Badge>
        </div>
      </div>

      {/* High-Level Stage Timeline */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem',
          border: '1px solid var(--border-color)'
        }}
      >
        {stageList.map((item) => {
          const isDone = stage > item.minStage || stage === 5;
          const isCurrent = stage === item.minStage && stage !== 5;
          const isPending = stage < item.minStage;

          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.78125rem',
                fontWeight: isCurrent ? 600 : 500,
                color: isDone
                  ? 'var(--status-success)'
                  : isCurrent
                  ? 'var(--accent-primary)'
                  : 'var(--text-muted)'
              }}
            >
              {isDone ? (
                <CheckCircle2 size={15} style={{ color: 'var(--status-success)' }} />
              ) : isCurrent ? (
                <Loader2 size={15} className="spin-icon" style={{ color: 'var(--accent-primary)' }} />
              ) : (
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    border: '1.5px solid var(--border-subtle)',
                    display: 'inline-block'
                  }}
                />
              )}
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Rendition Workers Progress Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
          Active Encoding Workers ({selectedOptions.qualities.length} Renditions)
        </div>

        {selectedOptions.qualities.map((quality) => {
          const info = renditions[quality] || { progress: 0, status: 'Queued', speed: '0x', segments: '0/32' };
          const isFinished = info.progress >= 100;

          return (
            <div
              key={quality}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <Film size={15} style={{ color: 'var(--accent-primary)' }} />
                  <span style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                    {quality} Rendition
                  </span>
                  <span style={{ fontSize: '0.71875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    node-{quality.toLowerCase()}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <span style={{ fontSize: '0.71875rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    {info.segments}
                  </span>
                  <span style={{ fontSize: '0.78125rem', fontWeight: 600, color: 'var(--text-primary)', width: '36px', textAlign: 'right' }}>
                    {Math.round(info.progress)}%
                  </span>
                  <Badge variant={isFinished ? 'success' : info.progress > 0 ? 'info' : 'subtle'} dot>
                    {isFinished ? 'Completed' : info.progress > 0 ? 'Processing' : 'Queued'}
                  </Badge>
                </div>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  width: '100%',
                  height: '5px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${info.progress}%`,
                    backgroundColor: isFinished ? 'var(--status-success)' : 'var(--accent-primary)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.25s ease-out'
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Auxiliary Workers (Thumbnail & Captions) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginTop: '0.15rem' }}>
          {selectedOptions.thumbnail && (
            <div
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Image size={15} style={{ color: 'var(--accent-primary)' }} />
                <div>
                  <div style={{ fontSize: '0.78125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Thumbnail Extraction
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    10-sec keyframe grid
                  </div>
                </div>
              </div>

              <Badge variant={thumbnailStatus === 'Generated' ? 'success' : 'info'} dot>
                {thumbnailStatus}
              </Badge>
            </div>
          )}

          {selectedOptions.captions && (
            <div
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Subtitles size={15} style={{ color: 'var(--accent-primary)' }} />
                <div>
                  <div style={{ fontSize: '0.78125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    AI Caption Worker
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    WebVTT speech-to-text
                  </div>
                </div>
              </div>

              <Badge variant={captionsStatus === 'Ready' ? 'success' : 'info'} dot>
                {captionsStatus}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
