import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useHistory, useLocation } from "@docusaurus/router";
import { certType } from "./CertCard";
import { ActivePage, getCertLevel } from "./LandingPage";
import DeveloperCertificationReviewGuide from "./data/cd-certification-developer-review-guide.md";
import DeveloperCertificationExamDetails from "./data/cd-certification-developer-exam-details.md";
import AdminCertificationReviewDetails from "./data/cd-certification-admin-review-guide.md";
import AdminCertificationExamDetails from "./data/cd-certification-admin-exam-details.md";
import ArchitectCertificationReviewDetails from "./data/cd-certification-architect-review-guide.md";
import ArchitectCertificationExamDetails from "./data/cd-certification-architect-exam-details.md";
import IltCard from "./Card";
import { ilt } from "./data/iltData";
import { spt } from "./data/sptData";
import styles from "./styles.module.scss";

const getCertBadges = (url: string) => [
  {
    img: `${url}img/cert_dev_cd_badge.svg`,
    alt: "Harness Certified Expert - Developer",
    type: certType.developer,
  },
  {
    img: `${url}img/cert_adm_cd_badge.svg`,
    alt: "Harness Certified Expert - Administrator",
    type: certType.administrator,
  },
  {
    img: `${url}img/cert_arc_cd_badge.svg`,
    alt: "Harness Certified Expert - Architect",
    type: certType.architect,
  },
];

