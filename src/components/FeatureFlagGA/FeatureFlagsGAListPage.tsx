import React from 'react';
import styles from './ga-list.module.css';

function FeatureFlagsGATable({ flags }) {
  // Sort flags by gaStartDate in descending order (newest first)
  const sortedFlags = [...flags].sort(
    (a, b) => new Date(b.gaStartDate) - new Date(a.gaStartDate)
  );

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.gaTable}>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Product Module</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedFlags.map((flag) => (
            <tr key={flag.flagKey}>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard
                      .writeText(flag.flagKey)
                      .catch(() => {})
                  }
                  title="Copy feature flag name"
                  style={{
                    fontWeight: 100,
                    fontSize: '0.85rem',
                    background: 'var(--ifm-code-background)',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '6px',
                    padding: '6px 8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    wordBreak: 'break-word',
                    maxWidth: '100%',
                  }}
                >
                  {flag.flagKey}
                </button>
              </td>
              <td>{flag.module}</td>
              <td>{flag.description}</td>
              <td>{flag.lifecycleState ?? 'Not Classified'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FeatureFlagsGAListPage({
  flags = [],
  loading = false,
  error = null,
  compact = false,
}) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">
      <FeatureFlagsGATable flags={flags} />
    </div>
  );
}