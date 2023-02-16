import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";

// harness-platform.svg | secret-mgmt.svg
export default function HarnessU(): JSX.Element {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <section className={styles.harnessU}>
      <div className="container">
        <h2>Become a Harness Certified Expert</h2>

        {/* <div className={styles.subSectionName}><h3>Platform</h3></div> */}
        <ul className={styles.platformList}>
          <a href="certifications/">
            <li>
              <div className={styles.titleAndDesc}>
                <h4>All Certifications</h4>
                <p>Test your knowdledge of modern software delivery</p>
              </div>
            </li>
          </a>
          <a href="certifications/continuous-delivery">
            <li>
              <div className={styles.titleAndDesc}>
                <h4>Continuous Delivery & GitOps Certifications</h4>
                <p>BETA Coming Soon</p>
              </div>
            </li>
          </a>
          <a href="https://university.harness.io/page/job-role-certifications"
            target="_blank">
            <li>
              <div className={styles.titleAndDesc}>
                <h4>Software Delivery Foundations</h4>
              </div>
            </li>
          </a>    
        </ul>
      </div>
    </section>
  );
}
