import React from 'react';
import PromptBuilder from '@site/src/components/PromptBuilder';
import type { Prompt } from './data/types';
import styles from './PromptDetail.module.scss';

interface PromptDetailProps {
  prompt: Prompt;
}

export default function PromptDetail({ prompt }: PromptDetailProps) {
  return (
    <div className={styles.detail}>
      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Scenario</h3>
        <p className={styles.scenario}>{prompt.scenario}</p>
      </section>

      <section className={styles.section}>
        <PromptBuilder template={prompt.prompt} />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Expected output</h3>
        <p className={styles.body}>{prompt.expectedOutput}</p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionHeading}>Resource types</h3>
        <div className={styles.chips}>
          {prompt.resourceTypes.map((rt) => (
            <span key={rt} className={styles.chip}>
              {rt}
            </span>
          ))}
        </div>
      </section>

      {prompt.notes ? (
        <aside className={styles.notes}>
          <h3 className={styles.notesHeading}>Notes</h3>
          <p className={styles.notesBody}>{prompt.notes}</p>
        </aside>
      ) : null}

    </div>
  );
}
