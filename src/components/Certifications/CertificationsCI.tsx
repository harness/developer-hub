import React, { useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { certType } from "./CertCard";
import DeveloperCertificationReviewGuide from "./data/ci-certification-developer-review-guide.md";
import DeveloperCertificationExamDetails from "./data/ci-certification-developer-exam-details.md";
import styles from "./styles.module.scss";

const getCertBadges = (url: string) => [
  {
    img: `${url}img/cert_dev_ci_badge.svg`,
    alt: "Harness Certified Expert - Developer",
    type: certType.Developer,
  },
  {
    img: `${url}img/cert_adm_ci_badge.svg`,
    alt: "Harness Certified Expert - Administrator",
    type: certType.Administrator,
  },
  {
    img: `${url}img/cert_arc_ci_badge.svg`,
    alt: "Harness Certified Expert - Architect",
    type: certType.Architect,
  },
];

export default function CertificationsCI() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const [tab, setTab] = useState(certType.Developer);
  const handleSwitchTab = (tabVal) => {
    setTab(tabVal);
  };

  const certBadges = getCertBadges(baseUrl);

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
          Optimizing performance through hosted builds, caching, and proprietary Test Intelligence™. 
          Designed to be blazing fast, simple, and open to help make developers' lives easier. Plus, 
          all the scalable features needed to meet enterprise demands – with developer autonomy alongside software efficiency
          , reliability, and security.
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

      {/* Tab Content */}
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
          {/* Developer Study Guide */}
          <div className={styles.studyGuide}>
            <h2 id="prepare">Prepare for the Exam</h2>
            <div className={styles.studyGuideCard}>
              <div className={styles.info}>
                <i className="fa-solid fa-circle-info"></i>
                <strong>Get Certified</strong> | Harness Expert
              </div>
              <div className={styles.innerCard}>
                <div className={styles.left}>
                  <h2>Continuous Integration - Developer (BETA COMING SOON)</h2>
                  <img
                    src={`${baseUrl}img/cert_dev_cI_badge.svg`}
                    alt="Harness Certified Expert - CI Developer"
                    className={styles.badge}
                  />
                  <span className={styles.productVersion}>
                    <strong>Product version: </strong> Harness CI
                    Free/Team Plans
                  </span>
                </div>
                <div className={styles.right}>
                  <h3>Review Study Guide</h3>
                  <div className={styles.desc}>
                  Assesses the fundamental skills to deploy CI projects.
                  </div>
                   {/* Developer Study Guide */}
                  {/*
                  <DeveloperCertificationReviewGuide />
                  <div className={styles.btnContainer}>
                    <Link href="https://university.harness.io/page/continuous-integration-developer">
                      <button className={styles.moreDetails}>
                        Register for Exam
                      </button>
                    </Link>
                    <Link href="/tutorials/deploy-services">
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

          {/* Developer Exam Details */}
          {/*
          <div className={styles.examDetails}>
            <h2 id="exam-details">Exam Details</h2>
            <div className={styles.examDetailsCard}>
              <DeveloperCertificationExamDetails />
              <div className={styles.btnContainer}>
                <Link href="https://university.harness.io/page/continuous-integration-developer">
                  <button className={styles.moreDetails}>
                    Register for Exam
                  </button>
                </Link>
                <Link href="/tutorials/deploy-services">
                  <button className={styles.startLearning}>
                    <span>Start Learning</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          */}
        </div>

        {/* Administrator Tab Content */}
        <div
          className={clsx(
            styles.tabContent,
            tab === certType.Administrator && styles.active
          )}
        >
          <div className={styles.studyGuide}>
            <h2 id="prepare">Prepare for the Exam</h2>
            <div className={styles.studyGuideCard}>
              <div className={styles.info}>
                <i className="fa-solid fa-circle-info"></i>
                <strong>Get Certified</strong> | Harness Expert
              </div>
              <div className={styles.innerCard}>
                <div className={styles.left}>
                  <h2>
                    Continuous Integration - Administrator (BETA COMING
                    SOON)
                  </h2>
                  <img
                    src={`${baseUrl}img/cert_adm_ci_badge.svg`}
                    alt="Harness Certified Expert - CIs Administrator"
                    className={styles.badge}
                  />
                  <span className={styles.productVersion}>
                    <strong>Product version: </strong> Harness CI
                    Enterprise Plan
                  </span>
                </div>
                <div className={styles.right}>
                  <h3>Coming Soon...</h3>
                  <div className={styles.desc}>
                    Assesses the fundamental skills to deploy and maintain CI
                    projects and the overall Harness Platform.
                  </div>
                  {/*
                  <AdministratorCertificationReviewGuide />
                  <div className={styles.btnContainer}>
                    <Link href="/tutorials/deploy-services">
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

        {/* Architect Tab Content */}
        <div
          className={clsx(
            styles.tabContent,
            tab === certType.Architect && styles.active
          )}
        >
          <div className={styles.studyGuide}>
            <h2 id="prepare">Prepare for the Exam</h2>
            <div className={styles.studyGuideCard}>
              <div className={styles.info}>
                <i className="fa-solid fa-circle-info"></i>
                <strong>Get Certified</strong> | Harness Expert
              </div>
              <div className={styles.innerCard}>
                <div className={styles.left}>
                  <h2>
                    Continuous Integration - Architect (BETA COMING SOON)
                  </h2>
                  <img
                    src={`${baseUrl}img/cert_arc_ci_badge.svg`}
                    alt="Harness Certified Expert - CI Architect"
                    className={styles.badge}
                  />
                  <span className={styles.productVersion}>
                    <strong>Product version: </strong> Harness CI
                    Enterprise Plan
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
                    <Link href="/tutorials/deploy-services">
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