export default function CertificationsCD() {
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
  useEffect(() => {
    if (location.search === "?ilt") {
      setActivePage(ActivePage.InstructorLedTraining);
    }
    if (location.search === "?spt") {
      setActivePage(ActivePage.SelfPacedTraning);
    }
  }, []);

  const [activePage, setActivePage] = useState<string>(
    ActivePage.Certifications
  );
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
    <div className={styles.certificationsCD}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <div className={styles.linkBack}>
            <Link to={`${baseUrl}university`}>
              <i className="fa-solid fa-arrow-left"></i> Back to University Home
            </Link>
          </div>
          <h1>Continuous Delivery & GitOps</h1>
          <div>
            Eliminate scripting and manual deployments with Argo CD-as-a-Service
            and powerful, easy-to-use pipelines. Empower your teams to deliver
            new features, faster – with AI/ML for automated canary and
            blue/green deployments, advanced verification, and intelligent
            rollback.
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

      <div className={styles.btns}>
        <button
          className={`${styles.certBtn} ${activePage === ActivePage.Certifications ? styles.active : ""
            }`}
          onClick={handleCertficationClick}
        >
          {activePage !== ActivePage.Certifications ? (
            <img src="/img/certification_icon_unactive.svg" />
          ) : (
            <img src="/img/certification_icon.svg" />
          )}
          Certifications
        </button>

        <button
          onClick={handleInstLedTrainClick}
          className={`${styles.InstLedTrainBtn} ${activePage === ActivePage.InstructorLedTraining ? styles.active : ""
            }`}
        >
          {activePage === ActivePage.InstructorLedTraining ? (
            <img src="/img/Instructor_led_trainin_logo_unactive.svg" />
          ) : (
            <img src="/img/Instructor_led_trainin_logo.svg" />
          )}
          Instructor-Led Training
        </button>
        <button
          onClick={handleSelfPacedTrainingClick}
          className={`${styles.InstLedTrainBtn} ${activePage === ActivePage.SelfPacedTraning ? styles.active : ""
            }`}
        >
          {activePage === ActivePage.SelfPacedTraning ? (
            <img src="/img/Instructor_led_trainin_logo_unactive.svg" />
          ) : (
            <img src="/img/Instructor_led_trainin_logo.svg" />
          )}
          Self-Paced Training
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
                    <h2>Continuous Delivery & GitOps - Developer </h2>
                    <img
                      src={`${baseUrl}img/cert_dev_cd_badge.svg`}
                      alt="Harness Certified Expert - CD & GitOps Developer"
                      className={styles.badge}
                    />
                    <span className={styles.productVersion}>
                      <strong>Product version: </strong> Harness CD & GitOps
                      Free/Team Plans
                    </span>
                  </div>
                  <div className={styles.right}>
                    <h3>Review Study Guide</h3>
                    <div className={styles.desc}>
                      Assesses the fundamental skills to deploy your
                      applications with CD & GitOps projects.
                    </div>
                    <DeveloperCertificationReviewGuide />
                    <div className={styles.btnContainer}>
                      <Link href="https://university-registration.harness.io/certified-continuous-delivery-developer">
                        <button className={styles.moreDetails}>
                          Register for Exam
                        </button>
                      </Link>
                      {/* <Link href="/docs/continuous-delivery">
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
                  <Link href="https://university-registration.harness.io/certified-continuous-delivery-developer">
                    <button className={styles.moreDetails}>
                      Register for Exam
                    </button>
                  </Link>
                  {/* <Link href="/docs/continuous-delivery">
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
                    <h2>Continuous Delivery & GitOps - Administrator</h2>
                    <img
                      src={`${baseUrl}img/cert_adm_cd_badge.svg`}
                      alt="Harness Certified Expert - CD & GitOps Administrator"
                      className={styles.badge}
                    />
                    <span className={styles.productVersion}>
                      <strong>Product version: </strong> Harness CD & GitOps
                      Enterprise Plan
                    </span>
                  </div>
                  <div className={styles.right}>
                    <h3>Review Study Guide</h3>
                    <div className={styles.desc}>
                      Assesses the fundamental skills to deploy and maintain CD
                      & GitOps projects and the overall Harness Platform. This
                      exam builds upon the{" "}
                      <a href="/university/continuous-delivery?lvl=developer">
                        Continuous Delivery & GitOps Developer Certification
                      </a>
                      .
                    </div>
                    <AdminCertificationReviewDetails />
                    <div className={styles.btnContainer}>
                      <Link href="https://university-registration.harness.io/continuous-delivery-gitops-administrator">
                        <button className={styles.moreDetails}>
                          Register for Exam
                        </button>
                      </Link>
                      {/* <Link href="/docs/continuous-delivery">
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
                  <Link href="https://university-registration.harness.io/continuous-delivery-gitops-administrator">
                    <button className={styles.moreDetails}>
                      Register for Exam
                    </button>
                  </Link>
                  {/* <Link href="/docs/continuous-delivery">
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
                    <h2>Continuous Delivery & GitOps - Architect</h2>
                    <img
                      src={`${baseUrl}img/cert_arc_cd_badge.svg`}
                      alt="Harness Certified Expert - CD & GitOps Architect"
                      className={styles.badge}
                    />
                    <span className={styles.productVersion}>
                      <strong>Product version: </strong> Harness CD & GitOps
                      Enterprise Plan
                    </span>
                  </div>
                  <div className={styles.right}>
                    <h3>Review Study Guide</h3>
                    <div className={styles.desc}>
                      Assess key technical job functions and advanced skills in
                      design, implementation and management of CD & GitOps. This
                      exam builds upon the{" "}
                      <a href="/university/continuous-delivery?lvl=administrator">
                        Continuous Delivery & GitOps Administrator Certification
                      </a>
                      .
                    </div>
                    <ArchitectCertificationReviewDetails />
                    <div className={styles.btnContainer}>
                      <Link href="https://university-registration.harness.io/continuous-delivery-gitops-architect">
                        <button className={styles.moreDetails}>
                          Register for Exam
                        </button>
                      </Link>
                      {/* <Link href="/docs/continuous-delivery">
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

            {/* Arch Exam Details */}
            <div className={styles.examDetails}>
              <h2 id="exam-details">Exam Details</h2>
              <div className={styles.examDetailsCard}>
                <ArchitectCertificationExamDetails />
                <div className={styles.btnContainer}>
                  <Link href="https://university-registration.harness.io/continuous-delivery-gitops-architect">
                    <button className={styles.moreDetails}>
                      Register for Exam
                    </button>
                  </Link>
                  {/* <Link href="/docs/continuous-delivery">
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
      )}
      {activePage === ActivePage.InstructorLedTraining && (
        <div className={styles.tabs}>
          <h2>Instructor-Led Training</h2>
          <p>
            Intensive two-day course is designed for engineers looking to deepen
            their understanding and expertise.
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
                    ilt.module === "cd" ||
                    (ilt.module === "cd" && ilt.tileType === "comming soon")
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
          <p>
            Self-paced courses that you can consume on your own time in a webinar style.
          </p>
          <div className={clsx(styles.tabContent, styles.active)}>
            <div className={styles.cardContainer}>
              {spt
                .filter((spt) => {
                  return spt.tileType === "pre requisite";
                })
                .map((spt) => (
                  <IltCard {...spt} />
                ))}
              {ilt
                .filter((spt) => {
                  return (
                    spt.module === "cd" && spt.cardType === "SPT" ||
                    (spt.module === "cd" && spt.tileType === "comming soon")
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
