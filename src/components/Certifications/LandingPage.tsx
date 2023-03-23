import React, { useState } from "react";
// import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CertCard, { certType } from "./CertCard";
import { certifications } from "./data/certification-cards";
import styles from "./styles.module.scss";

export const getCertBadges = (url: string) => [
  {
    img: `${url}img/cert_dev_badge.svg`,
    alt: "Harness Certified Expert - Developer",
    type: certType.Developer,
    url: "/certifications",
  },
  {
    img: `${url}img/cert_adm_badge.svg`,
    alt: "Harness Certified Expert - Administrator",
    type: certType.Administrator,
    url: "/certifications",
  },
  {
    img: `${url}img/cert_arc_badge.svg`,
    alt: "Harness Certified Expert - Architect",
    type: certType.Architect,
    url: "/certifications",
  },
];

export default function Certifications() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const [tab, setTab] = useState(certType.Developer);
  const handleSwitchTab = (tabVal) => {
    setTab(tabVal);
  };

  const certBadges = getCertBadges(baseUrl);

  return (
    <div className={styles.certifications}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <h1>Harness Certifications</h1>
          <div>
            Test and validate your knowledge of modern software delivery by
            becoming a Harness Certified Expert..
          </div>
        </div>
        <div className={styles.right}>
          {certBadges.map((badge) => (
            <img
              src={badge.img}
              alt={badge.alt}
              className={badge.type === tab ? styles.active : ""}
            />
          ))}
        </div>
      </div>

      <div className={styles.tabs}>
        <ul className={styles.tabItems}>
          {Object.values(certType).map((tabVal) => (
            <li
              key={tabVal}
              className={tab === tabVal ? styles.active : ""}
              onClick={() => handleSwitchTab(tabVal)}
            >
              For {tabVal}
            </li>
          ))}
        </ul>

        {/* Developer Tab Content */}
        <div
          className={clsx(
            styles.tabContent,
            tab === certType.Developer && styles.active
          )}
        >
          <div className={styles.cardContainer}>
            {certifications
              .filter((cert) => cert.type === certType.Developer)
              .map((cert) => (
                <CertCard {...cert} />
              ))}
          </div>
        </div>

        {/* Administrator Tab Content */}
        <div
          className={clsx(
            styles.tabContent,
            tab === certType.Administrator && styles.active
          )}
        >
          <div className={styles.cardContainer}>
            {certifications
              .filter((cert) => cert.type === certType.Administrator)
              .map((cert) => (
                <CertCard {...cert} />
              ))}
          </div>
        </div>

        {/* Architect Tab Content */}
        <div
          className={clsx(
            styles.tabContent,
            tab === certType.Architect && styles.active
          )}
        >
          <div className={styles.cardContainer}>
            {certifications
              .filter((cert) => cert.type === certType.Architect)
              .map((cert) => (
                <CertCard {...cert} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
