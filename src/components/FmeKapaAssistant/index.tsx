import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import { useCurrentSidebarCategory } from '@docusaurus/theme-common';
import styles from './styles.module.scss';

const FME_DOCS_PREFIX = '/docs/feature-management-experimentation';
const FME_DOC_ID_PREFIX = 'feature-management-experimentation';
const DOCS_CATEGORY_PREFIX = '/docs/category';

function stripBasePath(pathname: string, baseUrl: string): string {
  const base = baseUrl.replace(/\/$/, '');
  if (!base) return pathname;
  if (pathname === base) return '/';
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length) || '/';
  return pathname;
}

function isDocsCategoryListingPath(strippedPath: string): boolean {
  return strippedPath === DOCS_CATEGORY_PREFIX || strippedPath.startsWith(`${DOCS_CATEGORY_PREFIX}/`);
}

/** True if this sidebar item (or nested category) points at FME docs. */
function sidebarItemReferencesFme(item: unknown): boolean {
  if (!item || typeof item !== 'object') return false;
  const o = item as Record<string, unknown>;
  if (o.type === 'doc' && typeof o.id === 'string') {
    return o.id.startsWith(`${FME_DOC_ID_PREFIX}/`) || o.id === FME_DOC_ID_PREFIX;
  }
  if (o.type === 'category' && Array.isArray(o.items)) {
    return o.items.some(sidebarItemReferencesFme);
  }
  if (o.type === 'link' && typeof o.href === 'string') {
    return o.href.includes(FME_DOC_ID_PREFIX);
  }
  return false;
}

function categorySidebarContainsFmeDocs(category: { items?: unknown[] } | null | undefined): boolean {
  if (!category?.items?.length) return false;
  return category.items.some(sidebarItemReferencesFme);
}

function shouldShowFmeAssistant(pathname: string, baseUrl: string, category: { items?: unknown[] } | null): boolean {
  const p = stripBasePath(pathname, baseUrl);
  if (p === FME_DOCS_PREFIX || p.startsWith(`${FME_DOCS_PREFIX}/`)) return true;
  if (!isDocsCategoryListingPath(p)) return false;
  return categorySidebarContainsFmeDocs(category);
}

/**
 * Maps current doc path to embed `context` for suggested-question chips (see fme-kapa-embed.html).
 */
function getFmePageContext(strippedPath: string): string {
  const rest = strippedPath.replace(/^\/docs\/feature-management-experimentation\/?/, '');
  const p = rest.toLowerCase();
  if (p.includes('release-monitoring') || p.includes('monitoring-analysis') || p.includes('monitoring/')) {
    return 'monitoring';
  }
  if (p.includes('experimentation')) return 'experimentation';
  if (p.includes('release-agent')) return 'release-agent';
  if (p.includes('split-to-harness')) return 'migration';
  if (p.includes('warehouse-native')) return 'warehouse';
  if (p.includes('feature-management/manage-flags') || p.includes('manage-flags')) return 'flags';
  return 'general';
}

const SPARKLES_SVG = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M18.5 7.84656v-5M5.5 20.8466v-5M16 5.34656h5M3 18.3466H8M6.5 1.84656 5.71554 3.41547c-.26549.53098-.39823.79647-.57557 1.02653C4.98261 4.64615 4.79959 4.82917 4.59545 4.98653c-.23007.17734-.49555.31008-1.02653.57557L2 6.34656l1.56892.78446c.53098.26549.79646.39823 1.02653.57557C4.79959 7.86395 4.98261 8.04696 5.13997 8.25111c.17734.23006.31008.49555.57557 1.02653L6.5 10.8466l.78446-1.56896C7.54995 8.74666 7.68269 8.48117 7.86003 8.25111 8.01739 8.04696 8.20041 7.86395 8.40455 7.70659 8.63462 7.52925 8.9001 7.3965 9.43108 7.13102L11 6.34656 9.43108 5.5621c-.53098-.26549-.79646-.39823-1.02653-.57557C8.20041 4.82917 8.01739 4.64615 7.86003 4.442c-.17734-.23006-.31008-.49555-.57557-1.02653L6.5 1.84656zM17 11.8466l-.9511 1.9022C15.7834 14.2798 15.6506 14.5453 15.4733 14.7753 15.3159 14.9795 15.1329 15.1625 14.9288 15.3199 14.6987 15.4972 14.4332 15.6299 13.9023 15.8954L12 16.8466l1.9023.9511C14.4332 18.0632 14.6987 18.1959 14.9288 18.3733 15.1329 18.5306 15.3159 18.7136 15.4733 18.9178c.177300000000001.23.3101.4955.5756 1.0265L17 21.8466l.9511-1.9023C18.2166 19.4133 18.3494 19.1478 18.5267 18.9178 18.6841 18.7136 18.8671 18.5306 19.0712 18.3733 19.3013 18.1959 19.5668 18.0632 20.0977 17.7977L22 16.8466 20.0977 15.8954C19.5668 15.6299 19.3013 15.4972 19.0712 15.3199 18.8671 15.1625 18.6841 14.9795 18.5267 14.7753 18.3494 14.5453 18.2166 14.2798 17.9511 13.7488L17 11.8466z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

