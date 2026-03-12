import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import styles from './styles.module.css';

interface MarkdownDescriptionProps {
  /** Description text that may contain markdown (newlines, **bold**, `code`, - bullets). */
  text: string;
  /** Optional class name for the wrapper (e.g. for table cells). */
  className?: string;
  /** Render as inline (no wrapper div). */
  inline?: boolean;
}

const defaultComponents: Components = {
  p: ({ children }) => <p className={styles.specBodyParagraph}>{children}</p>,
  strong: ({ children }) => <strong>{children}</strong>,
  code: ({ children }) => <code className={styles.inlineCode}>{children}</code>,
  ul: ({ children }) => <ul className={styles.specBodyList}>{children}</ul>,
  ol: ({ children }) => <ol className={styles.specBodyList}>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
};

/** Ensure the first letter of the text and the first letter after sentence endings are capitalized. */
function capitalizeSentenceStarts(str: string): string {
  const trimmed = str.trim();
  if (!trimmed) return trimmed;
  return trimmed
    .replace(/^([a-z])/, (_, c) => c.toUpperCase())
    .replace(/([.!?]\s+)([a-z])/g, (_, end, c) => end + c.toUpperCase());
}

/**
 * Renders API description text with markdown: newlines, **bold**, `code`, bullet points.
 */
export default function MarkdownDescription({ text, className, inline }: MarkdownDescriptionProps): React.ReactElement {
  if (!text || !text.trim()) {
    return <>{'—'}</>;
  }
  const normalized = capitalizeSentenceStarts(text.trim());
  const content = (
    <ReactMarkdown components={defaultComponents}>{normalized}</ReactMarkdown>
  );
  if (inline) {
    return <span className={className}>{content}</span>;
  }
  return <div className={className ?? styles.specBody}>{content}</div>;
}
