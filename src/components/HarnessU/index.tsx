import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

// harness-platform.svg | secret-mgmt.svg
export default function HarnessU(): JSX.Element {
  return (
    <section className={styles.harnessU}>
      <div className="container">
        <h2>Become a Certified Expert with University</h2>

        {/* <div className={styles.subSectionName}><h3>Platform</h3></div> */}
        <ul className={styles.platformList}>
          <a
            href="https://university.harness.io/page/self-paced-learning"
            target="_blank"
          >
            <li>
              <div className={styles.titleAndDesc}>
                <h4>Module-Based Paths</h4>
                <p>
                  Self-paced courses to help onboarding your teams to Harness
                </p>
              </div>
              <div className={styles.harnessUPath}>
                <img
                  src="/img/icon_univ-path.svg"
                  className={styles.harnssUIcon}
                />
                <span>4 Paths</span>
              </div>
            </li>
          </a>
          <a href="https://university.harness.io/page/roles" target="_blank">
            <li>
              <div className={styles.titleAndDesc}>
                <h4>Role-Based Paths</h4>
                <p>
                  Developers, DevOps Engineers, SecOps Engineers, FinOps
                  Engineers, SREs
                </p>
              </div>
              <div className={styles.harnessUPath}>
                <img
                  src="/img/icon_univ-path.svg"
                  className={styles.harnssUIcon}
                />
                <span>5 Roles</span>
              </div>
            </li>
          </a>
          <a
            href="https://university.harness.io/page/certifications"
            target="_blank"
          >
            <li>
              <div className={styles.titleAndDesc}>
                <h4>Certifications</h4>
                <p>Certifications in Software Delivery</p>
              </div>
              <div className={styles.harnessUPath}>
                <img
                  src="/img/icon_univ-min.svg"
                  className={styles.harnssUIcon}
                />
                <span>1 Certification</span>
              </div>
            </li>
          </a>
        </ul>
        <div className={styles.buttons}>
          <Link
            className={clsx("button button--lg", styles.heroButton)}
            to="https://university.harness.io"
          >
            See all at Harness University
            <svg
              width="13.5"
              height="13.5"
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"
            >
              <path
                fill="currentColor"
                d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
