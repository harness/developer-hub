import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
import { FeaturedList, SSCAList } from "./data/softwareSupplyChainAssuranceData";

export default function SSCA() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    // <Layout title="SSCA" description="SSCA">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Secure supply chain</li>
    //   </ul>
    <div className="container">
      <div className={styles.SectionName}>
        <h3>Secure your software supply chain.</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_ssca.svg`} />
            <h1>Software Supply Chain Assurance</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/software-supply-chain-assurance">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_documentation.svg`} />
                Documentation
              </button>
            </Link>

            <Link href="/release-notes/software-supply-chain-assurance">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
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
            The Harness Software Supply Chain Assurance (SSCA) module addresses the challenges of securing your software supply chain. 
            The SSCA module aims to help you establish trust in the software supply chain, manage open-source components, 
            ensure policy compliance, identify security vulnerabilities, and enable rapid responses to new threats.
            </p>
            <div className={styles.alignCenter}>
              <Link
                className={clsx("button button--lg", styles.btn, styles.btnSSCA)}
                to="#all-tutorials"
              >
                Tutorials <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link href="https://harness.io/products/software-supply-chain-assurance">
                <button className={styles.link}>Learn more</button>
              </Link>
            </div>
          </div>
          <div>
            <img src={`${baseUrl}img/ssca.svg`} />
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">All SSCA Tutorials</h3>
        <TutorialCard FeatureList={SSCAList} />
      </div>
    </div>
    // </Layout>
  );
}
