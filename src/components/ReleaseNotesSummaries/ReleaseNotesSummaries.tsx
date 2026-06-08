import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Admonition from '@theme/Admonition';
import { CategorySection, CategoryData } from './CategorySection';
import { TableOfContents } from './TableOfContents';
import styles from './styles.module.scss';

import summariesData from '@site/release-notes/generated/ai-summaries.json';

interface SummariesData {
  generated_at: string;
  generation_method: string;
  days_included: number;
  categories: CategoryData[];
}

export default function ReleaseNotesSummaries() {
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();
  const data = summariesData as SummariesData;

  const hasCategories = data && data.categories && data.categories.length > 0;

  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_harness.svg`} alt="Harness" />
            <h1>Harness Release Notes Summaries</h1>
          </div>
        </div>

        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Explore release notes from the last {data.days_included || 30} days across the Harness
              Platform and modules.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col col--9">
          <Admonition type="info" title="INFO">
            <p>
              Please review the full module release notes by selecting a module in the sidebar, or using
              the <strong>View full release notes</strong> links beside each module summary.
            </p>
            <p>
              Looking for available features rather than recent changes? You can explore Beta and Limited GA features across Harness modules on the {' '}
              <Link href={`${baseUrl}release-notes/features`}>
                Feature Availability
              </Link>{' '} page.
            </p>
          </Admonition>

          {hasCategories ? (
            <div className={styles.categoriesContainer}>
              {data.categories.map((category, index) => (
                <CategorySection key={`category-${index}`} category={category} />
              ))}
            </div>
          ) : (
            <div className={styles.noContent}>
              <p>No recent release notes found for the selected time period.</p>
              <p>
                <Link href={`${baseUrl}release-notes/all-modules`}>
                  View all release notes modules →
                </Link>
              </p>
            </div>
          )}

          {hasCategories && (
            <div className={styles.archiveLink}>
              <Link href={`${baseUrl}release-notes/all-modules`}>View all modules (card view)</Link>
            </div>
          )}
        </div>

        {hasCategories && (
          <div className="col col--3">
            <TableOfContents categories={data.categories} />
          </div>
        )}
      </div>
    </div>
  );
}
