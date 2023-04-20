import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import DocCardList from "@theme/DocCardList";
import { useCurrentSidebarCategory } from "@docusaurus/theme-common";
import styles from "./styles.module.scss";

export default function Docs() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const category = useCurrentSidebarCategory();
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_harness.svg`} />
            <h1>Documentation</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/tutorials">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Tutorials
              </button>
            </Link>
            <Link href="/release-notes/whats-new">
              <button className={styles.btn}>
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>Explore Harness documentation to find step-by-step instructions, code samples, and reference information.</p>
          </div>
        </div>
      </div>
      <article className="margin-top--lg">
        <DocCardList items={category.items} />
      </article>
    </div>
  );
}
