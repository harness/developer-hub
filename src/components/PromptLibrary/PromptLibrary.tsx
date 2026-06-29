import React, { useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { getDataset } from './data';
import type { Prompt } from './data/types';
import PromptCard from './PromptCard';
import PromptLibraryProvider, { usePromptLibrary } from './PromptLibraryContext';
import styles from './PromptLibrary.module.scss';

export interface PromptLibraryProps {
  /**
   * Key of the dataset to render, resolved from the data registry
   * (`data/index.ts`), e.g. `"resilience-testing"`.
   */
  datasetId: string;
}

function matchesSearch(prompt: Prompt, query: string): boolean {
  if (!query) return true;
  const haystack = [
    prompt.title,
    prompt.summary ?? '',
    prompt.scenario,
    ...(prompt.tags ?? []),
    ...(prompt.useCases ?? []),
    ...(prompt.resourceTypes ?? []),
    prompt.category,
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function PromptLibraryInner() {
  const library = usePromptLibrary();
  const prompts = library?.prompts ?? [];
  const [search, setSearch] = useState('');

  const filteredPrompts = useMemo(() => {
    const query = search.trim();
    if (!query) return prompts;
    return prompts.filter((prompt) => matchesSearch(prompt, query));
  }, [search, prompts]);

  return (
    <div className={styles.library}>
      <div className={styles.header}>
        <input
          type="search"
          className={styles.searchInput}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title, tag, or keyword"
          aria-label="Search prompts"
        />
      </div>

      {filteredPrompts.length > 0 ? (
        <div className={styles.cards}>
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} promptId={prompt.id} showTitle />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>No prompts match your search.</div>
      )}
    </div>
  );
}

function StaticFallback({ datasetId }: PromptLibraryProps) {
  const prompts = getDataset(datasetId)?.prompts ?? [];
  return (
    <div className={styles.library}>
      <div className={styles.cards}>
        {prompts.map((prompt) => (
          <article key={prompt.id} className={styles.fallbackCard}>
            <h3>{prompt.title}</h3>
            <p>{prompt.summary ?? prompt.scenario}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function PromptLibrary({ datasetId }: PromptLibraryProps) {
  return (
    <BrowserOnly fallback={<StaticFallback datasetId={datasetId} />}>
      {() => (
        <PromptLibraryProvider datasetId={datasetId}>
          <PromptLibraryInner />
        </PromptLibraryProvider>
      )}
    </BrowserOnly>
  );
}
