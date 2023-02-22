import React, { useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";

/*
enum TabValues {
  Developer = "Developer",
  Administrator = "Administrator",
  Architect = "Architect",
}*/

export default function CertificationsCD() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  /*
  const [tab, setTab] = useState(TabValues.Developer);
  const handleSwitchTab = (tabVal) => {
    setTab(tabVal);
  };*/
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
          <h1>Continuous Delivery & GitOps Certifications</h1>
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
        <h2>Which CD & GitOps Certification is right for you?</h2>
        <div className={clsx(styles.certCard)}>
          <div className={styles.certCardContainer}>
            <h3>Developer</h3>
            <div className={styles.descContainer}>
              Validate your broad knowledge of cloud concepts and the products,
              services, tools, features, benefits, and use cases of CD.
              <ul className={styles.courseList}>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Kubernetes Deployments
                </li>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Policy as Code
                </li>
              </ul>
            </div>
            <div className={styles.btnContainer}>
              <Link href="/certifications/continuous-delivery/cd-developer-cert#prepare">
                <button className={styles.moreDetails}>
                  Study Guide
                </button>
              </Link>
              <Link href="/certifications/continuous-delivery/cd-developer-cert#exam-details">
                <button className={styles.startLearning}>
                  <span>Exam Details</span>
                  <i className="fa-regular fa-arrow-right"></i>
                </button>
              </Link>
            </div>
          </div>

          <div className={styles.certCardContainer}>
            <h3>Administrator</h3>
            <div className={styles.descContainer}>
              Assesses the fundamental skills to deploy and maintain CD
              projects and the overall Harness Platform. 
              <ul className={styles.courseList}>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Coming Soon
                </li>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  Administer at Scale
                </li>
              </ul>
            </div>
            <div className={styles.btnContainer}>
              <Link href="#">
                <button className={styles.moreDetails}>
                  Study Guide
                </button>
              </Link>
              <Link href="/tutorials/deploy-services">
                <button className={styles.startLearning}>
                  <span>Exam Details</span>
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
                  Coming Soon
                </li>
                <li className={styles.courseItem}>
                  <i className="fa-solid fa-circle-check"></i>
                  CD Architecture
                </li>
              </ul>
            </div>
            <div className={styles.btnContainer}>
              <Link href="#">
                <button className={styles.moreDetails}>
                  Study Guide
                </button>
              </Link>
              <Link href="/tutorials/deploy-services">
                <button className={styles.startLearning}>
                  <span>Exam Details</span>
                  <i className="fa-regular fa-arrow-right"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
