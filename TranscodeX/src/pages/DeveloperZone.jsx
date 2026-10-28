import React from 'react';
import ApiKeyCard from '../components/developer/ApiKeyCard';
import UsageCard from '../components/developer/UsageCard';
import ApiExample from '../components/developer/ApiExample';

export default function DeveloperZone() {
  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Developer Zone</h1>
        <p className="page-subtitle">
          Integrate cloud video processing directly into your applications.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Top 2 Columns: API Key & Usage */}
        <div className="grid-2">
          <ApiKeyCard />
          <UsageCard />
        </div>

        {/* API Examples, Webhook Documentation & Lifecycle Flow */}
        <ApiExample />
      </div>
    </div>
  );
}
