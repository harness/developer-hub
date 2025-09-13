import React from 'react';
import DocLastUpdated from './DocLastUpdated';
import DocPublished from './DocPublished';
import DocTimeToRead from './DocTimeToRead';
import './DocStats.css';

type Props = {
  overrideUpdated?: string;
  overridePublished?: string;
  overrideReadingMin?: string; // ignored now since we always compute at runtime
};

export default function DocStatsBlock({overrideUpdated, overridePublished}: Props) {
  const hasUpdated = Boolean(overrideUpdated);   // DocLastUpdated will no-op if it can't format
  const hasPublished = Boolean(overridePublished); // DocPublished will no-op if none

  return (
    <div className="docStatsBox" data-testid="doc-stats">
      <div className="docStatsLeft" aria-label="Document metadata">
        {/* Updated */}
        <DocLastUpdated overrideUpdated={overrideUpdated} />

        {/* Separator only if both left-side items exist */}
        {hasUpdated && hasPublished && <span className="docStatsDot">•</span>}

        {/* Published (frontmatter or injected first-commit) */}
        <DocPublished overridePublished={overridePublished} />
      </div>

      {/* Right side is always shown: clock + TTR */}
      <div className="docStatsRight" aria-label="Estimated reading time">
        <img src="/img/icon-clock.svg" />
        <DocTimeToRead />
      </div>
    </div>
  );
}