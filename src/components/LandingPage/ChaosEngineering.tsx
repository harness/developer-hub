import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TutorialCard, { CardItem, docType } from "./TutorialCard";

/* Define the cards here */
const FeaturedList: CardItem[] = [
  {
    title: "Your First Chaos Experiment on Kubernetes",
    module: "ce",
    icon: "/img/icon_ce.svg",
    description: (
      <>Running a Chaos Experiment on Kubernetes for the first time.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/run-chaos-experiments/first-chaos-engineering",
  },
];

const CEList: CardItem[] = [
  {
    title: "Your First Chaos Experiment on Kubernetes",
    module: "ce",
    icon: "/img/icon_ce.svg",
    description: (
      <>Running a Chaos Experiment on Kubernetes for the first time.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/run-chaos-experiments/first-chaos-engineering",
  },
  {
    title: "Chaos Experiment from a Blank Canvas",
    module: "ce",
    icon: "/img/icon_ce.svg",
    description: (
      <>Create, run, observe and evaluate a custom chaos experiment.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5min",
    link: "/tutorials/run-chaos-experiments/chaos-experiment-from-blank-canvas",
  },
  {
    title: "Integration with Harness CD",
    module: "ce",
    icon: "/img/icon_ce.svg",
    description: (
      <>
        Execute a chaos experiment as part of a Harness CD pipeline for
        continuous resilience.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/run-chaos-experiments/integration-with-harness-cd",
  },
];

export default function CE() {
  return (
    // <Layout title="CE" description="CE">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Run chaos experiments</li>
    //   </ul>
    <div className="container">
      <img src="/img/ce.svg" />
      <div className={styles.SectionName}>
        <h3>Run chaos experiments</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src="/img/icon_ce.svg" />
            <h1>Chaos Engineering</h1>
          </div>
          <div>
            <Link href="/docs/chaos-engineering">
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
          <div className={styles.content}>
            <p>
              Harness CE helps you find your system’s weak points using
              controlled systems-level failure experiments, and equips you with
              the information you need to prevent them from happening in the
              future. The result? Increased systems reliability and less
              downtime.
            </p>
            <div className={styles.alignCenter}>
              <Link
                className={clsx("button button--lg", styles.btn, styles.btnCE)}
                to="#all-tutorials"
              >
                CE Tutorials
                <img src="/img/Stroke.svg" />
              </Link>
              <Link href="https://harness.io/products/chaos-engineering">
                <button className={styles.link}>Learn more about CE</button>
              </Link>
            </div>
          </div>
          <div>
            <img src="/img/ce_flow.svg" />
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">All CE Tutorials</h3>
        <TutorialCard FeatureList={CEList} />
      </div>
    </div>
    // </Layout>
  );
}
