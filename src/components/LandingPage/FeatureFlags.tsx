import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { CardItem, docType } from "./TutorialCard";

/* Define the cards here */
const FeaturedList: CardItem[] = [
  {
    title: "TypeScript and React Feature Flags",
    module: "ff",
    icon: "/img/icon_ff.svg",
    description: (
      <>
        Walks you through adding JavaScript Feature Flags to a TypeScript and
        React Application.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/manage-feature-flags/typescript-react-first-feature-flag",
  },
];

const FFList: CardItem[] = [
  {
    title: "TypeScript and React Feature Flags",
    module: "ff",
    icon: "/img/icon_ff.svg",
    description: (
      <>
        Walks you through adding JavaScript Feature Flags to a TypeScript and
        React Application.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/manage-feature-flags/typescript-react-first-feature-flag",
  },
];

export default function FF() {
  return (
    // <Layout title="FF" description="FF">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Manage feature flags</li>
    //   </ul>
    <div className="container">
      <img src="/img/ff.svg" />
      <div className={styles.SectionName}>
        <h3>Manage Feature Flags</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src="/img/icon_ff.svg" />
            <h1>Feature Flags</h1>
          </div>
          <div>
            <Link href="/docs/feature-flags">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
                <img src="/img/icon_document.png" /> Documentation
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div>
            <p>
              Harness Feature Flags (FF) is a feature management solution that
              lets you change your software's functionality without deploying
              new code. It does this by allowing you to hide code or behavior
              without having to ship new versions of the software. A feature
              flag is like a powerful if statement.
            </p>
            <img src="/img/ff_flow.svg" className={styles.ff_img} />
            <div className={styles.alignCenter}>
              <Link
                className={clsx("button button--lg", styles.btn, styles.btnFF)}
                to="#all-tutorials"
              >
                FF Tutorials
                <img src="/img/Stroke.svg" />
              </Link>
              <Link href="https://harness.io/products/feature-flags">
                <button className={styles.link}>Learn more about FF</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">All FF Tutorials</h3>
        <TutorialCard FeatureList={FFList} />
      </div>
    </div>
    // </Layout>
  );
}
