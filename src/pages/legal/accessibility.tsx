import React from "react";
import MDXContent from "@theme/MDXContent";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./accessibility.module.scss";
import Link from "@docusaurus/Link";

export default function AccessibilityPage() {
  // const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const { siteConfig } = useDocusaurusContext();
  return (
    <div>
      <MDXContent>
        <Layout
          title="Harness Accessibility Conformance Report" // {`${siteConfig.title}`}
          description={`${siteConfig.tagline}`} // "Description will go into a meta tag in <head />"
        >
          <main className={`container ${styles.container}`}>
            <h1>Harness Accessibility</h1>
            <h2>Our Accessibility Philosophy</h2>
            <p>
              At Harness, we are committed to making our platform accessible to
              everyone, drawing inspiration from Universal Design. Universal
              Design is a philosophy that aims to create inclusive products and
              systems, regardless of abilities or disabilities, ensuring equal
              access and opportunity for all.
            </p>
            <p>
              While we are still early in our accessibility journey, we are
              dedicated to achieving this goal through the following areas:
            </p>
            <div className={styles.goals}>
              <div className={styles.modules}>
                <div>
                  <img
                    src={`/img/accessibility/accessibility_img_1.svg`}
                    alt=""
                  />
                  <h4>Making all modules & features accessible</h4>
                  <p>
                    We strive to make every Harness module and feature easy to
                    access and use for everyone.
                  </p>
                </div>
              </div>
              <div className={styles.modules}>
                <div>
                  <img
                    src={`/img/accessibility/accessibility_img_2.svg`}
                    alt=""
                  />
                  <h4>Accessibility at the core of the business</h4>
                  <p>
                    We prioritize accessibility at the heart of our business,
                    ensuring it is an integral part of our values and
                    operations.
                  </p>
                </div>
              </div>
              <div className={styles.modules}>
                <div>
                  <img
                    src={`/img/accessibility/accessibility_img_3.svg`}
                    alt=""
                  />
                  <h4>Embracing an accessibility mindset</h4>
                  <p>
                    We integrate our accessibility philosophy into the daily
                    work of every Harness employee, fostering a culture of
                    inclusivity.
                  </p>
                </div>
              </div>
            </div>
            <p>
              Through these efforts, our aim is to meet the AA accessibility
              standard. If you encounter any accessibility issues or need
              further assistance with our modules, please don't hesitate to
              reach out to us at accessibility@harness.io.
            </p>
            <p>
              You can find our latest VPAT reports for each module and the
              platform using the links below:
            </p>
            <ul>
              <a href="#">
                <li>Harness CD VPAT Report</li>
              </a>
              <a href="#">
                <li>Harness CI VPAT Report</li>
              </a>
              <a href="#">
                <li>Harness FF VPAT Report</li>
              </a>
              <a href="#">
                <li>Harness CCM VAT Report</li>
              </a>
              <a href="#">
                <li>Harness STO VPAT Report</li>
              </a>
              <a href="#">
                <li>Harness SRM VPAT Report</li>
              </a>
              <a href="#">
                <li>Harness Chaos VPAT Report</li>
              </a>
              <a href="#">
                <li>Harness Platform VPAT Report</li>
              </a>
            </ul>
          </main>
        </Layout>
      </MDXContent>
    </div>
  );
}
