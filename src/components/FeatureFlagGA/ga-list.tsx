import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import DocsButton from '../DocsButton';
import styles from './ga-list.module.css';

const FEED_URL = '/release-notes/static/ff-ga-feed.json';
const ATOM_URL =
  'https://developer.harness.io/release-notes/features/rss.xml';

type LifecycleState = 'GA' | 'OPT_OUT_GA' | 'OPT_IN_PREVIEW';

interface FFGAEntry {
  flagKey: string;
  description: string;
  gaStartDate: string; // kept as metadata
  module: string;
  lifecycleState?: LifecycleState;
}

const FeatureFlagsGAList: React.FC = () => {
  const [flags, setFlags] = useState<FFGAEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(FEED_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch feature lifecycle feed');
        return res.json();
      })
      .then((data: FFGAEntry[]) => {
        setFlags(
          data.sort(
            (a, b) =>
              new Date(b.gaStartDate).getTime() -
              new Date(a.gaStartDate).getTime()
          )
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Layout
      title="Feature Lifecycle Registry"
      description="Feature Lifecycle Registry for Harness Feature Flags"
    >
      <main className="container margin-vert--lg">
        <h1>Feature Lifecycle Registry</h1>

        <div className={styles.infoBlock}>
          <strong>About This View</strong>
          <ul>
            <li>
              Features are classified by lifecycle state: GA, Opt-out GA,
              Opt-in Preview
            </li>
            <li>
              Classification reflects runtime behavior, not release timing
            </li>
            <li>Filter features by module</li>
            <li>Historical GA dates are shown for reference only</li>
          </ul>
        </div>

        <DocsButton
          text="Subscribe via Atom"
          link={ATOM_URL}
          icon="fa-solid fa-square-rss"
          tooltip="Subscribe to Feature Lifecycle feed"
          size="medium"
        />

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && (
          <div className={styles.tableWrapper}>
            <table className={styles.gaTable}>
              <colgroup>
                <col style={{ width: '16%' }} />
                <col style={{ width: '34%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '16%' }} />
                <col style={{ width: '16%' }} />
              </colgroup>

              <thead>
                <tr>
                  <th>Flag Key</th>
                  <th>Description</th>
                  <th>Lifecycle State</th>
                  <th>GA Start Date</th>
                  <th>Module</th>
                </tr>
              </thead>

              <tbody>
                {flags.map((flag) => (
                  <tr key={flag.flagKey}>
                    <td>
                      <b style={{ wordBreak: 'break-word' }}>
                        {flag.flagKey}
                      </b>
                    </td>

                    <td>{flag.description}</td>

                    <td>
                      <span>
                        {flag.lifecycleState ?? 'GA'}
                      </span>
                    </td>

                    <td>
                      {new Date(flag.gaStartDate).toLocaleDateString()}
                    </td>

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