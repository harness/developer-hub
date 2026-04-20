import React, { useState, useMemo, useEffect, useRef } from 'react';
import ApiReferenceSidebar from './ApiReferenceSidebar';
import EndpointRow from './EndpointRow';
import { getEndpointsFromSpec, getEndpointsByCategory, endpointId, endpointSlug, endpointFragment, getEndpointByFragment, categoryLabel } from './utils';
import { getApiReferenceModule } from './modulesConfig';
import { HDH_DOCS_SECTION_BEFORE_API_REF } from '@site/src/components/DocsViewSwitcher';
import type { OpenApiSpec } from './types';
import type { EndpointEntry } from './types';
import styles from './styles.module.css';

const ROW_LAZY_ROOT_MARGIN = '400px';
const ROW_PLACEHOLDER_MIN_HEIGHT = 120;

/** Renders EndpointRow only when the placeholder is near the viewport to reduce initial mount cost. */
function LazyEndpointRow({
  entry,
  spec,
  specBaseUrl,
  pathPrefix,
  isSelected,
}: {
  entry: EndpointEntry;
  spec: OpenApiSpec;
  specBaseUrl: string;
  pathPrefix: string;
  /** When true, render immediately without waiting for IntersectionObserver */
  isSelected?: boolean;
}): React.ReactElement {
  const [observerInView, setObserverInView] = useState(false);
  // Derive inView synchronously — no extra render cycle needed when isSelected changes
  const inView = isSelected || observerInView;
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setObserverInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setObserverInView(true);
      },
      { rootMargin: ROW_LAZY_ROOT_MARGIN, threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (inView) {
    return (
      // Keep data-endpoint-slug on the rendered div so performScroll can find it
      // regardless of whether the row is a placeholder or fully rendered
      <div
        className={styles.lazyRowReveal}
        data-endpoint-slug={endpointSlug(entry)}
      >
        <EndpointRow
          entry={entry}
          spec={spec}
          specBaseUrl={specBaseUrl}
          pathPrefix={pathPrefix}
        />
      </div>
    );
  }
  return (
    <div
      ref={sentinelRef}
      data-endpoint-slug={endpointSlug(entry)}
      className={styles.endpointRow}
      style={{ minHeight: ROW_PLACEHOLDER_MIN_HEIGHT }}
    >
      <div
        className={styles.sectionAnchor}
        data-section-id={endpointSlug(entry)}
        aria-hidden="true"
      />
    </div>
  );
}

interface ApiReferenceLayoutProps {
  spec: OpenApiSpec;
  moduleName: string;
  moduleId: string;
  docsBasePath: string;
}

const DEFAULT_TRYIT_BASE_URL = 'https://app.harness.io';

function getSpecBaseUrl(spec: OpenApiSpec): string {
  const servers = spec.servers;
  if (servers?.length && servers[0].url) {
    const url = servers[0].url;
    if (url && !/localhost|127\.0\.0\.1/i.test(url)) return url;
  }
  return DEFAULT_TRYIT_BASE_URL;
}

