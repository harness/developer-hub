import React from 'react';
import FeatureFlagsGAListPage from './FeatureFlagsGAListPage';

export default function FeatureFlagsLanding({ staticFlags }) {
  return (
    <div className="container">
      <div style={{ marginBottom: '2em' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ marginBottom: 0, fontSize: 32 }}>Feature Flags GA Timeline</h1>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 18, lineHeight: '26px', color: '#000' }}>
            Track when Harness Feature Flags reach General Availability (GA). This timeline shows GA dates, descriptions, and the modules where each feature flag was implemented.
          </p>
        </div>
      </div>
      <div className="alert alert--info" role="alert" style={{ marginBottom: 24 }}>
        <strong>About This Timeline</strong>
        <ul>
          <li>View GA dates for all major Harness Feature Flags</li>
          <li>Filter Feature Flags by module and date</li>
          <li>Access detailed descriptions of each Feature Flag</li>
          <li>Subscribe to updates via the Atom feed below</li>
        </ul>
      </div>
      <FeatureFlagsGAListPage flags={staticFlags} loading={false} error={null} />
    </div>
  );
} 