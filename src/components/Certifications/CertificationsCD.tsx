import React, { useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CertificationReviewGuide from "./cd-certification-review-guide.md";
import CertificationExamDetails from "./cd-certification-developer-exam-details.md";
import styles from "./styles.module.scss";

enum TabValues {
  Developer = "Developer",
  Administrator = "Administrator",
  Architect = "Architect",
}

export default function CertificationsCD() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const [tab, setTab] = useState(TabValues.Developer);
  const handleSwitchTab = (tabVal) => {
    setTab(tabVal);
  };
  return (
    <div className={styles.certificationsCD}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <div className={styles.linkBack}>
            <Link to={`${baseUrl}certifications`}>
              <i className="fa-regular fa-arrow-left"></i> Back to all
              certifications
            </Link>
          </div>
          <h1>Continuous Delivery Certification</h1>
          <div>
              Eliminate scripting and manual deployments with Argo CD-as-a-Service and powerful, easy-to-use pipelines. 
              Empower your teams to deliver new features, faster – with AI/ML for automated canary and blue/green deployments, 
              advanced verification, and intelligent rollback
          </div>
        </div>
        <div className={styles.right}>
          <img
            src={`${baseUrl}img/cert_dev_cd_badge.svg`}
            alt="Harness Certified Expert - Developer"
          />
        </div>
      </div>

      {/* Cert Content */}
      <div className={styles.certDesc}>
        <h2>Which Continuous Delivery Certification is right for you?</h2>
        <div className={clsx(styles.certCard)}>
          <div className={styles.certCardContainer}>
            <h3>Developer</h3>
            <div className={styles.descContainer}>
              Validate your broad knowledge of cloud concepts and the products,
              services, tools, features, benefits, and use cases of CD.
              <ul className={styles.courseList}>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Deploy and implement
                </li>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Deploy and implement
                </li>
              </ul>
            </div>
            <div className={styles.btnContainer}>
              <Link href="#">
                <button className={styles.moreDetails}>
                  Go to Study Guide
                </button>
              </Link>
              <Link href="#">
                <button className={styles.startLearning}>
                  <span>Start learning</span>
                  <i className="fa-regular fa-arrow-right"></i>
                </button>
              </Link>
            </div>
          </div>

          <div className={styles.certCardContainer}>
            <h3>Administrator</h3>
            <div className={styles.descContainer}>
              Assesses the fundamental skills to deploy and maintain CD
              projects.
              <ul className={styles.courseList}>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Deploy and implement
                </li>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Deploy and implement
                </li>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Deploy and implement
                </li>
              </ul>
            </div>
            <div className={styles.btnContainer}>
              <Link href="#">
                <button className={styles.moreDetails}>
                  Go to Study Guide
                </button>
              </Link>
              <Link href="#">
                <button className={styles.startLearning}>
                  <span>Start learning</span>
                  <i className="fa-regular fa-arrow-right"></i>
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.certCardContainer}>
            <h3>Architect</h3>
            <div className={styles.descContainer}>
              Assess key technical job functions and advanced skills in design,
              implementation and management of CD.
              <ul className={styles.courseList}>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Deploy and implement
                </li>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Deploy and implement
                </li>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Deploy and implement
                </li>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Deploy and implement
                </li>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Deploy and implement
                </li>
              </ul>
            </div>
            <div className={styles.btnContainer}>
              <Link href="#">
                <button className={styles.moreDetails}>
                  Go to Study Guide
                </button>
              </Link>
              <Link href="#">
                <button className={styles.startLearning}>
                  <span>Start learning</span>
                  <i className="fa-regular fa-arrow-right"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Study Guide */}
      <div className={styles.studyGuide}>
        <h2 id="cd-developer-study-guide">Developer Study Guide</h2>
        <div className={styles.studyGuideCard}>
          <div className={styles.info}>
            <i className="fa-solid fa-circle-info"></i>
            <strong>Get Certified</strong> | Harness Expert
          </div>
          <div className={styles.innerCard}>
            <div className={styles.left}>
              <h2>Continuous Delivery & GitOps Certifications</h2>
              <img
                src={`${baseUrl}img/cert_dev_cd_badge_s.svg`}
                alt="Harness Certified Expert - Developer - CD"
                className={styles.badge}
              />
              <span className={styles.productVersion}>
                <strong>Product version: </strong> CI Drone 1.0
              </span>
            </div>
            <div className={styles.right}>
              <h3>Review Study Guide</h3>
              <div className={styles.desc}>
                Eliminate scripting and manual deployments with Argo CD-as-a-Service and powerful, easy-to-use pipelines. 
                Empower your teams to deliver new features, faster – with AI/ML for automated canary and blue/green deployments, 
                advanced verification, and intelligent rollback
              </div>
              <CertificationReviewGuide />
              <div className={styles.btnContainer}>
                <Link href="#">
                  <button className={styles.startLearning}>
                    <span>Start learning</span>
                    <i className="fa-regular fa-arrow-right"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Exam Details */}
      <div className={styles.examDetails}>
        <h2>Developer Exam Details</h2>
        <div className={styles.examDetailsCard}>
          <CertificationExamDetails />

          <div className={styles.btnContainer}>
            <Link href="#">
              <button className={styles.moreDetails}>Register for Exam</button>
            </Link>
            <Link href="#">
              <button className={styles.startLearning}>
                <span>Start learning</span>
                <i className="fa-regular fa-arrow-right"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
