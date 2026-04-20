import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';

export const HDH_DOCS_SECTION_BEFORE_API_REF = 'hdh-docs-section-before-api-ref';

interface DocsViewSwitcherProps {
  /** Current docs base path (e.g. /docs/infra-as-code-management) */
  docsBasePath: string;
  /** URL for the API Reference page (e.g. /api-reference?module=infra-as-code-management) */
  apiRefHref: string;
  /** Which view is active (Documentation sidebar vs API Reference sidebar) */
  activeView: 'docs' | 'api';
}

const THUMB_DURATION_MS = 220;
const FADE_DURATION_MS = 120;

/**
 * Walk up the DOM tree from el and return the first non-transparent
 * background-color. This ensures the clone overlay uses the real sidebar
 * background rather than a hardcoded white, preventing a colour flash in
 * the padding gaps between the module block and the switcher pill.
 */
function getEffectiveBackground(el: HTMLElement): string {
  let node: HTMLElement | null = el;
  while (node) {
    const bg = window.getComputedStyle(node).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
      return bg;
    }
    node = node.parentElement;
  }
  return window.getComputedStyle(document.body).backgroundColor || '#ffffff';
}

/**
 * Clone the [data-sidebar-header] ancestor into a fixed DOM overlay so it
 * appears to stay perfectly in place while React navigates to a different
 * page layout. The overlay is outside React entirely — it is never unmounted
 * by a re-render. The thumb is animated within the clone, then the whole
 * overlay fades out once the new page's header is ready.
 */
function cloneHeaderOverlay(
  origin: HTMLElement,
  thumbTarget: 'left' | 'right',
): void {
  const header = origin.closest('[data-sidebar-header]') as HTMLElement | null;
  if (!header || typeof document === 'undefined') return;

  const rect = header.getBoundingClientRect();
  const clone = header.cloneNode(true) as HTMLElement;

  // Use the sidebar's actual background (not a hardcoded white) so the
  // padding gaps between the module card and pill match the original page.
  const effectiveBg = getEffectiveBackground(header.parentElement ?? header);

  // Layer the clone at the exact same screen position
  Object.assign(clone.style, {
    position: 'fixed',
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    zIndex: '9999',
    margin: '0',
    // Do NOT override padding — the clone keeps the original sidebarHeader
    // padding so its children render in the same positions as the original.
    pointerEvents: 'none',
    background: effectiveBg,
    // Inherit border-bottom so the hairline separator stays visible
    borderBottom: window.getComputedStyle(header).borderBottom,
  });

  document.body.appendChild(clone);

  // Slide the cloned thumb to its new position
  const thumb = clone.querySelector(
    '[class*="viewSwitcherThumb"]',
  ) as HTMLElement | null;

  if (thumb) {
    // Remove any view-transition-name on the clone (avoids name conflicts)
    thumb.style.viewTransitionName = 'none';
    // Re-enable the CSS transition (the original has it stripped for VT)
    thumb.style.transition = `transform ${THUMB_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    // Force a reflow so the transition fires from the current position
    thumb.getBoundingClientRect();
    requestAnimationFrame(() => {
      thumb.style.transform =
        thumbTarget === 'right' ? 'translateX(calc(100% + 4px))' : 'translateX(0)';
    });
  }

  // After the thumb animation finishes, gently dissolve the overlay so the
  // new page's header beneath it becomes visible without a hard cut.
  const fadeStart = THUMB_DURATION_MS;
  const timer = setTimeout(() => {
    clone.style.transition = `opacity ${FADE_DURATION_MS}ms ease-out`;
    clone.style.opacity = '0';
    const removeTimer = setTimeout(() => clone.remove(), FADE_DURATION_MS);
    // Guard against the element already being removed
    clone.addEventListener('transitionend', () => {
      clearTimeout(removeTimer);
      clone.remove();
    }, { once: true });
  }, fadeStart);

  // Safety net: always clean up even if navigation takes longer than expected
  setTimeout(() => {
    clearTimeout(timer);
    clone.remove();
  }, fadeStart + FADE_DURATION_MS + 500);
}

/**
 * Pill-style switcher between Documentation and API Reference.
 * On click, a DOM clone of the sidebar header is pinned as a fixed overlay so
 * it appears completely static while React navigates between the two layouts.
 * The thumb slides within the clone, then the overlay dissolves once the new
 * page is rendered. Active label is a no-op button; tablist/tabs for keyboard.
 */
export default function DocsViewSwitcher({
  docsBasePath,
  apiRefHref,
  activeView,
}: DocsViewSwitcherProps): React.ReactElement {
  const history = useHistory();
  const switcherRef = useRef<HTMLDivElement>(null);

  const goToApiRef = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(HDH_DOCS_SECTION_BEFORE_API_REF, window.location.pathname);
      } catch (_) {}
    }
    if (switcherRef.current) cloneHeaderOverlay(switcherRef.current, 'right');
    history.push(apiRefHref);
  }, [apiRefHref, history]);

  const goToDocs = useCallback(() => {
    if (switcherRef.current) cloneHeaderOverlay(switcherRef.current, 'left');
    history.push(docsBasePath);
  }, [docsBasePath, history]);

  const isDocs = activeView === 'docs';
  const thumbPosition = isDocs ? 'left' : 'right';

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
    [isDocs, goToDocs, goToApiRef],
  );

  return (
    <div
      ref={switcherRef}
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
