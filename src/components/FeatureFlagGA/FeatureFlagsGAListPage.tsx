import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './ga-list.module.css';
import releaseNotesStyles from '@site/src/components/ReleaseNotes/styles.module.scss';

function FeatureFlagsGATable({ flags }) {
  return (
    <div style={{overflowX: 'auto', marginTop: '1.5rem', marginBottom: '2rem'}}>
      <table style={{width: '100%', borderCollapse: 'collapse', background: 'white', boxShadow: '0 1.5px 3px 0 rgb(0 0 0 / 8%)'}}>
        <thead>
          <tr>
            <th>Flag Key</th>
            <th>Description</th>
            <th>GA Start Date</th>
            <th>Module</th>
          </tr>
        </thead>
        <tbody>
          {flags.map((flag) => (
            <tr key={flag.flagKey}>
              <td><b>{flag.flagKey}</b></td>
              <td>{flag.description}</td>
              <td>{new Date(flag.gaStartDate).toLocaleDateString()}</td>
              <td>{flag.module}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FeatureFlagsGAListPage({ flags = [], loading = false, error = null, compact = false }) {
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (compact) {
    return <FeatureFlagsGATable flags={flags} />;
  }
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={releaseNotesStyles.btnContainer}>
            <Link href={'https://developer.harness.io/release-notes/feature-flags-ga-timeline/rss.xml'}>
              <button className={releaseNotesStyles.btn}>
                <img src={`${baseUrl}img/icon_square-rss.svg`} alt="Atom" />
                Subscribe via Atom
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              This page lists all Feature Flags that have reached General Availability (GA) in the last several months. You can track when a flag was GA'd, view its description, and filter by module. For a machine-readable feed, see the Atom link above.
            </p>
          </div>
        </div>
      </div>
      <FeatureFlagsGATable flags={flags} />
    </div>
  );
} 