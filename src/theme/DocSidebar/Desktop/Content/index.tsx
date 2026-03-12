/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode, useState, useRef, useEffect} from 'react';
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
  const switcherRef = useRef<HTMLDivElement>(null);

  // Move switcher node below first category header (module name), above its sub-list (e.g. "New to <module>?")
  useEffect(() => {
    if (!showViewSwitcher || !switcherRef.current) return;
    const wrapper = switcherRef.current;
    const nav = wrapper.closest('nav.menu');
    if (!nav) return;

    const move = () => {
      // First top-level item is the category (li); its first child is the header div, second is ul.menu__list
      const firstCategory = nav.querySelector('.menu__list > .menu__list-item');
      const subList = firstCategory?.querySelector(':scope > ul.menu__list');
      if (firstCategory && subList && wrapper.parentNode) {
        firstCategory.insertBefore(wrapper, subList);
      }
    };

    // Defer so DocSidebarItems have rendered the category structure
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(move);
    });
    return () => cancelAnimationFrame(t);
  }, [showViewSwitcher, sidebar]);

  return (
    <nav
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
      {showViewSwitcher && apiRefModule && (
        <div ref={switcherRef} style={{ marginTop: '8px', marginBottom: '8px' }}>
          <DocsViewSwitcher
            docsBasePath={docsBasePath}
            apiRefHref={`/api-reference?module=${encodeURIComponent(apiRefModuleId!)}`}
          />
        </div>
      )}
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
    </nav>
  );
}
