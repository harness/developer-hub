import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";

import { getCertBadges } from "../Certifications/LandingPage";
import CertCard, { certType, CardItem } from "../Certifications/CertCard";

// Define the certs section cards here
const certifications: CardItem[] = [
  {
    title: "Continuous Delivery & GitOps Certifications",
    module: "cd",
    description:
      "Continuous Delivery & GitOps focuses on delivery and deployment of application and infrastructure changes in a safe and sustainable way.",
    link: "/certifications/continuous-delivery",
    numberOfCerts: 3,
  },
  {
    title: "Continuous Integrations Certifications",
    module: "ci",
    description:
      "Continuous Integration focuses on building and testing your code. Your Continuous Integration pipeline should provides a bird's-eye view and analyze the root causes of issues.",
    link: "/certifications/continuous-integration",
    numberOfCerts: 3,
  },
];

// harness-platform.svg | secret-mgmt.svg
export default function HarnessU(): JSX.Element {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const certBadges = getCertBadges(baseUrl);
  return (
    <section className={styles.harnessU}>
      <div className={styles.inner}>
        <div className="container">
          <div className={styles.dualColumn}>
            <div className={styles.left}>
              <h2>Become a Harness Certified Expert</h2>
              <div className={styles.desc}>
                Learn intelligent software delivery skills at your own pace and
                in once place. Step-by-step tutorials, videos, and reference
                docs to help you create and deliver software.
              </div>
              <div className={styles.badges}>
                {certBadges.map((badge) => (
                  <Link to={badge.url} key={badge.img}>
                    <img
                      src={badge.img}
                      alt={badge.alt}
                      // className={badge.type === tab ? styles.active : ""}
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.cards}>
                {certifications.map((cert) => (
                  <CertCard {...cert} thumb={true} key={cert.title} />
                ))}
              </div>
              <div className={styles.links}>
                <Link to="/certifications">
                  See all certifications{" "}
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
