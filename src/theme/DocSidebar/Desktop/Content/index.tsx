/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode, useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import {useLocation} from 'react-router-dom';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {
  useAnnouncementBar,
  useScrollPosition,
} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';
import type {Props} from '@theme/DocSidebar/Desktop/Content';
import {
  getApiReferenceModule,
  getApiRefModuleIdFromDocsPath,
  getDocsPathSegmentFromActivePath,
  getApiRefModuleIdFromSidebarItems,
  getDocsBasePathForModule,
} from '@site/src/components/ApiReference/modulesConfig';
import DocsViewSwitcher from '@site/src/components/DocsViewSwitcher';

import styles from './styles.module.css';

function useShowAnnouncementBar() {
  const {isActive} = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

  useScrollPosition(
    ({scrollY}) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

/** Get docs path segment from pathname (e.g. /docs/.../infrastructure-as-code-management/... or /base/docs/infrastructure-as-code-management/...). */
function getDocsPathSegment(pathname: string): string | null {
  const segments = pathname.replace(/^\/+/, '').split('/');
  const docsIndex = segments.indexOf('docs');
  if (docsIndex !== -1 && segments[docsIndex + 1]) {
    return segments[docsIndex + 1];
  }
  return null;
}

export default function DocSidebarDesktopContent({
  path,
  sidebar,
  className,
}: Props): ReactNode {
  const showAnnouncementBar = useShowAnnouncementBar();
  const location = useLocation();
  const pathname = location.pathname ?? path ?? '';
  // Prefer module id from sidebar (if this sidebar has an API Reference link); else from URL/path
  const apiRefModuleIdFromSidebar = getApiRefModuleIdFromSidebarItems(sidebar);
  const docsPathSegment =
    getDocsPathSegment(pathname) ?? getDocsPathSegmentFromActivePath(path ?? '');
  const apiRefModuleIdFromPath = docsPathSegment
    ? getApiRefModuleIdFromDocsPath(docsPathSegment)
    : null;
  const apiRefModuleId = apiRefModuleIdFromSidebar ?? apiRefModuleIdFromPath;
  const apiRefModule = apiRefModuleId
    ? getApiReferenceModule(apiRefModuleId)
    : null;
  const docsBasePath = apiRefModuleId
    ? getDocsBasePathForModule(apiRefModuleId)
    : docsPathSegment
      ? `/docs/${docsPathSegment}`
      : '';
  const showViewSwitcher = Boolean(apiRefModule && (apiRefModuleIdFromSidebar || docsBasePath));
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement>(null);


  useEffect(() => {
    if (!showViewSwitcher) {
      setPortalTarget(null);
      return;
    }

    let mounted = true;

    const findTarget = () => {
      if (!mounted || !navRef.current) return;

      // Use the ref instead of document.querySelector
      const nav = navRef.current;

      const firstCategory = nav.querySelector('.menu__list > .menu__list-item');
      const subList = firstCategory?.querySelector(':scope > ul.menu__list');

      if (firstCategory && subList) {
        let container = firstCategory.querySelector<HTMLDivElement>('.docs-view-switcher-portal-container');
        if (!container) {
          container = document.createElement('div');
          container.className = 'docs-view-switcher-portal-container';
          container.dataset.createdByReact = 'true'; // Track that we created this
          container.style.marginTop = '8px';
          container.style.marginBottom = '8px';
          firstCategory.insertBefore(container, subList);
        }
        if (mounted) {
          setPortalTarget(container);
        }
      } else {
        if (mounted) {
          setPortalTarget(null);
        }
      }
    };

    const t = requestAnimationFrame(() => {
      requestAnimationFrame(findTarget);
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(t);
      // Clean up created container
      if (navRef.current) {
        const container = navRef.current.querySelector('.docs-view-switcher-portal-container[data-created-by-react="true"]');
        if (container) {
          container.remove();
        }
      }
      setPortalTarget(null);
    };
  }, [showViewSwitcher, sidebar]);

  return (
    <nav
      ref={navRef}
      aria-label={translate({
        id: 'theme.docs.sidebar.navAriaLabel',
        message: 'Docs sidebar',
        description: 'The ARIA label for the sidebar navigation',
      })}
      className={clsx(
        'menu thin-scrollbar',
        styles.menu,
        showAnnouncementBar && styles.menuWithAnnouncementBar,
        className,
      )}>
      {showViewSwitcher && apiRefModule && portalTarget &&
        ReactDOM.createPortal(
          <DocsViewSwitcher
            docsBasePath={docsBasePath}
            apiRefHref={`/api-reference?module=${encodeURIComponent(apiRefModuleId!)}`}
          />,
          portalTarget
        )
      }
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
    </nav>
  );
}
