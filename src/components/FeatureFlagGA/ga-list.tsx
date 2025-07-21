import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import DocsButton from '../DocsButton';
import styles from './ga-list.module.css';

const FEED_URL = '/feature-flags/static/ff-ga-feed.json';
const ATOM_URL = 'https://developer.harness.io/feature-flags/rss.xml';

interface FFGAEntry {
  flagKey: string;
  description: string;
  gaDate: string;
  module: string;
}

const FeatureFlagsGAList: React.FC = () => {
  const [flags, setFlags] = useState<FFGAEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(FEED_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch GA feed');
        return res.json();
      })
      .then((data: FFGAEntry[]) => {
        // Sort descending by date
        setFlags(
          data.sort((a, b) => new Date(b.gaDate).getTime() - new Date(a.gaDate).getTime())
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Layout title="Feature Flags GA List" description="Feature Flags General Availability (GA) List">
      <main className="container margin-vert--lg">
        <h1>Feature Flags General Availability (GA) List</h1>
        <div className={styles.infoBlock}>
          <strong>About Feature Flags GA List</strong>
          <ul>
            <li>This page lists all Feature Flags that have reached General Availability (GA) in the last several months.</li>
            <li>You can track when a flag was GA'd, view its description, and filter by module.</li>
            <li>For a machine-readable feed, see the Atom link below.</li>
          </ul>
        </div>
        <DocsButton
          text="Subscribe via Atom"
          link={ATOM_URL}
          icon="fa-solid fa-square-rss"
          tooltip="Subscribe to Feature Flags GA Atom feed"
          size="medium"
        />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          <div className={styles.tableWrapper}>
            <table className={styles.gaTable}>
              <thead>
                <tr>
                  <th>Flag Key</th>
                  <th>Description</th>
                  <th>GA Date</th>
                  <th>Module</th>
                </tr>
              </thead>
              <tbody>
                {flags.map((flag) => (
                  <tr key={flag.flagKey}>
                    <td><b>{flag.flagKey}</b></td>
                    <td>{flag.description}</td>
                    <td>{new Date(flag.gaDate).toLocaleDateString()}</td>
                    <td>{flag.module}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default FeatureFlagsGAList; 