export default function ApiReferenceLayout({
  spec,
  moduleName,
  moduleId,
  docsBasePath,
}: ApiReferenceLayoutProps): React.ReactElement {
  const endpoints = useMemo(() => getEndpointsFromSpec(spec), [spec]);
  const byCategory = useMemo(() => getEndpointsByCategory(spec), [spec]);
  const firstEndpointInFirstCategory = byCategory[0]?.endpoints?.[0] ?? null;
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointEntry | null>(() =>
    firstEndpointInFirstCategory ?? (endpoints.length > 0 ? endpoints[0] : null)
  );
  const allEndpoints = useMemo(
    () => byCategory.flatMap((c) => c.endpoints),
    [byCategory]
  );

  useEffect(() => {
    if (!byCategory.length) return;

    // When navigating here from the docs sidebar, always start at the very top.
    // The fuzzy category-match we used to do here (e.g. 'code-repository' ⊃ 'repository')
    // caused a mid-list scroll jump on every docs → API ref transition.
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(HDH_DOCS_SECTION_BEFORE_API_REF);
        if (stored) {
          sessionStorage.removeItem(HDH_DOCS_SECTION_BEFORE_API_REF);
          const firstEndpoint = byCategory[0]?.endpoints?.[0] ?? endpoints[0] ?? null;
          setSelectedEndpoint(firstEndpoint);
          return;
        }
      } catch (_) {}
    }

    // For direct links and browser refreshes, restore position from the URL hash.
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    let target: EndpointEntry | null = null;
    if (hash) {
      target = getEndpointByFragment(hash, byCategory) ?? allEndpoints.find((e) => endpointSlug(e) === hash) ?? null;
    }
    if (!target) target = byCategory[0]?.endpoints?.[0] ?? endpoints[0] ?? null;
    setSelectedEndpoint(target);
  }, [spec, byCategory, endpoints, allEndpoints]);

  const moduleConfig = getApiReferenceModule(moduleId);
  const specBaseUrl = moduleConfig?.baseUrl ?? getSpecBaseUrl(spec);
  const pathPrefix = moduleConfig?.pathPrefix ?? '';
  const mainScrollRef = useRef<HTMLDivElement>(null);

  const scrollToCategoryTop = React.useCallback(
    (entry: EndpointEntry) => {
      const cat = byCategory.find(
        (c) => c.endpoints[0] && endpointId(c.endpoints[0]) === endpointId(entry)
      );
      if (!cat || !mainScrollRef.current) return;
      const categoryId = `category-${cat.category.toLowerCase().replace(/\s+/g, '-')}`;
      const headingEl = mainScrollRef.current.querySelector(`#${CSS.escape(categoryId)}`) as HTMLElement | null;
      if (!headingEl) return;
      const container = mainScrollRef.current;
      // Offset = container's own padding-top so the heading lands flush with the visible
      // content area top, plus a small breathing gap.
      const containerPaddingTop = parseFloat(getComputedStyle(container).paddingTop) || 0;
      const padding = containerPaddingTop + 16;
      const headingTop =
        headingEl.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
      container.scrollTo({ top: Math.max(0, headingTop - padding), behavior: 'smooth' });
    },
    [byCategory]
  );

  const currentCategory = useMemo(() => {
    if (!selectedEndpoint) return byCategory[0];
    return byCategory.find(({ endpoints: es }) =>
      es.some((e) => endpointId(e) === endpointId(selectedEndpoint))
    ) ?? byCategory[0];
  }, [byCategory, selectedEndpoint]);

  // When switching to API Reference (mount or spec change), start at the very top
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
    mainScrollRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [spec]);

  const scrollFromSelectionRef = useRef(false);
  const selectionFromScrollSpyRef = useRef(false);

  /**
   * Called when the user explicitly clicks a sidebar item.
   * Clears the scroll-spy guard so the subsequent selectedEndpoint useEffect
   * is never short-circuited by a stale selectionFromScrollSpyRef flag.
   */
  const handleSidebarSelect = React.useCallback((entry: EndpointEntry) => {
    selectionFromScrollSpyRef.current = false;
    setSelectedEndpoint(entry);
  }, []);

  useEffect(() => {
    if (!selectedEndpoint || !mainScrollRef.current) return;
    if (selectionFromScrollSpyRef.current) {
      selectionFromScrollSpyRef.current = false;
      return;
    }
    scrollFromSelectionRef.current = true;
    // Guard must outlast all correction passes: MAX_CORRECTION_PASSES × CORRECTION_INTERVAL_MS
    // (6 × 200 = 1200ms) plus room for the final smooth scroll animation (~400ms).
    const t = setTimeout(() => {
      scrollFromSelectionRef.current = false;
    }, 2000);
    let correctionTimer: ReturnType<typeof setTimeout> | undefined;
    const slug = endpointSlug(selectedEndpoint);
    const isFirstInCategory =
      currentCategory.endpoints.length > 0 &&
      endpointId(currentCategory.endpoints[0]) === endpointId(selectedEndpoint);
    const isVeryFirstEndpoint =
      byCategory.length > 0 &&
      byCategory[0].endpoints.length > 0 &&
      endpointId(byCategory[0].endpoints[0]) === endpointId(selectedEndpoint);

    const container = mainScrollRef.current;
    const containerPaddingTop = parseFloat(getComputedStyle(container).paddingTop) || 0;
    const scrollPadding = containerPaddingTop + 16;
    // For individual endpoint rows, the row's own padding-top (24px) provides the visual gap,
    // so we only need a small breathing room rather than the full scrollPadding.
    const endpointRowScrollPadding = 16;
    // How many correction passes to run. Each pass fires 200ms after the previous instant
    // scroll, giving the IntersectionObserver time to mount newly-visible lazy rows and expand
    // them from their 120px placeholder height to their true height. For endpoints that are far
    // from the current scroll position many intermediate rows may still be placeholders, so a
    // single correction isn't enough — we cascade until the position stabilises.
    const MAX_CORRECTION_PASSES = 6;
    const CORRECTION_INTERVAL_MS = 200;

    const performScroll = () => {
      if (!container) return;
      // Always reset the outer window scroll first. The API Reference uses its own inner
      // scroll container, so there should be no meaningful outer scroll. Resetting here
      // ensures container.getBoundingClientRect().top is at its expected value (below the
      // navbar) so padding calculations that follow are accurate.
      if (typeof window !== 'undefined' && window.scrollY !== 0) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
      if (isVeryFirstEndpoint) {
        container.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        if (typeof window !== 'undefined') window.scrollTo(0, 0);
      } else if (isFirstInCategory) {
        // The h2 category heading is always rendered (not lazy), but it sits below many lazy
        // placeholder rows whose compressed heights make its measured position inaccurate when
        // navigating from far away. Apply the same cascade-correction strategy as the else
        // branch so the heading converges to its true position over multiple passes.
        const cat = byCategory.find(
          (c) => c.endpoints[0] && endpointId(c.endpoints[0]) === endpointId(selectedEndpoint)
        );
        if (cat) {
          const categoryId = `category-${cat.category.toLowerCase().replace(/\s+/g, '-')}`;
          const findHeading = () =>
            container.querySelector(`#${CSS.escape(categoryId)}`) as HTMLElement | null;
          const getHeadingScrollTop = (el: HTMLElement) => {
            const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
            return Math.max(0, top - scrollPadding);
          };
          const headingEl = findHeading();
          if (headingEl) {
            container.scrollTo({ top: getHeadingScrollTop(headingEl), behavior: 'instant' });
            let correctionAttempt = 0;
            const doCorrection = () => {
              const h = findHeading();
              if (!h) return;
              correctionAttempt += 1;
              if (correctionAttempt < MAX_CORRECTION_PASSES) {
                container.scrollTo({ top: getHeadingScrollTop(h), behavior: 'instant' });
                correctionTimer = setTimeout(doCorrection, CORRECTION_INTERVAL_MS);
              } else {
                container.scrollTo({ top: getHeadingScrollTop(h), behavior: 'smooth' });
              }
            };
            correctionTimer = setTimeout(doCorrection, CORRECTION_INTERVAL_MS);
          }
        }
      } else {
        // Find row by attribute to avoid selector escaping issues with special chars in slug
        const findRow = () =>
          Array.from(container.querySelectorAll<HTMLElement>('[data-endpoint-slug]')).find(
            (el) => el.getAttribute('data-endpoint-slug') === slug
          );
        const rowEl = findRow();
        if (rowEl) {
          // Pass 1 — instant jump to the approximate position.
          // Intermediate rows may still be placeholders (120px min-height) rather than their
          // true rendered height, so this position can be off by a lot for far-away endpoints.
          const roughTop = rowEl.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
          container.scrollTo({ top: Math.max(0, roughTop - endpointRowScrollPadding), behavior: 'instant' });

          // Passes 2‥N — cascade corrections. Each instant scroll brings the viewport closer
          // to the target, which triggers the IntersectionObserver to mount the next batch of
          // lazy rows. Newly mounted rows push the target further down, so we re-measure and
          // correct again. The final pass uses smooth behaviour for a polished landing.
          let correctionAttempt = 0;
          const doCorrection = () => {
            const correctedEl = findRow();
            if (!correctedEl) return;
            const correctedTop =
              correctedEl.getBoundingClientRect().top -
              container.getBoundingClientRect().top +
              container.scrollTop;
            correctionAttempt += 1;
            if (correctionAttempt < MAX_CORRECTION_PASSES) {
              container.scrollTo({ top: Math.max(0, correctedTop - endpointRowScrollPadding), behavior: 'instant' });
              correctionTimer = setTimeout(doCorrection, CORRECTION_INTERVAL_MS);
            } else {
              container.scrollTo({ top: Math.max(0, correctedTop - endpointRowScrollPadding), behavior: 'smooth' });
            }
          };
          correctionTimer = setTimeout(doCorrection, CORRECTION_INTERVAL_MS);
        }
      }
    };

    // Defer scroll until after layout (double rAF so React commit + paint are done)
    let rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(performScroll);
    });

    if (typeof window !== 'undefined') {
      const fragment = endpointFragment(selectedEndpoint, currentCategory.category);
      const url = `${window.location.pathname}${window.location.search}#${fragment}`;
      window.history.replaceState(null, '', url);
    }
    return () => {
      clearTimeout(t);
      clearTimeout(correctionTimer);
      cancelAnimationFrame(rafId);
    };
  }, [selectedEndpoint, currentCategory, byCategory, scrollToCategoryTop]);

  useEffect(() => {
    const container = mainScrollRef.current;
    if (!container || !allEndpoints.length) return;
    const navbarEl =
      typeof document !== 'undefined' ? document.querySelector('.navbar') : null;
    const navbarHeight = navbarEl ? (navbarEl as HTMLElement).offsetHeight : 60;
    // Trigger at halfway up the viewport so the next endpoint highlights when its details reach mid-screen
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.5 : navbarHeight + 100;

    function getActiveSection(): HTMLElement | null {
      const sections = Array.from(
        container.querySelectorAll<HTMLElement>('[data-section-id]')
      );
      if (!sections.length) return null;
      let lastAbove = sections[0];
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= threshold && threshold <= rect.bottom) {
          return section; // this section contains the halfway line
        }
        if (rect.bottom <= threshold) {
          lastAbove = section; // section is entirely above the line (don't skip when scrolling back)
        }
      }
      return lastAbove;
    }

    function onScroll() {
      if (scrollFromSelectionRef.current) return;
      const activeSection = getActiveSection();
      if (!activeSection) return;
      const activeId = activeSection.getAttribute('data-section-id');
      if (!activeId) return;
      const entry = allEndpoints.find((e) => endpointSlug(e) === activeId);
      if (entry) {
        selectionFromScrollSpyRef.current = true;
        setSelectedEndpoint(entry);
        if (typeof window !== 'undefined') {
          const cat = byCategory.find((c) =>
            c.endpoints.some((e) => endpointId(e) === endpointId(entry))
          );
          const fragment = cat ? endpointFragment(entry, cat.category) : activeId;
          const url = `${window.location.pathname}${window.location.search}#${fragment}`;
          window.history.replaceState(null, '', url);
        }
      }
    }

    container.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener('scroll', onScroll);
  }, [allEndpoints, byCategory]);

  return (
    <div className={styles.layout}>
      <ApiReferenceSidebar
        spec={spec}
        moduleName={moduleName}
        moduleId={moduleId}
        docsBasePath={docsBasePath}
        selectedEndpoint={selectedEndpoint}
        onSelectEndpoint={handleSidebarSelect}
        onEndpointClick={scrollToCategoryTop}
      />
      <div className={styles.mainScroll} ref={mainScrollRef}>
        {byCategory.length === 0 ? (
          <div className={styles.main}>
            <div className={styles.emptyState}>
              No endpoints in this spec. Check the OpenAPI definition.
            </div>
          </div>
        ) : (
          <>
            {byCategory.map(({ category, endpoints: categoryEndpoints }) => (
              <React.Fragment key={category}>
                <h2
                  className={styles.categoryHeading}
                  id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {categoryLabel(category)}
                </h2>
                {categoryEndpoints.map((entry) => (
                  <LazyEndpointRow
                    key={endpointId(entry)}
                    entry={entry}
                    spec={spec}
                    specBaseUrl={specBaseUrl}
                    pathPrefix={pathPrefix}
                    isSelected={!!selectedEndpoint && endpointId(entry) === endpointId(selectedEndpoint)}
                  />
                ))}
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
