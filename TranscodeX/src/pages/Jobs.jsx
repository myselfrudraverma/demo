import React, { useState } from 'react';
import { Activity, CheckCircle2, Clock, AlertTriangle, RefreshCw, Cpu } from 'lucide-react';
import JobTable from '../components/jobs/JobTable';
import { INITIAL_JOBS } from '../data/mockData';
import Button from '../components/common/Button';

export default function Jobs() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRetryJob = (jobId) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          return {
            ...j,
            status: 'Processing',
            progress: 15,
            errorReason: null,
            workerId: 'enc-worker-us-east-08 (failover allocated)'
          };
        }
        return j;
      })
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const activeCount = jobs.filter((j) => j.status === 'Processing').length;
  const queuedCount = jobs.filter((j) => j.status === 'Queued').length;
  const completedCount = jobs.filter((j) => j.status === 'Completed').length;
  const failedCount = jobs.filter((j) => j.status === 'Failed').length;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="page-title">Processing Jobs</h1>
          <p className="page-subtitle">
            Monitor video encoding and media-processing workloads.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={handleRefresh}
            className={isRefreshing ? 'spin-icon' : ''}
            title="Refresh job status from queue"
          >
            Refresh Queue
          </Button>
        </div>
      </div>

      {/* Cluster Queue Overview Cards */}
      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="card" style={{ padding: '0.875rem 1.125rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.71875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Transcoding
            </span>
            <div style={{ width: 26, height: 26, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--accent-primary-subtle)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu size={14} />
            </div>
          </div>
          <div style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {activeCount}
          </div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', marginTop: '0.25rem', display: 'block' }}>
            Parallel worker instances
          </span>
        </div>

        <div className="card" style={{ padding: '0.875rem 1.125rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.71875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Pending In Queue
            </span>
            <div style={{ width: 26, height: 26, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--status-warning-bg)', color: 'var(--status-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={14} />
            </div>
          </div>
          <div style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {queuedCount}
          </div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--status-warning)', marginTop: '0.25rem', display: 'block' }}>
            SQS buffer delay: &lt; 2s
          </span>
        </div>

        <div className="card" style={{ padding: '0.875rem 1.125rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.71875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Completed Jobs
            </span>
            <div style={{ width: 26, height: 26, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--status-success-bg)', color: 'var(--status-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={14} />
            </div>
          </div>
          <div style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {completedCount}
          </div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--status-success)', marginTop: '0.25rem', display: 'block' }}>
            100% manifest verification
          </span>
        </div>

        <div className="card" style={{ padding: '0.875rem 1.125rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.71875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Failed / Retrying
            </span>
            <div style={{ width: 26, height: 26, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--status-error-bg)', color: 'var(--status-error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={14} />
            </div>
          </div>
          <div style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {failedCount}
          </div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--status-error)', marginTop: '0.25rem', display: 'block' }}>
            Automatic worker failover
          </span>
        </div>
      </div>

      {/* Main Jobs Table */}
      <JobTable jobs={jobs} onRetryJob={handleRetryJob} />
    </div>
  );
}
