import React, { useState, useMemo, useEffect, useRef } from 'react';
import ApiReferenceSidebar from './ApiReferenceSidebar';
import ApiSpecContent from './ApiSpecContent';
import TryItPanel from './TryItPanel';
import { getEndpointsFromSpec, getEndpointsByCategory, endpointId, endpointSlug, endpointFragment, getEndpointByFragment, categoryLabel } from './utils';
import { getApiReferenceModule } from './modulesConfig';
import type { OpenApiSpec } from './types';
import type { EndpointEntry } from './types';
import styles from './styles.module.css';

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
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    const fromHash = hash
      ? (getEndpointByFragment(hash, byCategory) ?? allEndpoints.find((e) => endpointSlug(e) === hash) ?? null)
      : null;
    setSelectedEndpoint(
      fromHash ?? byCategory[0]?.endpoints?.[0] ?? endpoints[0] ?? null
    );
  }, [spec, byCategory, endpoints, allEndpoints]);

  const specBaseUrl = getSpecBaseUrl(spec);
  const moduleConfig = getApiReferenceModule(moduleId);
  const pathPrefix = moduleConfig?.pathPrefix ?? '';
  const mainScrollRef = useRef<HTMLDivElement>(null);

  const scrollToCategoryTop = React.useCallback(
    (entry: EndpointEntry) => {
      const cat = byCategory.find(
        (c) => c.endpoints[0] && endpointId(c.endpoints[0]) === endpointId(entry)
      );
      if (!cat || !mainScrollRef.current) return;
      const categoryId = `category-${cat.category.toLowerCase().replace(/\s+/g, '-')}`;
      const headingEl = mainScrollRef.current.querySelector(`#${CSS.escape(categoryId)}`);
      headingEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  useEffect(() => {
    if (!selectedEndpoint || !mainScrollRef.current) return;
    if (selectionFromScrollSpyRef.current) {
      selectionFromScrollSpyRef.current = false;
      return;
    }
    scrollFromSelectionRef.current = true;
    const t = setTimeout(() => {
      scrollFromSelectionRef.current = false;
    }, 1000);
    const slug = endpointSlug(selectedEndpoint);
    const isFirstInCategory =
      currentCategory.endpoints.length > 0 &&
      endpointId(currentCategory.endpoints[0]) === endpointId(selectedEndpoint);
    const isVeryFirstEndpoint =
      byCategory.length > 0 &&
      byCategory[0].endpoints.length > 0 &&
      endpointId(byCategory[0].endpoints[0]) === endpointId(selectedEndpoint);

    if (isVeryFirstEndpoint) {
      mainScrollRef.current.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    } else if (isFirstInCategory) {
      scrollToCategoryTop(selectedEndpoint);
    } else {
      const rowEl = mainScrollRef.current.querySelector(`[data-endpoint-slug="${slug}"]`);
      rowEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (typeof window !== 'undefined') {
      const fragment = endpointFragment(selectedEndpoint, currentCategory.category);
      const url = `${window.location.pathname}${window.location.search}#${fragment}`;
      window.history.replaceState(null, '', url);
    }
    return () => clearTimeout(t);
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
        onSelectEndpoint={setSelectedEndpoint}
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
                  <div
                    key={endpointId(entry)}
                    data-endpoint-slug={endpointSlug(entry)}
                    className={styles.endpointRow}
                  >
                    <div
                      className={styles.sectionAnchor}
                      data-section-id={endpointSlug(entry)}
                      aria-hidden="true"
                    />
                    <div className={styles.endpointRowContent}>
                      <ApiSpecContent
                        endpoint={entry}
                        baseUrl={specBaseUrl}
                        pathPrefix={pathPrefix}
                      />
                    </div>
                    <div className={styles.tryItPanelWrapper}>
                      <TryItPanel endpoint={entry} specBaseUrl={specBaseUrl} pathPrefix={pathPrefix} />
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
