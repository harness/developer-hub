import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import LastUpdated from "@theme/LastUpdated";

export default function DocItemLayout(props: any): JSX.Element {
  const { children, frontMatter, metadata, toc } = props;
  const title = metadata?.title ?? frontMatter?.title ?? "";

  return (
    <div className={styles.docPage}>
      <main className={styles.docMainContainer}>
        <div className={styles.docMainContainerInner}>
          <article>
            <header className={styles.docHeader}>
              <h1 className={styles.docTitle}>{title}</h1>

              {metadata?.lastUpdatedAt && (
                <div className={styles.docItemLastUpdatedUnderTitle}>
                  <LastUpdated
                    lastUpdatedAt={metadata.lastUpdatedAt}
                    lastUpdatedBy={metadata.lastUpdatedBy}
                  />
                </div>
              )}

              {/* existing tags / breadcrumbs can stay here */}
            </header>

            <div className={styles.docContent}>{children}</div>
          </article>
        </div>
      </main>
    </div>
  );
}
