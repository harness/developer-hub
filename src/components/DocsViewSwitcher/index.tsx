import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface DocsViewSwitcherProps {
  /** Current docs base path (e.g. /docs/infra-as-code-management) */
  docsBasePath: string;
  /** URL for the API Reference page (e.g. /api-reference?module=infra-as-code-management) */
  apiRefHref: string;
}

/**
 * Toggle shown in both the Documentation sidebar and API Reference sidebar
 * to switch between "Documentation" and "API Reference" views.
 */
export default function DocsViewSwitcher({
  docsBasePath,
  apiRefHref,
}: DocsViewSwitcherProps): React.ReactElement {
  return (
    <nav
      className={styles.viewSwitcher}
      aria-label="Switch between Documentation and API Reference"
    >
      <span className={styles.viewSwitcherThumb} aria-hidden />
      <span className={styles.viewSwitcherActive} aria-current="page">
        Documentation
      </span>
      <Link to={apiRefHref} className={styles.viewSwitcherLink}>
        API Reference
      </Link>
    </nav>
  );
}
