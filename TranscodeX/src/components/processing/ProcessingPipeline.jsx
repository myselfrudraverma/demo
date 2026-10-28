import React from 'react';
import { CloudUpload, HardDrive, ListOrdered, Cpu, Box, Radio, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProcessingPipeline({ currentStage = 'idle' }) {
  // currentStage: 'idle' | 'uploading' | 'queued' | 'transcoding' | 'packaging' | 'completed'

  const stages = [
    {
      id: 'uploading',
      label: 'Upload Video',
      icon: CloudUpload,
      tech: 'S3 Multi-part',
      stepNum: '01'
    },
    {
      id: 'storage',
      label: 'Object Storage',
      icon: HardDrive,
      tech: 'Raw Bucket',
      stepNum: '02'
    },
    {
      id: 'queued',
      label: 'Job Queue',
      icon: ListOrdered,
      tech: 'Redis / SQS',
      stepNum: '03'
    },
    {
      id: 'transcoding',
      label: 'Encoding Workers',
      icon: Cpu,
      tech: 'FFmpeg Clusters',
      branches: ['360p', '720p', '1080p'],
      stepNum: '04'
    },
    {
      id: 'packaging',
      label: 'HLS Packaging',
      icon: Box,
      tech: 'm3u8 & .ts Chunks',
      stepNum: '05'
    },
    {
      id: 'completed',
      label: 'Adaptive Ready',
      icon: Radio,
      tech: 'Cloud CDN',
      stepNum: '06'
    }
  ];

  const getStageState = (stageId) => {
    if (currentStage === 'idle') return 'inactive';
    if (currentStage === 'completed') return 'completed';

    const order = ['uploading', 'storage', 'queued', 'transcoding', 'packaging', 'completed'];
    const currentIndex = order.indexOf(currentStage === 'uploading' ? 'uploading' : currentStage);
    const stageIndex = order.indexOf(stageId);

    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div className="card-header">
        <div>
          <h2 className="card-title">
            <Cpu size={16} style={{ color: 'var(--accent-primary)' }} />
            Cloud Pipeline Architecture
          </h2>
          <p className="card-description">
            Asynchronous distributed video processing workflow across cloud compute clusters.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.71875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            Pipeline status:
          </span>
          <span
            className={`badge ${
              currentStage === 'completed'
                ? 'badge-success'
                : currentStage !== 'idle'
                ? 'badge-info'
                : 'badge-subtle'
            }`}
          >
            {currentStage === 'completed'
              ? 'Transcode Ready'
              : currentStage !== 'idle'
              ? 'Processing Pipeline Active'
              : 'Standby'}
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '0.5rem',
          alignItems: 'stretch'
        }}
        className="pipeline-grid"
      >
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const state = getStageState(stage.id);
          const isActive = state === 'active';
          const isCompleted = state === 'completed';

          return (
            <div
              key={stage.id}
              className={isActive ? 'active-stage-card' : ''}
              style={{
                backgroundColor: isActive
                  ? 'var(--accent-primary-subtle)'
                  : isCompleted
                  ? 'var(--status-success-bg)'
                  : 'var(--bg-subtle)',
                border: `1px solid ${
                  isActive
                    ? 'var(--accent-primary)'
                    : isCompleted
                    ? 'var(--status-success-border)'
                    : 'var(--border-color)'
                }`,
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'all var(--transition-fast)'
              }}
            >
              {/* Top Row: Icon & Status / Step */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isActive
                        ? 'var(--accent-primary)'
                        : isCompleted
                        ? 'var(--status-success)'
                        : 'var(--bg-surface)',
                      color: isActive || isCompleted ? '#ffffff' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isActive ? '0 1px 4px rgba(37, 99, 235, 0.3)' : 'none',
                      border: isCompleted || isActive ? 'none' : '1px solid var(--border-color)'
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                  </div>

                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      color: isActive
                        ? 'var(--accent-primary)'
                        : isCompleted
                        ? 'var(--status-success)'
                        : 'var(--text-muted)'
                    }}
                  >
                    {isCompleted ? '✓ Done' : isActive ? '● Active' : stage.stepNum}
                  </span>
                </div>

                {/* Title & Tech */}
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    color: isActive
                      ? 'var(--accent-primary)'
                      : isCompleted
                      ? 'var(--status-success)'
                      : 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.25
                  }}
                >
                  {stage.label}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  {stage.tech}
                </div>
              </div>

              {/* Multi-Rendition Branches Tag for Encoding Workers */}
              {stage.branches && (
                <div style={{ display: 'flex', gap: '0.2rem', marginTop: '0.5rem' }}>
                  {stage.branches.map((b) => (
                    <span
                      key={b}
                      style={{
                        fontSize: '0.625rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        backgroundColor: isActive ? 'rgba(37, 99, 235, 0.18)' : 'var(--bg-surface)',
                        color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        padding: '0.075rem 0.25rem',
                        borderRadius: '3px',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
