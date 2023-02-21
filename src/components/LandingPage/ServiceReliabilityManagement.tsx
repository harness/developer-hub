import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard, { CardItem, docType } from "./TutorialCard";

/* Define the cards here */
const FeaturedList: CardItem[] = [
  {
    title: "Introduction to SLO Management with Prometheus",
    module: "srm",
    icon: "img/icon_srm.svg",
    description: (
      <>
        Introducing SLOs and how to measure and manage your SLOs leveraging
        Prometheus.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/manage-service-reliability/intro-to-srm",
  },
];

const SRMList: CardItem[] = [
  {
    title: "Introduction to SLO Management with Prometheus",
    module: "srm",
    icon: "img/icon_srm.svg",
    description: (
      <>
        Introducing SLOs and how to measure and manage your SLOs leveraging
        Prometheus.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/manage-service-reliability/intro-to-srm",
  },
  {
    title: "Introduction to Java Exception Management",
    module: "srm",
    icon: "img/icon_srm.svg",
    description: (
      <>
        Finding and fixing caught, uncaught, and swallowed Java exceptions.
        Learn the process and find the right tooling.
      </>
    ),
    newDoc: false,
    type: [docType.Interactive, docType.Video],
    time: "10min",
    link: "/tutorials/manage-service-reliability/intro-java-exception-management",
  },
];

export default function SRM() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <div className="container">
      <div className={styles.SectionName}>
        <h3>Manage Service Reliability</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_srm.svg`} />
            <h1>Service Reliability Management</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/service-reliability-management">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
                <i className="fa-regular fa-file"></i>
                Documentation
              </button>
            </Link>

            <Link href="/release-notes/service-reliability-management">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
                <i className="fa-regular fa-file"></i>
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Harness Service Reliability Management (SRM) module helps
              engineering and DevOps teams to balance feature velocity and bug
              fixes along with the stability and reliability needs in a
              production environment.
            </p>
            <div className={styles.alignCenter}>
              <Link
                className={clsx("button button--lg", styles.btn, styles.btnSRM)}
                to="#all-tutorials"
              >
                Tutorials
                <img src={`${baseUrl}img/Stroke.svg`} />
              </Link>
              <Link href="https://harness.io/products/service-reliability-management">
                <button className={styles.link}>Learn more</button>
              </Link>
            </div>
          </div>
          <div>
            <img src={`${baseUrl}img/srm.svg`} />
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">All SRM Tutorials</h3>
        <TutorialCard FeatureList={SRMList} />
      </div>
    </div>
    // </Layout>
  );
}
