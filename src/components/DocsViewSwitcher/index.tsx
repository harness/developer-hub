import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';

const NAVIGATE_DELAY_MS = 160;

export const HDH_DOCS_SECTION_BEFORE_API_REF = 'hdh-docs-section-before-api-ref';

interface DocsViewSwitcherProps {
  /** Current docs base path (e.g. /docs/infra-as-code-management) */
  docsBasePath: string;
  /** URL for the API Reference page (e.g. /api-reference?module=infra-as-code-management) */
  apiRefHref: string;
  /** Which view is active (Documentation sidebar vs API Reference sidebar) */
  activeView: 'docs' | 'api';
}

/**
 * Pill-style switcher between Documentation and API Reference.
 * Exit animation: on inactive link click, thumb slides to target then navigate.
 * Active label is a no-op button with tooltip; tablist/tabs for keyboard.
 */
export default function DocsViewSwitcher({
  docsBasePath,
  apiRefHref,
  activeView,
}: DocsViewSwitcherProps): React.ReactElement {
  const history = useHistory();
  const navRef = useRef<HTMLDivElement>(null);
  const [thumbSliding, setThumbSliding] = useState<'left' | 'right' | null>(null);

  const goToApiRef = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(HDH_DOCS_SECTION_BEFORE_API_REF, window.location.pathname);
      } catch (_) {}
    }
    setThumbSliding('right');
    const t = setTimeout(() => {
      setThumbSliding(null);
      history.push(apiRefHref);
    }, NAVIGATE_DELAY_MS);
    return () => clearTimeout(t);
  }, [apiRefHref, history]);

  const goToDocs = useCallback(() => {
    setThumbSliding('left');
    const t = setTimeout(() => {
      setThumbSliding(null);
      history.push(docsBasePath);
    }, NAVIGATE_DELAY_MS);
    return () => clearTimeout(t);
  }, [docsBasePath, history]);

  const isDocs = activeView === 'docs';
  const thumbPosition = thumbSliding ?? (isDocs ? 'left' : 'right');

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (!isDocs) goToDocs();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (isDocs) goToApiRef();
      }
    },
    [isDocs, goToDocs, goToApiRef]
  );

  return (
    <div
      ref={navRef}
      className={styles.viewSwitcher}
      role="tablist"
      aria-label="Switch between Documentation and API Reference"
      onKeyDown={handleKeyDown}
    >
      <span
        className={styles.viewSwitcherThumb}
        aria-hidden
        data-thumb-position={thumbPosition}
      />
      {/* DOM order: Documentation first, API Reference second (for tab/arrow keys) */}
      {isDocs ? (
        <>
          <button
            type="button"
            role="tab"
            aria-selected={true}
            aria-current="page"
            aria-disabled={true}
            tabIndex={0}
            className={styles.viewSwitcherActive}
            title="You're currently viewing Documentation"
            disabled
          >
            Documentation
          </button>
          <a
            href={apiRefHref}
            role="tab"
            aria-selected={false}
            tabIndex={-1}
            className={styles.viewSwitcherLink}
            onClick={(e) => {
              e.preventDefault();
              goToApiRef();
            }}
          >
            API Reference
          </a>
        </>
      ) : (
        <>
          <a
            href={docsBasePath}
            role="tab"
            aria-selected={false}
            tabIndex={-1}
            className={styles.viewSwitcherLink}
            onClick={(e) => {
              e.preventDefault();
              goToDocs();
            }}
          >
            Documentation
          </a>
          <button
            type="button"
            role="tab"
            aria-selected={true}
            aria-current="page"
            aria-disabled={true}
            tabIndex={0}
            className={styles.viewSwitcherActive}
            title="You're currently viewing API Reference"
            disabled
          >
            API Reference
          </button>
        </>
      )}
    </div>
  );
}
