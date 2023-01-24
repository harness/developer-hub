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
          <a
            href="https://university.harness.io/page/job-role-certifications"
            target="_blank"
          >
            <li>
              <div className={styles.titleAndDesc}>
                <h4>Software Delivery Foundations</h4>
                <p>Test the foundational skills necessary to deliver modern software</p>
              </div>
              <div className={styles.harnessUPath}>
                <img
                  src={`${baseUrl}img/icon_univ-min.svg`}
                  className={styles.harnssUIcon}
                />
                <span>1 Certification</span>
              </div>
            </li>
          </a>
          <a>
            <li>
              <div className={styles.titleAndDesc}>
                <h4>Additional Certifications</h4>
                <p>Coming Soon</p>
              </div>
            </li>
          </a>
        </ul>
      </div>
    </section>
  );
}
