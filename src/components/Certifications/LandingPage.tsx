import React, { useEffect, useState } from "react";
// import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useHistory, useLocation } from "@docusaurus/router";
import CertCard, { certType } from "./CertCard";
import { certifications } from "./data/certificationsData";
import styles from "./styles.module.scss";

export const getCertBadges = (url: string) => [
  {
    img: `${url}img/cert_dev_badge.svg`,
    alt: "Harness Certified Expert - Developer",
    type: certType.developer,
    url: "/certifications",
  },
  {
    img: `${url}img/cert_adm_badge.svg`,
    alt: "Harness Certified Expert - Administrator",
    type: certType.administrator,
    url: "/certifications",
  },
  {
    img: `${url}img/cert_arc_badge.svg`,
    alt: "Harness Certified Expert - Architect",
    type: certType.architect,
    url: "/certifications",
  },
];

export const getCertLevel = (search: string) => {
  let searchKey = search.replace(/^\?.*=/, "");
  if (URLSearchParams) {
    // just in case user's browser doesn't support URLSearchParams
    const params = new URLSearchParams(search);
    const paramLvl = params.get("lvl");
    if (paramLvl) {
      searchKey = paramLvl;
    }
  }
  return searchKey;
};

export default function Certifications() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  // React router provides the current component's route, even in SSR
  const location = useLocation();
  const history = useHistory();
  const { pathname = "/", search = "" } = location;
  const searchKey = getCertLevel(search);
  const [tab, setTab] = useState("developer");
  const handleSwitchTab = (tabKey) => {
    setTab(tabKey);
    if (pathname && tabKey) {
      history.push(`${pathname}?lvl=${tabKey}`);
    }
  };

  const certBadges = getCertBadges(baseUrl);

  useEffect(() => {
    if (searchKey) {
      setTab(searchKey);
    }
  }, [searchKey]);

  return (
    <div className={styles.certifications}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <h1>Harness Certifications</h1>
          <div>
            Test and validate your knowledge of modern software delivery by
            becoming a Harness Certified Expert.
          </div>
        </div>
        <div className={styles.right}>
          {certBadges.map((badge) => (
            <img
              src={badge.img}
              alt={badge.alt}
              className={badge.type === certType[tab] ? styles.active : ""}
            />
          ))}
        </div>
      </div>

      <div className={styles.tabs}>
        <ul className={styles.tabItems}>
          {Object.entries(certType).map(([tabKey, tabVal]) => (
            <li
              key={tabKey}
              className={tab === tabKey ? styles.active : ""}
              onClick={() => handleSwitchTab(tabKey)}
            >
              For {tabVal}
            </li>
          ))}
        </ul>

        {/* Developer Tab Content */}
        <div
          className={clsx(
            styles.tabContent,
            certType[tab] === certType.developer && styles.active
          )}
        >
          <div className={styles.cardContainer}>
            {certifications
              .filter((cert) => cert.type === certType.developer)
              .map((cert) => (
                <CertCard {...cert} />
              ))}
          </div>
        </div>

        {/* Administrator Tab Content */}
        <div
          className={clsx(
            styles.tabContent,
            certType[tab] === certType.administrator && styles.active
          )}
        >
          <div className={styles.cardContainer}>
            {certifications
              .filter((cert) => cert.type === certType.administrator)
              .map((cert) => (
                <CertCard {...cert} />
              ))}
          </div>
        </div>

        {/* Architect Tab Content */}
        <div
          className={clsx(
            styles.tabContent,
            certType[tab] === certType.architect && styles.active
          )}
        >
          <div className={styles.cardContainer}>
            {certifications
              .filter((cert) => cert.type === certType.architect)
              .map((cert) => (
                <CertCard {...cert} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
