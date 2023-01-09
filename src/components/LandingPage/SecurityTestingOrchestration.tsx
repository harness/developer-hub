import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard, { CardItem, docType } from "./TutorialCard";

/* Define the cards here */
const FeaturedList: CardItem[] = [
  {
    title: "Scanning a NodeJS Application",
    module: "sto",
    icon: "img/icon_sto.svg",
    description: (
      <>Scanning a NodeJS Application and prioritizing scan results.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/orchestrate-security-tests/nodejs-firstscan",
  },
];

const STOList: CardItem[] = [
  {
    title: "Scanning a NodeJS Application",
    module: "sto",
    icon: "img/icon_sto.svg",
    description: (
      <>Scanning a NodeJS Application and prioritizing scan results.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/orchestrate-security-tests/nodejs-firstscan",
  },
];

export default function STO() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    // <Layout title="STO" description="STO">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Orchestrate security tests</li>
    //   </ul>
    <div className="container">
      <div className={styles.SectionName}>
        <h3>Orchestrate security tests</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_sto.svg`} />
            <h1>Security Testing Orchestration</h1>
          </div>
          <div>
            <Link href="/docs/security-testing-orchestration">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
                <img src={`${baseUrl}img/icon_document.png`} /> Documentation
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Harness STO enables DevOps and Security teams teams to left shift security testing as a key outcome of their DevSecOps initiative. STO orchestrates
              scanning, intelligently deduplicating scanner output, prioritizing
              remediations, and enforcing governance into your Pipeline. STO
              puts scanning directly into your Pipelines to ensure that
              vulnerabilities are caught and fixed before your products are ever
              released.
            </p>
            <div className={styles.alignCenter}>
              <Link
                className={clsx("button button--lg", styles.btn, styles.btnSTO)}
                to="#all-tutorials"
              >
                Tutorials
                <img src={`${baseUrl}img/Stroke.svg`} />
              </Link>
              <Link href="https://harness.io/products/security-testing-orchestration">
                <button className={styles.link}>Learn more</button>
              </Link>
            </div>
          </div>
          <div>
            <img src={`${baseUrl}img/sto.svg`} />
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">All STO Tutorials</h3>
        <TutorialCard FeatureList={STOList} />
      </div>
    </div>
    // </Layout>
  );
}
