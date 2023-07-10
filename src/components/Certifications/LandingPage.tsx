import React, { useEffect, useState } from "react";
// import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useHistory, useLocation } from "@docusaurus/router";
import CertCard, { certType } from "./CertCard";
import { certifications } from "./data/certificationsData";
import styles from "./styles.module.scss";

const devFeatures = [
  "Beginner",
  "Free/Team Plan",
  "No prior experience needed",
];
const administratorFeatures = [
  "Intermediate",
  "Team/Enterprise Plan",
  "Has understanding fundamentals",
  "Has....experience",
];
const adminFeatures = [
  "Advanced",
  "Enterprise Plan",
  "Has in-depth experience setting up pipeline environments",
  "Has....experience",
  "Expert level....",
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
            becoming a Harness Certified Expert..
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
            Progress from Developer to Architect Certified! - [Some description
            here on how to progress?]
          </p>

          <div className={styles.availableCertsBox}>
            <div className={styles.certs}>
              <div className={styles.certDescription}>
                <div className={styles.titleLine}>
                  <h4>Developer</h4>
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
                <p>
                  Validate your broad knowledge of cloud concepts and the
                  products, services, tools, features, benefits, and use cases
                  of CI.
                </p>

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
                <h5>Available Certification</h5>
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
                <h5>Comming Soon</h5>
                <div className={styles.unAvailableCerts}>
                  <img
                    src={`${baseUrl}img/cert_dev_ccm_badge.svg`}
                    alt="Developer Cloud Cost Management Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_dev_ce_badge.svg`}
                    alt="Developer Chaos Engineering Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_dev_ff_badge.svg`}
                    alt="Developer Feature Flag Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_dev_srm_badge.svg`}
                    alt="Developer Service Reliablity Management  Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_dev_sto_badge.svg`}
                    alt="Developer Software Testing Orchestration Badge"
                  />
                </div>
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
                  Assesses the fundamental skills to deploy and maintain CI
                  projects.
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
                <h5>Available Certification</h5>
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
                <h5>Comming Soon</h5>
                <div className={styles.unAvailableCerts}>
                  <img
                    src={`${baseUrl}img/cert_adm_ccm_badge.svg`}
                    alt="Administrator Cloud Cost Management Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_adm_ce_badge.svg`}
                    alt="Administrator Chaos Engineering Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_adm_ff_badge.svg`}
                    alt="Administrator Feature Flag Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_adm_srm_badge.svg`}
                    alt="Administrator Service Reliablity Management  Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_adm_sto_badge.svg`}
                    alt="Administrator Software Testing Orchestration Badge"
                  />
                </div>
              </div>
            </div>

            <div className={styles.verticalLine}></div>
            <div className={styles.certs}>
              <div className={styles.certDescription}>
                <div className={styles.titleLine}>
                  <h4>Architect</h4>
                </div>
                <p>
                  Assess key technical job functions and advanced skills in
                  design, implementation and management of CI.
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
                <h5>Available Certification</h5>

                <div className={styles.availableCerts}>
                  <img
                    src={`${baseUrl}img/cert_arc_cd_badge.svg`}
                    alt="Architect Continuous Delivery Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_arc_ci_badge.svg`}
                    alt="Architect Continuous Integration Badge"
                  />
                </div>
                <h5>Comming Soon</h5>
                <div className={styles.unAvailableCerts}>
                  <img
                    src={`${baseUrl}img/cert_arc_ccm_badge.svg`}
                    alt="Architect Cloud Cost Management Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_arc_ce_badge.svg`}
                    alt="Architect Chaos Engineering Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_arc_ff_badge.svg`}
                    alt="Architect Feature Flag Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_arc_srm_badge.svg`}
                    alt="Architect Service Reliablity Management  Badge"
                  />
                  <img
                    src={`${baseUrl}img/cert_arc_sto_badge.svg`}
                    alt="Architect Software Testing Orchestration Badge"
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
