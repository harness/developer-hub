import React, { useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { certType } from "./CertCard";
import DeveloperCertificationReviewGuide from "./data/cd-certification-developer-review-guide.md";
import DeveloperCertificationExamDetails from "./data/cd-certification-developer-exam-details.md";
import styles from "./styles.module.scss";

export default function CertificationsCD() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const [tab, setTab] = useState(certType.Developer);
  const handleSwitchTab = (tabVal) => {
    setTab(tabVal);
  };
  return (
    <div className={styles.certificationsCD}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <div className={styles.linkBack}>
            <Link to={`${baseUrl}certifications`}>
              <i className="fa-solid fa-arrow-left"></i> Back to all
              certifications
            </Link>
          </div>
          <h1>Continuous Delivery & GitOps Certifications</h1>
          <div>
            Eliminate scripting and manual deployments with Argo CD-as-a-Service
            and powerful, easy-to-use pipelines. Empower your teams to deliver
            new features, faster – with AI/ML for automated canary and
            blue/green deployments, advanced verification, and intelligent
            rollback
          </div>
        </div>
        <div className={styles.right}>
          <img
            src={`${baseUrl}img/cert_dev_cd_badge.svg`}
            alt="Harness Certified Expert - CD & GitOps Developer"
          />
          <img
            src={`${baseUrl}img/cert_adm_cd_badge.svg`}
            alt="Harness Certified Expert - CD & GitOps Administrator"
          />
          <img
            src={`${baseUrl}img/cert_arc_cd_badge.svg`}
            alt="Harness Certified Expert - CD & GitOps Architect"
          />
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
                  <h2>
                    Continuous Delivery & GitOps - Developer (BETA COMING SOON)
                  </h2>
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
                    Eliminate scripting and manual deployments with Argo
                    CD-as-a-Service and powerful, easy-to-use pipelines. Empower
                    your teams to deliver new features, faster – with AI/ML for
                    automated canary and blue/green deployments, advanced
                    verification, and intelligent rollback
                  </div>
                  <DeveloperCertificationReviewGuide />
                  <div className={styles.btnContainer}>
                    <Link href="/tutorials/deploy-services">
                      <button className={styles.startLearning}>
                        <span>Start learning</span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </Link>
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
                <Link href="https://university.harness.io/page/continuous-delivery-developer">
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
                    Continuous Delivery & GitOps - Administrator (BETA COMING
                    SOON)
                  </h2>
                  <img
                    src={`${baseUrl}img/cert_adm_cd_badge.svg`}
                    alt="Harness Certified Expert - CD & GitOps Administrator"
                    className={styles.badge}
                  />
                  <span className={styles.productVersion}>
                    <strong>Product version: </strong> Harness CD & GitOps
                    Free/Team Plans
                  </span>
                </div>
                <div className={styles.right}>
                  <h3>Review Study Guide (Coming soon...)</h3>
                  <div className={styles.desc}>
                    Eliminate scripting and manual deployments with Argo
                    CD-as-a-Service and powerful, easy-to-use pipelines. Empower
                    your teams to deliver new features, faster – with AI/ML for
                    automated canary and blue/green deployments, advanced
                    verification, and intelligent rollback
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
                    Continuous Delivery & GitOps - Architect (BETA COMING SOON)
                  </h2>
                  <img
                    src={`${baseUrl}img/cert_arc_cd_badge.svg`}
                    alt="Harness Certified Expert - CD & GitOps Architect"
                    className={styles.badge}
                  />
                  <span className={styles.productVersion}>
                    <strong>Product version: </strong> Harness CD & GitOps
                    Free/Team Plans
                  </span>
                </div>
                <div className={styles.right}>
                  <h3>Review Study Guide (Coming soon...)</h3>
                  <div className={styles.desc}>
                    Eliminate scripting and manual deployments with Argo
                    CD-as-a-Service and powerful, easy-to-use pipelines. Empower
                    your teams to deliver new features, faster – with AI/ML for
                    automated canary and blue/green deployments, advanced
                    verification, and intelligent rollback
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
