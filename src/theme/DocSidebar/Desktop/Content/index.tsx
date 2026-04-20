/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode, useState} from 'react';
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
import apiRefStyles from '@site/src/components/ApiReference/styles.module.css';

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

  // Icon paths for docs-only modules (no API reference configured).
  // Keyed by the sidebar category className (e.g. 'sidebar-ci').
  const DOCS_ICON_MAP: Record<string, string> = {
    'sidebar-ci':         '/img/icon_ci.svg',
    'sidebar-cd':         '/img/icon_cd.svg',
    'sidebar-ff':         '/img/icon_ff.svg',
    'sidebar-fme':        '/img/icon_fme.svg',
    'sidebar-ccm':        '/img/icon_ccm.svg',
    'sidebar-sto':        '/img/icon_sto.svg',
    'sidebar-sei':        '/img/icon_sei.svg',
    'sidebar-idp':        '/img/icon_idp.svg',
    'sidebar-cde':        '/img/icon_cloud_development_environments.svg',
    'sidebar-platform':   '/img/icon_platform.svg',
    'sidebar-dbdevops':   '/img/icon_dbdevops.svg',
    'sidebar-rm':         '/img/icon-rm.svg',
    'sidebar-srm':        '/img/icon_srm.svg',
    'sidebar-ssca':       '/img/icon_ssca.svg',
    'sidebar-cet':        '/img/icon_cet.svg',
    'sidebar-cv':         '/img/icon_cv.svg',
    'sidebar-harness':    '/img/icon_harness.svg',
    'sidebar-ata':        '/img/icon-aita.svg',
    'sidebar-aisre':      '/img/icon-ai-sre.svg',
    'sidebar-rt':         '/img/icon_ce.svg',
    'sidebar-adra':       '/img/icon-adra.svg',
    'sidebar-arp':        '/img/icon-arp.svg',
    'sidebar-ast':        '/img/icon-ast.svg',
    'sidebar-hsf':        '/img/icon-hsf.svg',
    'sidebar-qwietai':    '/img/icon-qwietai.svg',
    'sidebar-opensource': '/img/icon_opensource.svg',
    'sidebar-univ':       '/img/university_icon.svg',
  };

  // For modules without an API reference, fall back to the first sidebar category label
  // and className so the static header is shown consistently across all module sidebars.
  const firstSidebarItem = sidebar[0] as { type?: string; label?: string; className?: string } | undefined;
  const moduleName =
    apiRefModule?.name ??
    (firstSidebarItem?.type === 'category' ? firstSidebarItem.label : null);
  const showModuleHeader = Boolean(moduleName);

  // Resolve icon: API ref module config takes priority, then docs-only map by sidebar class.
  const firstSidebarClass = firstSidebarItem?.className ?? '';
  const iconPath =
    apiRefModule?.iconPath ??
    DOCS_ICON_MAP[firstSidebarClass] ??
    null;
  // Only pass sidebarIconClass (CSS class-based icon) when there's no image icon.
  const sidebarIconClass = iconPath ? '' : (apiRefModule?.sidebarIconClass ?? '');

  return (
    <nav
      data-doc-sidebar-menu
      aria-label={translate({
        id: 'theme.docs.sidebar.navAriaLabel',
        message: 'Docs sidebar',
        description: 'The ARIA label for the sidebar navigation',
      })}
      className={clsx(
        'menu thin-scrollbar',
        styles.menu,
        showAnnouncementBar && styles.menuWithAnnouncementBar,
        showModuleHeader && styles.menuWithModuleHeader,
        className,
      )}>
      {showModuleHeader && (
        <div className={apiRefStyles.sidebarHeader} data-sidebar-header>
          <div className={`${apiRefStyles.moduleNameBlock} ${sidebarIconClass}`.trim()}>
            {iconPath ? (
              <>
                <img src={iconPath} alt="" className={apiRefStyles.moduleNameImg} />
                <span className={apiRefStyles.moduleNameText}>{moduleName}</span>
              </>
            ) : (
              <span className={apiRefStyles.moduleNameText}>{moduleName}</span>
            )}
          </div>
          {showViewSwitcher && (
            <DocsViewSwitcher
              docsBasePath={docsBasePath}
              apiRefHref={`/api-reference?module=${encodeURIComponent(apiRefModuleId!)}`}
              activeView="docs"
            />
          )}
        </div>
      )}
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
    </nav>
  );
}
