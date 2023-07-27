import React, { useEffect, useState } from "react";
// import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useHistory, useLocation } from "@docusaurus/router";
import CertCard, { certType } from "./CertCard";
import { certifications } from "./data/certificationsData";
import styles from "./styles.module.scss";

const devFeatures = [
  "Free Plan",
];
const administratorFeatures = [
  "Enterprise Plan",
];
const adminFeatures = [
  "Enterprise Plan",
];

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
          {Object.entries(certType).map(([tabKey, tabVal], index) => (
            <div className={styles.listTabItems}>
              <li
                key={tabKey}
                className={tab === tabKey ? styles.active : ""}
                onClick={() => handleSwitchTab(tabKey)}
              >
                For {tabVal}
              </li>
              {index < 2 && <i className="fa-solid fa-chevron-right"></i>}
            </div>
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
        <div className={styles.availableCerts}>
          <h3>Which Certification is right for you?</h3>

          <p>
            Progress from Developer to Architect level certifications. Follow
            the learning paths to progress to the next level.
          </p>

          <div className={styles.availableCertsBox}>
            <div className={styles.certs}>
              <div className={styles.certDescription}>
                <div className={styles.titleLine}>
                  <h4>Developer</h4>
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
                <p>Validate your knowledge of software delivery concepts.</p>

                <ul>
                  {devFeatures.map((feature) => (
                    <li>
                      <i className="fa-solid fa-check"></i>
                      <p>{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.certBadges}>
                <h5>
                  Available Certifications
                </h5>
                <div className={styles.availableCerts}>
                  <img
                    src={`${baseUrl}img/cert_dev_cd_badge.svg`}
                    alt="Developer Continuous Delivery Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_dev_ci_badge.svg`}
                    alt="Developer Continuous Integration Badge"
                  />
                </div>
                {/* <h5>Coming Soon</h5> */}
              </div>
            </div>
            <div className={styles.verticalLine}></div>

            <div className={styles.certs}>
              <div className={styles.certDescription}>
                <div className={styles.titleLine}>
                  <h4>Administrator</h4>
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
                <p>
                  Assesses and validate your skills to maintain the Harness
                  Platform for your software delivery needs.
                </p>
                <ul>
                  {administratorFeatures.map((feature) => (
                    <li>
                      <i className="fa-solid fa-check"></i>
                      <p>{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.certBadges}>
                <h5>
                  Available Certifications
                </h5>
                <div className={styles.availableCerts}>
                  <img
                    src={`${baseUrl}img/cert_adm_cd_badge.svg`}
                    alt="Administrator Continuous Delivery Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_adm_ci_badge.svg`}
                    alt="Administrator Continuous Integration Badge"
                  />
                </div>
               {/* <h5>Coming Soon</h5> */}
               {/* <div className={styles.unAvailableCerts}>
                </div> */}
              </div>
            </div>

            <div className={styles.verticalLine}></div>
            <div className={styles.certs}>
              <div className={styles.certDescription}>
                <div className={styles.titleLine}>
                  <h4>Architect</h4>
                </div>
                <p>
                  Assesses and validate your skills to scale the Harness
                  Platform for your organization's software delivery needs.
                </p>
                <ul>
                  {adminFeatures.map((feature) => (
                    <li>
                      <i className="fa-solid fa-check"></i>
                      <p>{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.certBadges}>
                {/* <h5>Available Certification</h5> */}

                {/* <div className={styles.availableCerts}>
                </div> */}
                <h5>Coming Soon</h5>
                <div className={styles.unAvailableCerts}>
                  <img
                    src={`${baseUrl}img/cert_arc_cd_badge.svg`}
                    alt="Architect Continuous Delivery Badge"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
