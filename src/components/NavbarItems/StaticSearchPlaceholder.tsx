import React from 'react';
import styles from './StaticSearchPlaceholder.module.scss';

/**
 * Static search bar placeholder shown when Coveo is not ready (e.g. local dev).
 * Matches the "Search" design so you can compare Ask AI vs Search side by side.
 */
export default function StaticSearchPlaceholder(): React.ReactElement {
  return (
    <div className={styles.navbar__search_static} aria-hidden="true">
      <span className={styles.search_icon} aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.search_placeholder}>Search</span>
    </div>
  );
}
