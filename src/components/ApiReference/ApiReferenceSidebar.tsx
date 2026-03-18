import React, { useState, useMemo, useEffect, useRef } from 'react';
import { getEndpointsByCategory, endpointId, endpointLabel, getMethodClass, categoryLabel } from './utils';
import { getApiReferenceModule } from './modulesConfig';
import type { OpenApiSpec } from './types';
import type { EndpointEntry } from './types';
import DocsViewSwitcher from '@site/src/components/DocsViewSwitcher';
import styles from './styles.module.css';

interface ApiReferenceSidebarProps {
  spec: OpenApiSpec;
  moduleName: string;
  moduleId: string;
  docsBasePath: string;
  selectedEndpoint: EndpointEntry | null;
  onSelectEndpoint: (entry: EndpointEntry) => void;
  /** Called when any endpoint is clicked (e.g. to scroll to category top when first in category) */
  onEndpointClick?: (entry: EndpointEntry) => void;
}

export default function ApiReferenceSidebar({
  spec,
  moduleName,
  moduleId,
  docsBasePath,
  selectedEndpoint,
  onSelectEndpoint,
  onEndpointClick,
}: ApiReferenceSidebarProps): React.ReactElement {
  const byCategory = useMemo(() => getEndpointsByCategory(spec), [spec]);
  const moduleConfig = getApiReferenceModule(moduleId);
  const sidebarIconClass = moduleConfig?.iconPath ? '' : (moduleConfig?.sidebarIconClass ?? '');
  const iconPath = moduleConfig?.iconPath;
  const allCategories = useMemo(() => byCategory.map(({ category }) => category), [byCategory]);

  const [expanded, setExpanded] = useState<Set<string>>(() =>
    new Set(allCategories)
  );

  useEffect(() => {
    setExpanded(new Set(allCategories));
  }, [allCategories.join(',')]);

  const sidebarRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!selectedEndpoint) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = sidebarRef.current?.querySelector<HTMLElement>('[data-active="true"]');
        if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
    });
    return () => cancelAnimationFrame(id);
  }, [selectedEndpoint]);

  const toggleCategory = (category: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  return (
    <aside ref={sidebarRef} className={styles.sidebar} data-api-ref-sidebar>
      <div className={styles.sidebarSticky}>
        <div className={styles.sidebarHeader}>
        <div className={`${styles.moduleNameBlock} ${sidebarIconClass}`.trim()}>
          {iconPath ? (
            <>
              <img src={iconPath} alt="" className={styles.moduleNameImg} />
              <span className={styles.moduleNameText}>{moduleName}</span>
            </>
          ) : (
            <span className={styles.moduleNameText}>{moduleName}</span>
          )}
        </div>
        <DocsViewSwitcher
          docsBasePath={docsBasePath}
          apiRefHref={`/api-reference?module=${encodeURIComponent(moduleId)}`}
          activeView="api"
        />
        </div>
        <nav className={styles.sidebarNav} aria-label="API endpoints">
        <ul className={`menu__list ${styles.categoryList}`}>
          {byCategory.map(({ category, endpoints }) => {
            const isExpanded = expanded.has(category);
            return (
              <li
                key={category}
                className={`menu__list-item ${!isExpanded ? 'menu__list-item--collapsed' : ''}`.trim()}
              >
                <div className="menu__list-item-collapsible">
                  <button
                    type="button"
                    className="menu__link menu__link--sublist menu__link--sublist-caret"
                    onClick={() => toggleCategory(category)}
                    aria-expanded={isExpanded}
                    aria-controls={`api-category-${category}`}
                  >
                    {categoryLabel(category)}
                  </button>
                </div>
                <ul
                  id={`api-category-${category}`}
                  className={`menu__list ${styles.endpointList}`}
                  role="region"
                  aria-label={`${categoryLabel(category)} endpoints`}
                >
                  {endpoints.map((entry) => {
                      const id = endpointId(entry);
                      const label = endpointLabel(entry);
                      const isSelected =
                        selectedEndpoint &&
                        endpointId(selectedEndpoint) === id;
                      return (
                        <li
                          key={id}
                          className={styles.endpointItem}
                          data-active={isSelected ? 'true' : 'false'}
                        >
                          <button
                            type="button"
                            className={isSelected ? styles.endpointButtonActive : styles.endpointButton}
                            onClick={() => {
                              onSelectEndpoint(entry);
                              onEndpointClick?.(entry);
                            }}
                            aria-current={isSelected ? 'true' : undefined}
                            title={label}
                          >
                            <span className={styles.endpointLabel}>{label}</span>
                            <span className={`${styles.endpointMethod} ${getMethodClass(styles, entry.method)}`}>{entry.method.toUpperCase()}</span>
                          </button>
                        </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        </nav>
      </div>
    </aside>
  );
}
