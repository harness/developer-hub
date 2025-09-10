import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

function formatLastUpdated(ts: number | string | undefined): string | null {
  if (!ts) return null;

  let date: Date;
  if (typeof ts === 'number') {
    // Heuristic: < 1e12 → seconds; otherwise milliseconds.
    date = new Date(ts < 1e12 ? ts * 1000 : ts);
  } else {
    // String: dev mode often provides an ISO-like string.
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return null;
    date = d;
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export default function LastUpdatedTop() {
  let metadata: any | undefined;
  try {
    ({metadata} = useDoc());
  } catch {
    return null; // not a docs route
  }

  const label = formatLastUpdated(metadata?.lastUpdatedAt);
  if (!label) return null;

  return (
    <div
      style={{
        marginTop: '-0.5rem',  // pulls it snug under the H1
        marginBottom: '1rem',
        fontSize: '0.875rem',
        fontWeight: 600,
        color: 'var(--ifm-color-emphasis-700)',
      }}
      aria-label="Document last updated date"
      data-testid="last-updated-top"
    >
      {`Last updated: ${label}`}
    </div>
  );
}