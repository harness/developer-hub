import React from 'react';
import Accordion from '@site/src/components/ChaosEngineering/Accordion';
import { usePromptLibrary } from './PromptLibraryContext';
import type { Prompt } from './data/types';
import styles from './PromptCard.module.scss';

interface PromptCardProps {
  /** ID of the prompt to render. Resolves prompt + category from the central data source. */
  promptId: string;
  /**
   * Render the prompt title inside the card. Defaults to `false` so MDX `###` headings
   * (which feed the right-side table of contents) act as the visual title.
   */
  showTitle?: boolean;
}

const SUMMARY_FALLBACK_CHARS = 220;

function getSummary(prompt: Prompt): string {
  if (prompt.summary && prompt.summary.trim().length > 0) {
    return prompt.summary.trim();
  }
  const trimmed = prompt.scenario.trim();
  if (trimmed.length <= SUMMARY_FALLBACK_CHARS) return trimmed;
  const slice = trimmed.slice(0, SUMMARY_FALLBACK_CHARS);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > 120 ? slice.slice(0, lastSpace) : slice;
  return `${cut}…`;
}

export default function PromptCard({ promptId, showTitle = false }: PromptCardProps) {
  const library = usePromptLibrary();
  const prompt = library?.getPromptById(promptId);
  if (!prompt) {
    return (
      <div className={styles.missing}>
        Unknown prompt id: <code>{promptId}</code>
      </div>
    );
  }

  const summary = getSummary(prompt);
  const useCases = prompt.useCases ?? [];

  const handleOpen = () => library?.open(prompt.id);

  return (
    <article className={styles.promptCard}>
      {showTitle ? (
        <header className={styles.headerBar}>
          <div className={styles.headerLeft}>
            <h3 className={styles.title}>{prompt.title}</h3>
            {prompt.category ? (
              <span className={styles.categoryBadge}>{prompt.category}</span>
            ) : null}
          </div>
        </header>
      ) : prompt.category ? (
        <div className={styles.categoryRow}>
          <span className={styles.categoryBadge}>{prompt.category}</span>
        </div>
      ) : null}

      {prompt.tags && prompt.tags.length > 0 ? (
        <div className={styles.tags}>
          {prompt.tags.map((tag, index) => (
            <span
              key={tag}
              className={styles.tag}
              style={{
                background: index % 2 === 0 ? '#76AF34' : '#0092E4',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <p className={styles.summary}>{summary}</p>

      {useCases.length > 0 ? (
        <div className={styles.useCases}>
          <Accordion color="green">
            <summary>Use cases</summary>
            <ul className={styles.useCasesList}>
              {useCases.map((useCase, index) => (
                <li key={`${prompt.id}-uc-${index}`}>{useCase}</li>
              ))}
            </ul>
          </Accordion>
        </div>
      ) : null}

      <div className={styles.footer}>
        <button
          type="button"
          onClick={handleOpen}
          className={styles.viewDetailsButton}
          aria-label={`View prompt for: ${prompt.title}`}
          disabled={!library}
        >
          View prompt
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
