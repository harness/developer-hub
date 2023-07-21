import React from "react";
import MDXContent from "@theme/MDXContent";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./accessibility.module.scss";
import Link from "@docusaurus/Link";
// import Harness_CD_VPAT_Report from "../../../static/doc/"

export default function AccessibilityPage() {
  // const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const { siteConfig } = useDocusaurusContext();

  const baseUrl = siteConfig.url;

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
                    alt="Making all modules & features accessible"
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
                    alt="Accessibility at the core of the business"
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
                    alt="Embracing an accessibility mindset"
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
              <li>
                <Link
                  to={`${baseUrl}/doc/Harness_CD_VPAT_Report.pdf`}
                  className={styles.link}
                >
                  Harness CD VPAT Report
                </Link>
              </li>
              <li>
                <Link
                  to={`${baseUrl}/doc/Harness_CI_VPAT_Report.pdf`}
                  className={styles.link}
                >
                  Harness CI VPAT Report
                </Link>
              </li>
              <li>
                <Link
                  to={`${baseUrl}/doc/Harness_FF_VPAT_Report.pdf`}
                  className={styles.link}
                >
                  Harness FF VPAT Report
                </Link>
              </li>
              <li>
                <Link
                  to={`${baseUrl}/doc/Harness_CCM_VPAT_Report.pdf`}
                  className={styles.link}
                >
                  Harness CCM VAT Report
                </Link>
              </li>
              <li>
                <Link
                  to={`${baseUrl}/doc/Harness_STO_VPAT_Report.pdf`}
                  className={styles.link}
                >
                  Harness STO VPAT Report
                </Link>
              </li>
              <li>
                <Link
                  to={`${baseUrl}/doc/Harness_SRM_VPAT_Report.pdf`}
                  className={styles.link}
                >
                  Harness SRM VPAT Report
                </Link>
              </li>
              <li>
                <Link
                  to={`${baseUrl}/doc/Harness_Chaos_VPAT_Report.pdf`}
                  className={styles.link}
                >
                  Harness Chaos Engineering VPAT Report
                </Link>
              </li>
              <li>
                <Link
                  to={`${baseUrl}/doc/Harness_Platform_VPAT_Report.pdf`}
                  className={styles.link}
                >
                  Harness Platform VPAT Report
                </Link>
              </li>
            </ul>
          </main>
        </Layout>
      </MDXContent>
    </div>
  );
}
