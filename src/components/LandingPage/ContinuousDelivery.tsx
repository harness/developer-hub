import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
// Defined card list in "./data/continuousDeliveryData.tsx"
import { CDList } from "./data/continuousDeliveryData";

export default function CD() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    // <Layout title="CD" description="CD">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Deploy services</li>
    //   </ul>
    <div className="container">
      <div className={styles.SectionName}>
        <h3>
          Set up CD pipelines to automate deployment of services to your
          infrastructure
        </h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_cd.svg`} />
            <h1>Continuous Delivery & GitOps</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/continuous-delivery">
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

            <Link href="/release-notes/continuous-delivery">
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
              Harness CD & GitOps enables deployment of application and
              infrastructure changes in a safe and sustainable way. Your CD
              pipeline or GitOps workflow should automate all of the steps
              necessary to get your changes into production.
            </p>
            <div className={styles.alignCenter}>
              <Link
                className={clsx("button button--lg", styles.btn, styles.btnCD)}
                to="#get-started"
              >
                Tutorials <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link href="https://harness.io/products/continuous-delivery">
                <button className={styles.link}>Learn more</button>
              </Link>
            </div>
          </div>
          <div>
            <img src={`${baseUrl}img/cd.svg`} />
          </div>
        </div>
      </div>
      <h3 id="get-started">All CD Tutorials</h3>
      {CDList.map((item) => (
        <div className={styles.subSection}>
          <div className={styles.SectionName}>
            {item.icon && <img src={`${baseUrl}${item.icon}`} />}
            <h4>{item.name}</h4>
          </div>
          <TutorialCard FeatureList={item.list} />
        </div>
      ))}
    </div>
    // </Layout>
  );
}