function useSafeCurrentSidebarCategory(): { items?: unknown[] } | null {
  try {
    return useCurrentSidebarCategory();
  } catch {
    return null;
  }
}

function FmeKapaAssistantInner(): JSX.Element | null {
  const location = useLocation();
  const {
    siteConfig: { baseUrl, customFields },
  } = useDocusaurusContext();
  const category = useSafeCurrentSidebarCategory();
  const websiteId = (customFields?.KAPA_FME_WEBSITE_ID as string | undefined)?.trim();
  const [open, setOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const scrollYWhenOpened = useRef<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const prevOpenRef = useRef(false);

  const show =
    Boolean(websiteId) && shouldShowFmeAssistant(location.pathname, baseUrl, category);

  const pageContext = useMemo(() => getFmePageContext(stripBasePath(location.pathname, baseUrl)), [
    location.pathname,
    baseUrl,
  ]);

  const embedSrc = useMemo(() => {
    if (!websiteId) return '';
    const root = baseUrl.replace(/\/$/, '');
    const path = `${root}/fme-kapa-embed.html`;
    const q = new URLSearchParams({ websiteId, context: pageContext });
    if (root) q.set('basePath', root);
    return `${path}?${q.toString()}`;
  }, [baseUrl, websiteId, pageContext]);

  const closeModal = useCallback((e?: React.SyntheticEvent | Event) => {
    e?.preventDefault?.();
    setOpen(false);
  }, []);

  const openModal = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      scrollYWhenOpened.current = window.scrollY;
      setIframeKey((k) => k + 1);
      setOpen(true);
    },
    []
  );

  const openFullHarnessAskAi = useCallback(() => {
    closeModal();
    const openMainAskAi = () => {
      const w = window as Window & { Kapa?: (cmd: string, ...args: unknown[]) => void };
      if (typeof w.Kapa === 'function') {
        try {
          w.Kapa('open');
          return;
        } catch {
          /* fall through to click */
        }
      }
      /* Prefer navbar control (avoids landing-page duplicate `.navbar__search_kapa` in the hero). */
      document.querySelector<HTMLElement>('.navbar__inner button.navbar__search_kapa')?.click();
    };
    /* Let the FME iframe unmount before opening the global widget (focus + overlay). */
    requestAnimationFrame(() => {
      requestAnimationFrame(openMainAskAi);
    });
  }, [closeModal]);

  useLayoutEffect(() => {
    if (open) return;
    if (scrollYWhenOpened.current === null) return;
    const y = scrollYWhenOpened.current;
    scrollYWhenOpened.current = null;
    requestAnimationFrame(() => {
      window.scrollTo(0, y);
    });
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeModal]);

  useEffect(() => {
    if (prevOpenRef.current && !open) {
      fabRef.current?.focus();
    }
    prevOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === 'fme-kapa-modal-close') {
        closeModal();
        return;
      }
      if (e.data?.type === 'fme-kapa-open-harness-docs-ai') {
        openFullHarnessAskAi();
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [open, closeModal, openFullHarnessAskAi]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => {
      iframeRef.current?.focus();
    });
    return () => {
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!show) return null;

  const modal = open
    ? createPortal(
        <div className={styles.shellViewport} role="presentation">
          <iframe
            ref={iframeRef}
            key={iframeKey}
            className={styles.frameFullscreen}
            src={embedSrc}
            title="Ask FME Release Agent"
            tabIndex={0}
            data-website-id="3e16352c-0b7f-44de-ab24-151cfc9ec603"
            data-source-group-ids-include="8f7b2868-4ccb-4981-b3b9-69dfc8973126"
          />
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        className={styles.fab}
        onClick={openModal}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {SPARKLES_SVG}
        <span className={styles.fabLabel}>Ask FME Release Agent</span>
      </button>
      {modal}
    </>
  );
}

/**
 * FME Ask AI: same Kapa widget behavior and script options as `docusaurus.config.ts` Ask AI,
 * in a full-viewport iframe so `window.Kapa` stays separate from the navbar integration.
 * Differs only by website id (FME sources in Kapa), project name/title, logo, FAB trigger,
 * disclaimer copy, and context-based example questions.
 */
export default function FmeKapaAssistant(): JSX.Element {
  return (
    <BrowserOnly fallback={null}>
      {() => <FmeKapaAssistantInner />}
    </BrowserOnly>
  );
}
