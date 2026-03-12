/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {useLocation} from 'react-router-dom';
import {
  NavbarSecondaryMenuFiller,
  type NavbarSecondaryMenuComponent,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@theme/DocSidebarItems';
import type {Props} from '@theme/DocSidebar/Mobile';
import {
  getApiReferenceModule,
  getApiRefModuleIdFromDocsPath,
  getDocsPathSegmentFromActivePath,
  getApiRefModuleIdFromSidebarItems,
  getDocsBasePathForModule,
} from '@site/src/components/ApiReference/modulesConfig';
import DocsViewSwitcher from '@site/src/components/DocsViewSwitcher';

function getDocsPathSegment(pathname: string): string | null {
  const segments = pathname.replace(/^\/+/, '').split('/');
  const docsIndex = segments.indexOf('docs');
  if (docsIndex !== -1 && segments[docsIndex + 1]) {
    return segments[docsIndex + 1];
  }
  return null;
}

// eslint-disable-next-line react/function-component-definition
const DocSidebarMobileSecondaryMenu: NavbarSecondaryMenuComponent<Props> = ({
  sidebar,
  path,
}) => {
  const mobileSidebar = useNavbarMobileSidebar();
  const location = useLocation();
  const pathname = location.pathname ?? path ?? '';
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

  return (
    <>
      {showViewSwitcher && apiRefModule && (
        <DocsViewSwitcher
          docsBasePath={docsBasePath}
          apiRefHref={`/api-reference?module=${encodeURIComponent(apiRefModuleId!)}`}
        />
      )}
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems
          items={sidebar}
          activePath={path}
          onItemClick={(item) => {
            if (item.type === 'category' && item.href) {
              mobileSidebar.toggle();
            }
            if (item.type === 'link') {
              mobileSidebar.toggle();
            }
          }}
          level={1}
        />
      </ul>
    </>
  );
};

function DocSidebarMobile(props: Props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default React.memo(DocSidebarMobile);
