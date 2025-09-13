import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {formatDateUS} from './formatDate';

export default function DocLastUpdated({overrideUpdated}: {overrideUpdated?: string}) {
  try {
    const {metadata} = useDoc();
    const source = overrideUpdated ?? (metadata?.lastUpdatedAt as any);
    const label = formatDateUS(source);
    if (!label) return null;
    return <span className="docStat docStat--updated">Last updated: {label}</span>;
  } catch {
    return null;
  }
}