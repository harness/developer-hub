import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import TagsListInline from '@theme/TagsListInline';

import EditMetaRow from '@theme/EditMetaRow';
import FeedbackWidget from '@site/src/components/FeedbackWidget';

export default function DocItemFooter(): ReactNode {
  const {metadata} = useDoc();
  const {editUrl, lastUpdatedAt, lastUpdatedBy, tags} = metadata;
  const {pathname} = useLocation();

  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);

  // The footer now always renders (previously it could return null when a
  // page had neither tags nor last-updated metadata) - HDH-876 requires the
  // Feedback widget on every doc/University page, and this row is the only
  // one no longer gated on those Docusaurus-provided fields.
  return (
    <footer
      className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}>
      {canDisplayTagsRow && (
        <div
          className={clsx(
            'row margin-top--sm',
            ThemeClassNames.docs.docFooterTagsRow,
          )}>
          <div className="col">
            <TagsListInline tags={tags} />
          </div>
        </div>
      )}
      <div
        className={clsx(
          'row margin-top--sm align-items-center',
          ThemeClassNames.docs.docFooterEditMetaRow,
        )}>
        <div className="col">
          {canDisplayEditMetaRow && (
            <EditMetaRow
              className="margin-top--none"
              editUrl={editUrl}
              lastUpdatedAt={lastUpdatedAt}
              lastUpdatedBy={lastUpdatedBy}
            />
          )}
        </div>
        <div className="col" style={{textAlign: 'right'}}>
          <FeedbackWidget source={pathname.startsWith('/university') ? 'university' : 'docs'} />
        </div>
      </div>
    </footer>
  );
}
