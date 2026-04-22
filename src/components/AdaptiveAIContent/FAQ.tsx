import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useAIResponse } from './useAIResponse';
import type { AIMode } from './types';
import styles from './styles.module.scss';

interface FAQProps {
  question: string;
  mode?: AIMode;
  fallback: string;
}

function FAQInner({ question, mode = 'docs', fallback }: FAQProps) {
  const { response, loading, error } = useAIResponse(question, mode, false);
  const [completing, setCompleting] = useState(false);

  const prevLoadingRef = React.useRef(loading);

  useEffect(() => {
    const wasLoading = prevLoadingRef.current;
    prevLoadingRef.current = loading;
    if (wasLoading && !loading && response && !error) {
      setCompleting(true);
      const timer = setTimeout(() => setCompleting(false), 260);
      return () => clearTimeout(timer);
    }
  }, [loading, response, error]);

  const content = (() => {
    if (mode === 'fallback-only') return <ReactMarkdown>{fallback}</ReactMarkdown>;
    if (loading || completing) {
      return (
        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <div className={`${styles.progressFill}${completing ? ` ${styles.progressComplete}` : ''}`} />
          </div>
          <span className={styles.progressLabel}>
            Fetching the most relevant and up-to-date information from our docs…
          </span>
        </div>
      );
    }
    if (response && response.trim() && !error) return <ReactMarkdown>{response}</ReactMarkdown>;
    return <ReactMarkdown>{fallback}</ReactMarkdown>;
  })();

  return (
    <details className={styles.faqDetails}>
      <summary className={styles.faqSummary}>{question}</summary>
      <div className={styles.faqAnswer}>{content}</div>
    </details>
  );
}

export default function FAQ(props: FAQProps) {
  return (
    <BrowserOnly
      fallback={
        <details>
          <summary>{props.question}</summary>
          <ReactMarkdown>{props.fallback}</ReactMarkdown>
        </details>
      }
    >
      {() => <FAQInner {...props} />}
    </BrowserOnly>
  );
}
