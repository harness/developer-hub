import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import releaseNotesStyles from '@site/src/components/ReleaseNotes/styles.module.scss';
import FeatureFlagsGAListPage from './FeatureFlagsGAListPage';

export default function FeatureFlagsLanding({ staticFlags }) {
  const {
    siteConfig: { baseUrl = '/' } = {},
  } = useDocusaurusContext();

  return (
    <div className="container">
      <div style={{ marginBottom: '2em' }}>
        <div style={{ marginTop: 16 }}>
          <p
            style={{
              fontSize: 16,
              lineHeight: '26px',
              color: 'var(--ifm-font-color-base)',
            }}
          >
          Track the lifecycle state of features across Harness. You can explore features by module and lifecycle status, and subscribe to
          updates. To request access to a feature, copy the feature name and contact <a href="https://support.harness.io/hc/en-us/requests">Harness Support</a>.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 16,
        }}
      >
        <div className={releaseNotesStyles.btnContainer}>
          <Link href="https://developer.harness.io/release-notes/features/rss.xml">
            <button className={releaseNotesStyles.btn}>
              <img
                src={`${baseUrl}img/icon_square-rss.svg`}
                alt="Atom"
              />
              Subscribe via Atom
            </button>
          </Link>
        </div>
      </div>

      <details
        className="alert alert--info"
        style={{ marginBottom: 24 }}
      >
        <summary
          style={{
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          About the Harness Feature Lifecycle
        </summary>

        <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
          <div
            style={{
              padding: 10,
              borderLeft: '4px solid #3b82f6',
            }}
          >
            <b>Beta</b>

            <div style={{ fontSize: 14, lineHeight: '20px' }}>
              Available only in selected environments where explicitly enabled.
              Intended for limited rollout, evaluation, and feedback. May not be
              production-ready.
            </div>
          </div>

          <div
            style={{
              padding: 10,
              borderLeft: '4px solid #18a94d',  
            }}
          >
            <b>Limited GA</b>

            <div style={{ fontSize: 14, lineHeight: '20px' }}>
              Generally available and suitable for broader
              production use, but may not yet be enabled across all Harness environments during rollout.
            </div>
          </div>

          <div
            style={{
              marginTop: 4,
              fontSize: 13,
              color: 'var(--ifm-color-emphasis-700)',
              lineHeight: '20px',
            }}
          >
            Fully GA features may no longer appear in this registry once rollout
            is complete across all Harness environments.
          </div>
        </div>
      </details>

      <FeatureFlagsGAListPage
        flags={staticFlags}
        loading={false}
        error={null}
      />
    </div>
  );
}