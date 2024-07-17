import Link from "@docusaurus/Link";
import { useHistory, useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { MODULES } from "../../constants";
import IltCard from "./Card";
import { certType } from "./CertCard";
import { ActivePage, getCertLevel } from "./LandingPage";
import AdminCertificationExamDetails from "./data/ci-certification-admin-exam-details.md";
import AdminCertificationReviewGuide from "./data/ci-certification-admin-review-guide.md";
import ArchitectCertificationExamDetails from "./data/ci-certification-architect-exam-details.md";
import ArchitectCertificationReviewGuide from "./data/ci-certification-architect-review-guide.md";
import DeveloperCertificationExamDetails from "./data/ci-certification-developer-exam-details.md";
import DeveloperCertificationReviewGuide from "./data/ci-certification-developer-review-guide.md";
import { ilt } from "./data/iltData";
import { spt } from "./data/sptData";
import styles from "./styles.module.scss";

const getCertBadges = (url: string) => [
  {
    img: `${url}img/cert_dev_ci_badge.svg`,
    alt: "Harness Certified Expert - Developer",
    type: certType.developer,
  },
  {
    img: `${url}img/cert_adm_ci_badge.svg`,
    alt: "Harness Certified Expert - Administrator",
    type: certType.administrator,
  },
  {
    img: `${url}img/cert_arc_ci_badge.svg`,
    alt: "Harness Certified Expert - Architect",
    type: certType.architect,
  },
];
import { useColorMode } from "@docusaurus/theme-common";
export default function CertificationsCI() {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  // React router provides the current component's route, even in SSR
  const location = useLocation();
  const history = useHistory();
  const { pathname = "/", search = "" } = location;
  const searchKey = getCertLevel(search);
  const [tab, setTab] = useState("developer");
  const [activePage, setActivePage] = useState<string>(
    ActivePage.SelfPacedTraning
  );
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
      className={`${styles.certificationsCI} ${
        activePage === ActivePage.SelfPacedTraning
          ? styles.SelfPacedTrainingBg
          : ""
      } ${
        activePage === ActivePage.InstructorLedTraining
          ? styles.InstructorLedTrainingBg
          : ""
      }  `}
    >
      <div className={styles.hero}>
        <div className={styles.left}>
          <div className={styles.linkBack}>
            <Link to={`${baseUrl}university`}>
              <i className="fa-solid fa-arrow-left"></i> Back to University Home
            </Link>
          </div>
          <h1>Continuous Integration</h1>
          <div>
            Optimizing performance through hosted builds, caching, and
            proprietary Test Intelligence™. Designed to be blazing fast, simple,
            and open to help make developers' lives easier. Plus, all the
            scalable features needed to meet enterprise demands – with developer
            autonomy alongside software efficiency , reliability, and security.
          </div>
        </div>
        <div
          className={`${styles.right} ${
            activePage === ActivePage.SelfPacedTraning
              ? styles.SelfPacedTrainingBg
              : ""
          } ${
            activePage === ActivePage.InstructorLedTraining
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
                className={`${
                  badge.type === certType[tab] ? styles.active : ""
                } ${styles.certimg}`}
              />
            ))}
        </div>
      </div>
      <div className={styles.btns}>
        <button
          onClick={handleSelfPacedTrainingClick}
          className={`${
            colorMode == "light"
              ? styles.InstLedTrainBtnLight
              : styles.InstLedTrainBtnDark
          } ${
            activePage === ActivePage.SelfPacedTraning
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
          className={`${
            colorMode == "light"
              ? styles.InstLedTrainBtnLight
              : styles.InstLedTrainBtnDark
          } ${
            activePage === ActivePage.InstructorLedTraining
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
          className={`${
            colorMode == "light" ? styles.certBtnLight : styles.certBtnDark
          } ${
            activePage === ActivePage.Certifications
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
      {/* Tab Content */}
      {activePage === ActivePage.Certifications && (
        <div className={styles.tabs}>
          <h2>Certifications</h2>
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
            {/* Developer Study Guide */}
            <div className={styles.studyGuide}>
              <h2 id="prepare">Prepare for the Exam</h2>
              <div
                className={clsx(
                  styles.studyGuideCard,
                  styles[certType.developer]
                )}
              >
                <div className={styles.info}>
                  <i className="fa-solid fa-circle-info"></i>
                  <strong>Get Certified</strong> | Harness Expert
                </div>
                <div className={styles.innerCard}>
                  <div className={styles.left}>
                    <h2>Continuous Integration - Developer</h2>
                    <img
                      src={`${baseUrl}img/cert_dev_cI_badge.svg`}
                      alt="Harness Certified Expert - CI Developer"
                      className={styles.badge}
                    />
                    <span className={styles.productVersion}>
                      <strong>Product version: </strong> Harness CI Free/Team
                      Plans
                    </span>
                  </div>
                  <div className={styles.right}>
                    <h3>Review Study Guide</h3>
                    <div className={styles.desc}>
                      Assesses the fundamental skills to deploy CI projects.
                    </div>
                    {/* Developer Study Guide */}

                    <DeveloperCertificationReviewGuide />
                    <div className={styles.btnContainer}>
                      <Link href="https://university-registration.harness.io/certified-continuous-integration-developer">
                        <button className={styles.moreDetails}>
                          Register for Exam
                        </button>
                      </Link>
                      {/*<Link href="/docs/continuous-integration">
                      <button className={styles.startLearning}>
                        <span>Start learning</span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </Link>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer Exam Details */}

            <div className={styles.examDetails}>
              <h2 id="exam-details">Exam Details</h2>
              <div className={styles.examDetailsCard}>
                <DeveloperCertificationExamDetails />
                <div className={styles.btnContainer}>
                  <Link href="https://university-registration.harness.io/certified-continuous-integration-developer">
                    <button className={styles.moreDetails}>
                      Register for Exam
                    </button>
                  </Link>
                  {/*<Link href="/docs/continuous-integration">
                      <button className={styles.startLearning}>
                        <span>Start learning</span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </Link>*/}
                </div>
              </div>
            </div>
          </div>

          {/* Administrator Tab Content */}
          <div
            className={clsx(
              styles.tabContent,
              certType[tab] === certType.administrator && styles.active
            )}
          >
            <div className={styles.studyGuide}>
              <h2 id="prepare">Prepare for the Exam</h2>
              <div
                className={clsx(
                  styles.studyGuideCard,
                  styles[certType.administrator]
                )}
              >
                <div className={styles.info}>
                  <i className="fa-solid fa-circle-info"></i>
                  <strong>Get Certified</strong> | Harness Expert
                </div>
                <div className={styles.innerCard}>
                  <div className={styles.left}>
                    <h2>Continuous Integration - Administrator</h2>
                    <img
                      src={`${baseUrl}img/cert_adm_ci_badge.svg`}
                      alt="Harness Certified Expert - CIs Administrator"
                      className={styles.badge}
                    />
                    <span className={styles.productVersion}>
                      <strong>Product version: </strong> Harness CI Enterprise
                      Plan
                    </span>
                  </div>
                  <div className={styles.right}>
                    <h3>Review Study Guide</h3>
                    <div className={styles.desc}>
                      Assesses the fundamental skills to deploy and maintain CI
                      projects and the overall Harness Platform. This exam
                      builds upon the{" "}
                      <a href="/university/continuous-integration?lvl=developer">
                        CI Developer Certification
                      </a>
                      .
                    </div>
                    <AdminCertificationReviewGuide />
                    <div className={styles.btnContainer}>
                      <Link href="https://university-registration.harness.io/continuous-integration-administrator">
                        <button className={styles.moreDetails}>
                          Register for Exam
                        </button>
                      </Link>
                      {/*<Link href="/docs/continuous-integration">
                      <button className={styles.startLearning}>
                        <span>Start learning</span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </Link>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Admin Exam Details */}

            <div className={styles.examDetails}>
              <h2 id="exam-details">Exam Details</h2>
              <div className={styles.examDetailsCard}>
                <AdminCertificationExamDetails />
                <div className={styles.btnContainer}>
                  <Link href="https://university-registration.harness.io/continuous-integration-administrator">
                    <button className={styles.moreDetails}>
                      Register for Exam
                    </button>
                  </Link>
                  {/*<Link href="/docs/continuous-integration">
                      <button className={styles.startLearning}>
                        <span>Start learning</span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </Link>*/}
                </div>
              </div>
            </div>
          </div>

          {/* Architect Tab Content */}
          <div
            className={clsx(
              styles.tabContent,
              certType[tab] === certType.architect && styles.active
            )}
          >
            <div className={styles.studyGuide}>
              <h2 id="prepare">Prepare for the Exam</h2>
              <div
                className={clsx(
                  styles.studyGuideCard,
                  styles[certType.architect]
                )}
              >
                <div className={styles.info}>
                  <i className="fa-solid fa-circle-info"></i>
                  <strong>Get Certified</strong> | Harness Expert
                </div>
                <div className={styles.innerCard}>
                  <div className={styles.left}>
                    <h2>Continuous Integration - Architect</h2>
                    <img
                      src={`${baseUrl}img/cert_arc_ci_badge.svg`}
                      alt="Harness Certified Expert - CI Architect"
                      className={styles.badge}
                    />
                    <span className={styles.productVersion}>
                      <strong>Product version: </strong> Harness CI Enterprise
                      Plan
                    </span>
                  </div>
                  <div className={styles.right}>
                    <h3>Review Study Guide</h3>
                    <div className={styles.desc}>
                      Assess key technical job functions and advanced skills in
                      design, implementation and management of CI. This exam
                      builds upon the{" "}
                      <a href="/university/continuous-integration?lvl=administrator">
                        CI Admin Certification
                      </a>
                    </div>
                    <ArchitectCertificationReviewGuide />
                    <div className={styles.btnContainer}>
                      <Link href="https://university-registration.harness.io/continuous-integration-architect">
                        <button className={styles.moreDetails}>
                          Register for Exam
                        </button>
                      </Link>
                      {/*<Link href="/docs/continuous-integration">
                      <button className={styles.startLearning}>
                        <span>Start learning</span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </Link>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arch Exam Details  */}

            <div className={styles.examDetails}>
              <h2 id="exam-details">Exam Details</h2>
              <div className={styles.examDetailsCard}>
                <ArchitectCertificationExamDetails />
                <div className={styles.btnContainer}>
                  <Link href="https://university-registration.harness.io/continuous-integration-architect">
                    <button className={styles.moreDetails}>
                      Register for Exam
                    </button>
                  </Link>
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
                  return (
                    ilt.module === MODULES.ci ||
                    (ilt.module === MODULES.ci &&
                      ilt.tileType === "comming soon")
                  );
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
                  return (
                    (spt.module === "ci" && spt.cardType === "FREE") ||
                    (spt.module === "ci" && spt.tileType === "comming soon")
                  );
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
