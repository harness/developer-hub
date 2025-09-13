import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {formatDateUS} from './formatDate';

export default function DocPublished({overridePublished}: {overridePublished?: string}) {
  try {
    const {frontMatter} = useDoc();
    const fm = frontMatter as any;
    const publishedRaw = fm?.published ?? overridePublished; // frontmatter wins; else git first commit
    const label = formatDateUS(publishedRaw);
    if (!label) return null;
    return <span className="docStat docStat--published">Published: {label}</span>;
  } catch {
    return null;
  }
}