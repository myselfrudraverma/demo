import React, { useState } from 'react';
import { Search, RotateCcw, ChevronRight, X, Film, Clock, Server } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function JobTable({ jobs, onRetryJob }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);

  // Filter jobs based on search & status
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="success" dot>Completed</Badge>;
      case 'Processing':
        return <Badge variant="info" dot>Processing</Badge>;
      case 'Queued':
        return <Badge variant="warning" dot>Queued</Badge>;
      case 'Failed':
        return <Badge variant="error" dot>Failed</Badge>;
      default:
        return <Badge variant="subtle">{status}</Badge>;
    }
  };

  return (
    <div>
      {/* Controls Bar: Search & Status Filters */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.875rem',
          marginBottom: '1rem'
        }}
      >
        {/* Search input */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '300px'
          }}
        >
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            placeholder="Search by Job ID or file..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.45rem 0.75rem 0.45rem 2.15rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontSize: '0.8125rem',
              outline: 'none',
              transition: 'border-color var(--transition-fast)'
            }}
          />
        </div>

        {/* Status Filter Tabs */}
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
          {['All', 'Completed', 'Processing', 'Queued', 'Failed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              style={{
                background: statusFilter === tab ? 'var(--bg-surface)' : 'transparent',
                color: statusFilter === tab ? 'var(--accent-primary)' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: statusFilter === tab ? 600 : 500,
                boxShadow: statusFilter === tab ? 'var(--shadow-xs)' : 'none',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-muted)',
                  fontSize: '0.71875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  fontWeight: 600
                }}
              >
                <th style={{ padding: '0.75rem 1.25rem' }}>Job ID</th>
                <th style={{ padding: '0.75rem 1rem' }}>Source</th>
                <th style={{ padding: '0.75rem 1rem' }}>Outputs</th>
                <th style={{ padding: '0.75rem 1rem' }}>Size</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem' }}>Progress</th>
                <th style={{ padding: '0.75rem 1rem' }}>Created</th>
                <th style={{ padding: '0.75rem 1.25rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No video processing jobs match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'background-color var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Job ID */}
                    <td style={{ padding: '0.875rem 1.25rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent-primary)' }}>
                      {job.id}
                    </td>

                    {/* Source File */}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {job.filename}
                      </div>
                      <div style={{ fontSize: '0.71875rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                        Input: {job.inputResolution}
                      </div>
                    </td>

                    {/* Outputs */}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.71875rem', color: 'var(--text-muted)' }}>{job.inputResolution} →</span>
                        {job.outputs.map((out) => (
                          <span
                            key={out}
                            style={{
                              fontSize: '0.6875rem',
                              fontFamily: 'var(--font-mono)',
                              backgroundColor: 'var(--bg-subtle-alt)',
                              padding: '0.075rem 0.3rem',
                              borderRadius: '3px',
                              border: '1px solid var(--border-color)',
                              color: 'var(--text-primary)'
                            }}
                          >
                            {out}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Size */}
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      {job.size}
                    </td>

                    {/* Status */}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      {getStatusBadge(job.status)}
                    </td>

                    {/* Progress */}
                    <td style={{ padding: '0.875rem 1rem', minWidth: '120px' }}>
                      {job.status === 'Processing' ? (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.71875rem', marginBottom: '0.2rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                            <span>{job.progress}%</span>
                          </div>
                          <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--bg-subtle-alt)', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ width: `${job.progress}%`, height: '100%', backgroundColor: 'var(--accent-primary)', borderRadius: '999px' }} />
                          </div>
                        </div>
                      ) : job.status === 'Completed' ? (
                        <span style={{ fontSize: '0.71875rem', color: 'var(--status-success)', fontWeight: 500 }}>100% (Ready)</span>
                      ) : job.status === 'Failed' ? (
                        <span style={{ fontSize: '0.71875rem', color: 'var(--status-error)', fontWeight: 500 }}>Halted (42%)</span>
                      ) : (
                        <span style={{ fontSize: '0.71875rem', color: 'var(--text-muted)' }}>Queued in SQS</span>
                      )}
                    </td>

                    {/* Created */}
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      {job.created}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '0.875rem 1.25rem', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                      {job.status === 'Failed' ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={RotateCcw}
                          onClick={() => onRetryJob && onRetryJob(job.id)}
                          title="Simulate job retry"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.71875rem' }}
                        >
                          Retry
                        </Button>
                      ) : (
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => setSelectedJob(job)}
                          style={{ color: 'var(--text-muted)', padding: '0.25rem' }}
                          title="Inspect job details"
                          aria-label="Inspect job"
                        >
                          <ChevronRight size={15} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 60,
            padding: '1rem'
          }}
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '520px',
              boxShadow: 'var(--shadow-lg)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-header" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Film size={18} style={{ color: 'var(--accent-primary)' }} />
                <div>
                  <h3 className="card-title" style={{ fontSize: '0.9375rem' }}>
                    Job Details: {selectedJob.id}
                  </h3>
                  <p className="card-description">{selectedJob.filename}</p>
                </div>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setSelectedJob(null)}
                style={{ padding: '0.25rem' }}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.625rem 0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</span>
                <div style={{ marginTop: '0.2rem' }}>{getStatusBadge(selectedJob.status)}</div>
              </div>

              <div style={{ padding: '0.625rem 0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Source Size</span>
                <div style={{ marginTop: '0.2rem', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.8125rem' }}>{selectedJob.size}</div>
              </div>

              <div style={{ padding: '0.625rem 0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Worker Node</span>
                <div style={{ marginTop: '0.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.71875rem', color: 'var(--text-primary)' }}>{selectedJob.workerId}</div>
              </div>

              <div style={{ padding: '0.625rem 0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Packaging</span>
                <div style={{ marginTop: '0.2rem', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.8125rem' }}>{selectedJob.format}</div>
              </div>
            </div>

            {selectedJob.errorReason && (
              <div style={{ padding: '0.625rem 0.75rem', backgroundColor: 'var(--status-error-bg)', border: '1px solid var(--status-error-border)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.75rem', color: 'var(--status-error)' }}>
                <strong>Worker Failure:</strong> {selectedJob.errorReason}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <Button variant="secondary" size="sm" onClick={() => setSelectedJob(null)}>
                Close
              </Button>
              {selectedJob.status === 'Completed' && (
                <Button variant="primary" size="sm" onClick={() => {
                  navigator.clipboard.writeText(`https://cdn.transcodex.io/streams/${selectedJob.id.toLowerCase()}/master.m3u8`);
                  alert('Manifest URL copied to clipboard!');
                }}>
                  Copy master.m3u8
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
