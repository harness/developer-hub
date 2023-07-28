import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useHistory, useLocation } from "@docusaurus/router";
import { certType } from "./CertCard";
import { getCertLevel } from "./LandingPage";
import DeveloperCertificationReviewGuide from "./data/ci-certification-developer-review-guide.md";
import DeveloperCertificationExamDetails from "./data/ci-certification-developer-exam-details.md";
import AdminCertificationReviewGuide from "./data/ci-certification-admin-review-guide.md";
import AdminCertificationExamDetails from "./data/ci-certification-admin-exam-details.md";
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

export default function CertificationsCI() {
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
    <div className={styles.certificationsCI}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <div className={styles.linkBack}>
            <Link to={`${baseUrl}certifications`}>
              <i className="fa-solid fa-arrow-left"></i> Back to all
              certifications
            </Link>
          </div>
          <h1>Continuous Integration Certifications</h1>
          <div>
            Optimizing performance through hosted builds, caching, and
            proprietary Test Intelligence™. Designed to be blazing fast, simple,
            and open to help make developers' lives easier. Plus, all the
            scalable features needed to meet enterprise demands – with developer
            autonomy alongside software efficiency , reliability, and security.
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

      {/* Tab Content */}
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
                    <Link href="https://university.harness.io/certified-continuous-integration-developer">
                      <button className={styles.moreDetails}>
                        Register for Exam
                      </button>
                    </Link>
                    {/*<Link href="/tutorials/ci-pipelines">
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
                <Link href="https://university.harness.io/certified-continuous-integration-developer">
                  <button className={styles.moreDetails}>
                    Register for Exam
                  </button>
                </Link>
                   {/*<Link href="/tutorials/ci-pipelines">
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
                  <h2>
                    Continuous Integration - Administrator
                  </h2>
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
                    projects and the overall Harness Platform. This exam builds
                    upon the{" "}
                    <a href="/certifications/continuous-integration?lvl=developer">
                      CI Developer Certification
                    </a>
                    .
                  </div>
                  <AdminCertificationReviewGuide />
                  <div className={styles.btnContainer}>
                    <Link href="https://university.harness.io/continuous-integration-administrator">
                      <button className={styles.moreDetails}>
                        Register for Exam
                      </button>
                    </Link>
                       {/*<Link href="/tutorials/ci-pipelines">
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
                <Link href="https://university.harness.io/continuous-integration-administrator">
                  <button className={styles.moreDetails}>
                    Register for Exam
                  </button>
                </Link>
                   {/*<Link href="/tutorials/ci-pipelines">
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
                  <h2>Continuous Integration - Architect (BETA COMING SOON)</h2>
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
                  <h3>Coming Soon...</h3>
                  <div className={styles.desc}>
                    Assess key technical job functions and advanced skills in
                    design, implementation and management of CI.
                  </div>
                  {/*
                  <ArchitectCertificationReviewGuide />
                  <div className={styles.btnContainer}>
                    <Link href="/tutorials/cd-pipelines">
                      <button className={styles.startLearning}>
                        <span>Start learning</span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </Link>
                  </div>
                  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
