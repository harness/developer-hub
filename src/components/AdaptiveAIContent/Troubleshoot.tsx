import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useAIResponse } from './useAIResponse';
import type { AIMode } from './types';
import generatedResponses from './generated-responses.json';
import styles from './styles.module.scss';

interface TroubleshootProps {
  issue: string;
  mode?: AIMode;
  fallback: string;
}

function TroubleshootInner({ issue, mode = 'general', fallback }: TroubleshootProps) {
  const { response, loading, error } = useAIResponse(issue, mode, true);
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
    if (mode === 'fallback-only') {
      return (
        <ul className={styles.troubleshootList}>
          <li>{fallback}</li>
        </ul>
      );
    }

    if (mode === 'general') {
      const preGenerated = (generatedResponses as Record<string, string>)[issue];
      if (preGenerated && preGenerated.trim()) {
        return (
          <div className={styles.troubleshootList}>
            <ReactMarkdown>{preGenerated}</ReactMarkdown>
          </div>
        );
      }
      return (
        <ul className={styles.troubleshootList}>
          <li>{fallback}</li>
        </ul>
      );
    }

    // mode === 'docs' — inline Kapa answer (same project as Ask AI), cached per session
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
    if (response && response.trim() && !error) {
      return (
        <div className={styles.troubleshootList}>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      );
    }
    return (
      <ul className={styles.troubleshootList}>
        <li>{fallback}</li>
      </ul>
    );
  })();

  return (
    <details className={styles.faqDetails}>
      <summary className={styles.faqSummary}>{issue}</summary>
      <div className={styles.faqAnswer}>{content}</div>
    </details>
  );
}

export default function Troubleshoot(props: TroubleshootProps) {
  return (
    <BrowserOnly
      fallback={
        <details>
          <summary>{props.issue}</summary>
          <ul>
            <li>{props.fallback}</li>
          </ul>
        </details>
      }
    >
      {() => <TroubleshootInner {...props} />}
    </BrowserOnly>
  );
}
