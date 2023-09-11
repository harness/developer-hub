import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard from "./TutorialCard";
// Defined card list in "./data/continuousDeliveryData.tsx"
import { K8SList, ServerlessList, VMList, ECSList, AdvList } from "./data/continuousDeliveryData";

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
      <div className={styles.subSection}>
        <h3 id="get-started">Automate Kubernetes deployments with a CD Pipeline or GitOps Workflow</h3>
        <TutorialCard FeatureList={K8SList} />
      </div>
      <div className={styles.subSection}>
        <h3 id="get-started">Automate Serverless deployments with a CD Pipeline</h3>
        <TutorialCard FeatureList={ServerlessList} />
      </div>
      <div className={styles.subSection}>
        <h3 id="get-started">Automate Linux or Windows VM deployments with a CD Pipeline</h3>
        <TutorialCard FeatureList={VMList} />
      </div>
      <div className={styles.subSection}>
        <h3 id="get-started">Automate Amazon ECS deployments with a CD Pipeline</h3>
        <TutorialCard FeatureList={ECSList} />
      </div>
      <div className={styles.subSection}>
        <h3 id="get-started">Learn Advanced CD & GitOps</h3>
        <TutorialCard FeatureList={AdvList} />
      </div>
      
    </div>
    // </Layout>
  );
}
