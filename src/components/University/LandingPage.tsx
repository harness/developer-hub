import React, { useEffect, useState } from "react";
// import Link from "@docusaurus/Link";
import { useHistory, useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import IltCard from "./Card";
import CertCard, { certType } from "./CertCard";
import { university } from "./data/certificationsData";
import { ilt } from "./data/iltData";
import { spt } from "./data/sptData";
import styles from "./styles.module.scss";
const devFeatures = ["Free Plan When Available"];
const administratorFeatures = ["Enterprise Plan"];
const adminFeatures = ["Enterprise Plan"];

export enum ActivePage {
  Certifications = "Certifications",
  SelfPacedTraning = "Self-Paced Training",
  InstructorLedTraining = "Instructor-Led Training",
}

export const getCertBadges = (url: string) => [
  {
    img: `${url}img/cert_dev_badge.svg`,
    alt: "Harness Certified Expert - Developer",
    type: certType.developer,
    url: "/university",
  },
  {
    img: `${url}img/cert_adm_badge.svg`,
    alt: "Harness Certified Expert - Administrator",
    type: certType.administrator,
    url: "/university",
  },
  {
    img: `${url}img/cert_arc_badge.svg`,
    alt: "Harness Certified Expert - Architect",
    type: certType.architect,
    url: "/university",
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
import { useColorMode } from "@docusaurus/theme-common";
export default function University() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const [activePage, setActivePage] = useState<string>(
    ActivePage.SelfPacedTraning
  );
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("lvl")) {
      setTab(params.get("lvl"));
      setActivePage(ActivePage.Certifications);
    } else if (location.search === "?ilt") {
      setActivePage(ActivePage.InstructorLedTraining);
    } else if (location.search === "?spt") {
      setActivePage(ActivePage.SelfPacedTraning);
    } else {
      setActivePage(ActivePage.SelfPacedTraning);
    }
  }, []);

  const handleCertficationClick = () => {
    history.push(`${pathname}?lvl=developer`);
    setActivePage(ActivePage.Certifications);
  };
  const handleInstLedTrainClick = () => {
    history.push(`${pathname}?ilt`);
    setActivePage(ActivePage.InstructorLedTraining);
  };
  const handleSelfPacedTrainingClick = () => {
    history.push(`${pathname}?spt`);
    setActivePage(ActivePage.SelfPacedTraning);
  };

  return (
    <div
      className={`${styles.university} ${activePage === ActivePage.SelfPacedTraning
          ? styles.SelfPacedTrainingBg
          : ""
        } ${activePage === ActivePage.InstructorLedTraining
          ? styles.InstructorLedTrainingBg
          : ""
        }  `}
    >
      <div className={styles.hero}>
        <div className={styles.left}>
          <h1>Harness University</h1>
          <div>
            Harness University offers comprehensive learning for all users, with
            Certifications and Instructor-Led Training. Master software delivery
            the Harness way.
          </div>
        </div>
        <div
          className={`${styles.right} ${activePage === ActivePage.SelfPacedTraning
              ? styles.SelfPacedTrainingBg
              : ""
            } ${activePage === ActivePage.InstructorLedTraining
              ? styles.InstructorLedTrainingBg
              : ""
            }  `}
        >
          {activePage === ActivePage.SelfPacedTraning && (
            <img
              className={styles.iltimg}
              src={
                colorMode == "light"
                  ? "/img/Instructor-Led Training light.svg"
                  : "/img/Instructor-Led Training dark.svg"
              }
              alt=""
            />
          )}
          {activePage === ActivePage.InstructorLedTraining && (
            <img
              className={styles.sptimg}
              src={
                colorMode == "light"
                  ? "/img/Self-Paced Training light.svg"
                  : "/img/Self-Paced Training dark.svg"
              }
              alt=""
            />
          )}
          {activePage === ActivePage.Certifications &&
            certBadges.map((badge) => (
              <img
                src={badge.img}
                alt={badge.alt}
                className={`${badge.type === certType[tab] ? styles.active : ""
                  } `}
              />
            ))}
        </div>
      </div>
      <div className={styles.btns}>
        <button
          onClick={handleSelfPacedTrainingClick}
          className={`${colorMode == "light"
              ? styles.InstLedTrainBtnLight
              : styles.InstLedTrainBtnDark
            } ${activePage === ActivePage.SelfPacedTraning
              ? colorMode == "light"
                ? styles.activeLight
                : styles.activeDark
              : ""
            }`}
        >
          {activePage == ActivePage.SelfPacedTraning ? (
            colorMode == "light" ? (
              <img src="/img/self-paced-training-logo-inactive.svg" />
            ) : (
              <img src="/img/self-paced-training-logo-active.svg" />
            )
          ) : colorMode == "light" ? (
            <img src="/img/self-paced-training-logo-active.svg" />
          ) : (
            <img src="/img/self-paced-training-logo-inactive.svg" />
          )}
          Self-Paced Training
        </button>
        <button
          onClick={handleInstLedTrainClick}
          className={`${colorMode == "light"
              ? styles.InstLedTrainBtnLight
              : styles.InstLedTrainBtnDark
            } ${activePage === ActivePage.InstructorLedTraining
              ? colorMode == "light"
                ? styles.activeLight
                : styles.activeDark
              : ""
            }`}
        >
          {activePage == ActivePage.InstructorLedTraining ? (
            colorMode == "light" ? (
              <img src="/img/Instructor_led_trainin_logo_unactive.svg" />
            ) : (
              <img src="/img/Instructor_led_trainin_logo.svg" />
            )
          ) : colorMode == "light" ? (
            <img src="/img/Instructor_led_trainin_logo.svg" />
          ) : (
            <img src="/img/Instructor_led_trainin_logo_unactive.svg" />
          )}
          Instructor-Led Training
        </button>
        <button
          className={`${colorMode == "light" ? styles.certBtnLight : styles.certBtnDark
            } ${activePage === ActivePage.Certifications
              ? colorMode == "light"
                ? styles.activeLight
                : styles.activeDark
              : ""
            }`}
          onClick={handleCertficationClick}
        >
          {activePage == ActivePage.Certifications ? (
            colorMode !== "light" ? (
              <img src="/img/certification_icon_unactive.svg" />
            ) : (
              <img src="/img/certification_icon.svg" />
            )
          ) : colorMode !== "light" ? (
            <img src="/img/certification_icon.svg" />
          ) : (
            <img src="/img/certification_icon_unactive.svg" />
          )}
          Certifications
        </button>
      </div>
      {activePage === ActivePage.Certifications && (
        <div className={styles.tabs}>
          <h2>Certifications</h2>
          <p>
            Test and validate your knowledge of Harness by becoming a Harness
            Certified Expert.
          </p>
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
              {university
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
              {university
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
              {university
                .filter((cert) => cert.type === certType.architect)
                .map((cert) => (
                  <CertCard {...cert} />
                ))}
            </div>
          </div>
          <div className={styles.availableCerts}>
            <h3>Which Certification is right for you?</h3>

            <p>
              Progress from Developer to Architect. Follow the learning paths to
              progress to the next level.
            </p>

            <div className={styles.availableCertsBox}>
              <div className={styles.certs}>
                <div className={styles.certDescription}>
                  <div className={styles.titleLine}>
                    <h4>Developer</h4>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                  <p>
                    Validate your knowledge of software delivery concepts on the
                    Harness Platform for your needs.
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
                  <h5>Available Certifications</h5>
                  <div className={styles.availableCerts}>
                    <img
                      src={`${baseUrl}img/cert_dev_cd_badge.svg`}
                      alt="Developer Continuous Delivery Badge"
                    />
                    <img
                      src={`${baseUrl}img/cert_dev_ci_badge.svg`}
                      alt="Developer Continuous Integration Badge"
                    />
                    <img
                      src={`${baseUrl}img/cert_dev_ff_badge.svg`}
                      alt="Developer FF Badge"
                    />
                    <img
                      src={`${baseUrl}img/cert_dev_ccm_badge.svg`}
                      alt="Developer CCM Badge"
                    />
                    <img
                      src={`${baseUrl}img/cert_dev_sto_badge.svg`}
                      alt="Developer STO Badge"
                    />
                    <img
                      src={`${baseUrl}img/cert_dev_ce_badge.svg`}
                      alt="Developer Chaos Badge"
                    />
                    <img
                      src={`${baseUrl}img/cert_dev_idp_badge.svg`}
                      alt="Developer IDP Badge"
                    />
                    <img
                      src={`${baseUrl}img/cert_dev_sei_badge.svg`}
                      alt="Developer SEI Badge"
                    />
                    <img
                      src={`${baseUrl}img/cert_dev_iacm_badge.svg`}
                      alt="Developer IaCM Badge"
                    />
                  </div>
                  {/*
                <h5>Coming Soon</h5>
                <div className={styles.unAvailableCerts}>
                  <img
                    src={`${baseUrl}img/cert_dev_iacm_badge.svg`}
                    alt="Developer IaCM Badge"
                  /> 
                </div> 
*/}
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
                  <h5>Available Certifications</h5>
                  <div className={styles.availableCerts}>
                    <img
                      src={`${baseUrl}img/cert_adm_cd_badge.svg`}
                      alt="Administrator Continuous Delivery Badge"
                    />
                    <img
                      src={`${baseUrl}img/cert_adm_ci_badge.svg`}
                      alt="Administrator Continuous Integration Badge"
                    />
                    <img
                      src={`${baseUrl}img/cert_adm_ff_badge.svg`}
                      alt="Administrator FF Badge"
                    />
                    <img
                      src={`${baseUrl}img/cert_adm_sto_badge.svg`}
                      alt="Administrator STO Badge"
                    />
                    <img
                      src={`${baseUrl}img/cert_adm_ccm_badge.svg`}
                      alt="Administrator CCM Badge"
                    />
                  </div>
                  {/* <h5>Coming Soon</h5> 
                <h5>Coming Soon</h5>
                <div className={styles.unAvailableCerts}>
                  <img
                    src={`${baseUrl}img/cert_adm_ccm_badge.svg`}
                    alt="Administrator CCM Badge"
                  /> 
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
                  <h5>Available Certifications</h5>
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

                  {/* <h5>Coming Soon</h5> */}
                  {/* <div className={styles.unAvailableCerts}>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activePage === ActivePage.InstructorLedTraining && (
        <div className={styles.tabs}>
          <h2>Instructor-Led Training</h2>
          <p>
            Intensive two-day courses are designed for engineers looking to
            deepen their understanding and expertise in Harness. Can be
            delivered in a dedicated or{" "}
            <a
              href="https://university-registration.harness.io/calendar"
              target="_blank"
            >
              {" "}
              shared virtual{" "}
            </a>{" "}
            format.
          </p>
          <div className={clsx(styles.tabContent, styles.active)}>
            <div className={styles.cardContainer}>
              {ilt
                .filter((ilt) => {
                  return ilt.tileType === "pre requisite";
                })
                .map((ilt) => (
                  <IltCard {...ilt} />
                ))}
              {ilt
                .filter((ilt) => {
                  return ilt.tileType === "normal";
                })
                .map((ilt) => (
                  <IltCard {...ilt} />
                ))}
            </div>
          </div>
        </div>
      )}

      {activePage === ActivePage.SelfPacedTraning && (
        <div className={styles.tabs}>
          <h2>Self-Paced Training</h2>
          <p>Free self-paced courses that you can consume on your own time.</p>
          <div className={clsx(styles.tabContent, styles.active)}>
            <div className={styles.cardContainer}>
              {spt
                .filter((spt) => {
                  return spt.tileType === "pre requisite";
                })
                .map((spt) => (
                  <IltCard {...spt} />
                ))}
              {spt
                .filter((spt) => {
                  return spt.cardType === "FREE" && spt.tileType === "normal";
                })
                .map((spt) => (
                  <IltCard {...spt} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
