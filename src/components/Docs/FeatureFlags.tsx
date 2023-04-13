import React, { useContext } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import DocCardList from "@theme/DocCardList";
import { useCurrentSidebarCategory } from "@docusaurus/theme-common";
import styles from "./styles.module.scss";
import TutorialCard, { TutorialCards } from "../LandingPage/TutorialCard";
// Define the cards in "***Data.ts"
import { featuredTutorials } from "./data/featureFlagsData";

export default function FF() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  // console.log("...category > useCurrentSidebarCategory...", {
  //   useCurrentSidebarCategory,
  //   props,
  //   docusaurusContext: useDocusaurusContext(),
  // });
  const category = useCurrentSidebarCategory();
  // const sidebar = useDocsSidebar();
  console.log("...category...", {
    useCurrentSidebarCategory,
    // useDocsSidebar,
    // sidebar,
    category,
  });
  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ff.svg`} />
            <h1>Feature Flags</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/tutorials/manage-feature-flags">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_tutorials.svg`} />
                Tutorials
              </button>
            </Link>
            <Link href="/release-notes/feature-flags">
              <button className={styles.btn}>
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Harness Feature Flags (FF) is a feature management solution that
              lets you change your software's functionality without deploying
              new code. It does this by allowing you to hide code or behavior
              without having to ship new versions of the software. A feature
              flag is like a powerful if statement.
            </p>
          </div>
        </div>
      </div>
      {/* <TutorialCards data={docsCards} sectionClass={styles.subSection} /> */}
      <article className="margin-top--lg">
        <DocCardList items={category.items} />
      </article>
      <div className={styles.sectionDivider}></div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={featuredTutorials} featuredCard={true} />
      </div>
    </div>
    // </Layout>
  );
}
