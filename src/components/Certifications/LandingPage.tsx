import React, { useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";

enum TabValues {
  Developer = "For Developers",
  Administrator = "For Administrators",
  Architect = "For Architects",
}

export default function Certifications() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const [tab, setTab] = useState(TabValues.Developer);
  const handleSwitchTab = (tabVal) => {
    setTab(tabVal);
  };
  return (
    <div className={styles.certifications}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <h1>Harness Certifications</h1>
          <div>
            Test and validate your knowledge of modern software delivery by becoming a Harness Certified Expert.
          </div>
        </div>
        <div className={styles.right}>
          <img
            src={`${baseUrl}img/cert_dev_cd_badge.svg`}
            alt="Harness Certified Expert - Developer"
          />
          <img
            src={`${baseUrl}img/cert_adm_badge.svg`}
            alt="Harness Certified Expert - Administrator"
          />
          <img
            src={`${baseUrl}img/cert_arc_badge.svg`}
            alt="Harness Certified Expert - Architect"
          />
        </div>
      </div>

      <div className={styles.tabs}>
        <ul className={styles.tabItems}>
          {Object.values(TabValues).map((tabVal) => (
            <li
              key={tabVal}
              className={tab === tabVal ? styles.active : ""}
              onClick={() => handleSwitchTab(tabVal)}
            >
              {tabVal}
            </li>
          ))}
        </ul>

        {/* Developer Tab Content */}
        <div
          className={clsx(
            styles.tabContent,
            tab === TabValues.Developer && styles.active
          )}
        >
          {/* CD */}
          <div className={clsx(styles.certCard, styles.moduleCD)}>
            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <h2>Continuous Delivery & GitOps - Developer (BETA COMING SOON)</h2>
                <img
                  src={`${baseUrl}img/cert_dev_cd_badge_s.svg`}
                  alt="Harness Certified Expert - CD & GitOps Developer"
                  className={styles.badge}
                />
              </div>
              <div className={styles.right}>
                Continuous Delivery & GitOps focuses on delivery and deployment
                of application and infrastructure changes in a safe and
                sustainable way. Your Continuous Delivery pipeline should
                automate all of the steps necessary to get your changes into
                production.
                <ul className={styles.courseList}>
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    Application Deployments
                  </li>
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    Visibility
                  </li>
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    Continuous Delivery
                  </li>
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    Continuous Verification
                  </li>
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    GitOps
                  </li>
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    Security
                  </li>
                </ul>
                <Link href="/certifications/continuous-delivery/cd-developer-cert#prepare">
                  <div className={styles.certCardBtn}>
                    <span>Prepare for the Exam</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
                <Link href="/certifications/continuous-delivery/cd-developer-cert#exam-details">
                  <div className={styles.certCardBtn}>
                    <span>Review Exam Details</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </div>
            </div>

            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <span className={styles.productVersion}>
                  <strong>Product version:&nbsp;</strong> Harness CD & GitOps Free/Team Plans
                </span>
              </div>
              <div className={styles.right}>
                <div className={styles.btnContainer}>
                  <Link href="https://training.harness.io/page/continuous-delivery-developer">
                    <button className={styles.moreDetails}>Register for the Exam</button>
                  </Link>
                  <Link href="/certifications/continuous-delivery">
                    <button className={styles.startLearning}>
                      <span>See All CD & GitOps Certifications</span>
                      <i className="fa-regular fa-arrow-right"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>


          {/* CI 
          <div className={clsx(styles.certCard, styles.moduleCI)}>
            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <h2>Continuous Integration Certifications</h2>
                <img
                  src={`${baseUrl}img/cert_dev_ci_badge.svg`}
                  alt="Harness Certified Expert - Developer - CI"
                  className={styles.badge}
                />
              </div>
              <div className={styles.right}>
                The CI Overview provides a bird's-eye view of all your Builds —
                successful, failed, aborted, and expired — and the percentage of
                successful builds for individual codebases. You can easily see
                where your builds have failed and drill down into specific
                builds to troubleshoot and analyze the root causes.
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
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    Deploy and implement
                  </li>
                </ul>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Exam Details</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Requirements</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </div>
            </div>

            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <span className={styles.productVersion}>
                  <strong>Product version:</strong> CI Drone 1.0
                </span>
              </div>
              <div className={styles.right}>
                <div className={styles.btnContainer}>
                  <Link href="#">
                    <button className={styles.moreDetails}>More Details</button>
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

          {/* FF *
          <div className={clsx(styles.certCard, styles.moduleFF)}>
            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <h2>Feature Flags Certifications</h2>
                <img
                  src={`${baseUrl}img/cert_dev_ff_badge.svg`}
                  alt="Harness Certified Expert - Developer - FF"
                  className={styles.badge}
                />
              </div>
              <div className={styles.right}>
                Feature Flags focuses on delivery and deployment of application
                and infrastructure changes in a safe and sustainable way. Your
                Continuous Delivery pipeline should automate all of the steps
                necessary to get your changes into production.
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
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    Deploy and implement
                  </li>
                </ul>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Exam Details</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Requirements</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </div>
            </div>

            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <span className={styles.productVersion}>
                  <strong>Product version:</strong> CI Drone 1.0
                </span>
              </div>
              <div className={styles.right}>
                <div className={styles.btnContainer}>
                  <Link href="#">
                    <button className={styles.moreDetails}>More Details</button>
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

          {/* CCM 
          <div className={clsx(styles.certCard, styles.moduleCCM)}>
            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <h2>Cloud Costs Management Certifications</h2>
                <img
                  src={`${baseUrl}img/cert_dev_ccm_badge.svg`}
                  alt="Harness Certified Expert - Developer - CCM"
                  className={styles.badge}
                />
              </div>
              <div className={styles.right}>
                Cloud Costs Management focuses on delivery and deployment of
                application and infrastructure changes in a safe and sustainable
                way. Your Continuous Delivery pipeline should automate all of
                the steps necessary to get your changes into production.
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
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    Deploy and implement
                  </li>
                </ul>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Exam Details</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Requirements</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </div>
            </div>

            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <span className={styles.productVersion}>
                  <strong>Product version:</strong> CI Drone 1.0
                </span>
              </div>
              <div className={styles.right}>
                <div className={styles.btnContainer}>
                  <Link href="#">
                    <button className={styles.moreDetails}>More Details</button>
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

          {/* STO 
          <div className={clsx(styles.certCard, styles.moduleSTO)}>
            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <h2>Security Testing Orchestrations Certifications</h2>
                <img
                  src={`${baseUrl}img/cert_dev_sto_badge.svg`}
                  alt="Harness Certified Expert - Developer - STO"
                  className={styles.badge}
                />
              </div>
              <div className={styles.right}>
                Security Testing Orchestrations focuses on delivery and
                deployment of application and infrastructure changes in a safe
                and sustainable way. Your Continuous Delivery pipeline should
                automate all of the steps necessary to get your changes into
                production.
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
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    Deploy and implement
                  </li>
                </ul>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Exam Details</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Requirements</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </div>
            </div>

            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <span className={styles.productVersion}>
                  <strong>Product version:</strong> CI Drone 1.0
                </span>
              </div>
              <div className={styles.right}>
                <div className={styles.btnContainer}>
                  <Link href="#">
                    <button className={styles.moreDetails}>More Details</button>
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

          {/* STO 
          <div className={clsx(styles.certCard, styles.moduleSRM)}>
            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <h2>Service Reliability Management Certifications</h2>
                <img
                  src={`${baseUrl}img/cert_dev_sto_badge.svg`}
                  alt="Harness Certified Expert - Developer - STO"
                  className={styles.badge}
                />
              </div>
              <div className={styles.right}>
                Service Reliability Management focuses on delivery and
                deployment of application and infrastructure changes in a safe
                and sustainable way. Your Continuous Delivery pipeline should
                automate all of the steps necessary to get your changes into
                production.
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
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    Deploy and implement
                  </li>
                </ul>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Exam Details</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Requirements</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </div>
            </div>

            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <span className={styles.productVersion}>
                  <strong>Product version:</strong> CI Drone 1.0
                </span>
              </div>
              <div className={styles.right}>
                <div className={styles.btnContainer}>
                  <Link href="#">
                    <button className={styles.moreDetails}>More Details</button>
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

          {/* CE 
          <div className={clsx(styles.certCard, styles.moduleCE)}>
            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <h2>Chaos Engineering Certifications</h2>
                <img
                  src={`${baseUrl}img/cert_dev_ce_badge.svg`}
                  alt="Harness Certified Expert - Developer - CE"
                  className={styles.badge}
                />
              </div>
              <div className={styles.right}>
                Chaos Engineering focuses on delivery and deployment of
                application and infrastructure changes in a safe and sustainable
                way. Your Continuous Delivery pipeline should automate all of
                the steps necessary to get your changes into production.
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
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    Deploy and implement
                  </li>
                </ul>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Exam Details</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Requirements</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </div>
            </div>

            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <span className={styles.productVersion}>
                  <strong>Product version:</strong> CI Drone 1.0
                </span>
              </div>
              <div className={styles.right}>
                <div className={styles.btnContainer}>
                  <Link href="#">
                    <button className={styles.moreDetails}>More Details</button>
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
          */}
        </div>

        {/* Administrator Tab Content */}
        <div
          className={clsx(
            styles.tabContent,
            tab === TabValues.Administrator && styles.active
          )}
        >
          {/* Administrator */}
          <div className={clsx(styles.certCard)}>
            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <h2>Continuous Delivery & GitOps - Administrator (BETA COMING SOON)</h2>
                <img
                  src={`${baseUrl}img/cert_adm_badge.svg`}
                  alt="Harness Certified Expert - Developer - CD"
                  className={styles.badge}
                />
              </div>
              <div className={styles.right}>
                Administrator focuses on delivery and deployment of application
                and infrastructure changes in a safe and sustainable way. Your
                Continuous Delivery pipeline should automate all of the steps
                necessary to get your changes into production.
                <ul className={styles.courseList}>
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    Coming Soon
                  </li>
                </ul>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Prepare for the Exam</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Review Exam Details</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </div>
            </div>

            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <span className={styles.productVersion}>
                  <strong>Product version:&nbsp;</strong> Harness CD & GitOps Enterprise Plan
                </span>
              </div>
              <div className={styles.right}>
                <div className={styles.btnContainer}>
                  <Link href="#">
                    <button className={styles.moreDetails}>Register for the Exam</button>
                  </Link>
                  <Link href="/tutorials/deploy-services">
                    <button className={styles.startLearning}>
                      <span>See All CD & GitOps Certifications</span>
                      <i className="fa-regular fa-arrow-right"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architect Tab Content */}
        <div
          className={clsx(
            styles.tabContent,
            tab === TabValues.Architect && styles.active
          )}
        >
          {/* Architect */}
          <div className={clsx(styles.certCard)}>
            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <h2>Continuous Delivery & GitOps - Architect (BETA COMING SOON)</h2>
                <img
                  src={`${baseUrl}img/cert_arc_badge.svg`}
                  alt="Harness Certified Expert - Developer - CD"
                  className={styles.badge}
                />
              </div>
              <div className={styles.right}>
                Architect focuses on delivery and deployment of application and
                infrastructure changes in a safe and sustainable way. Your
                Continuous Delivery pipeline should automate all of the steps
                necessary to get your changes into production.
                <ul className={styles.courseList}>
                  <li className={styles.courseItem}>
                    <i className="fa-solid fa-circle-check"></i>
                    Coming Soon
                  </li>
                </ul>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Prepare for the Exam</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
                <Link href="#">
                  <div className={styles.certCardBtn}>
                    <span>Review Exam Details</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </Link>
              </div>
            </div>

            <div className={styles.certCardContainer}>
              <div className={styles.left}>
                <span className={styles.productVersion}>
                  <strong>Product version:&nbsp;</strong> Harness CD & GitOps Enterprise Plan
                </span>
              </div>
              <div className={styles.right}>
                <div className={styles.btnContainer}>
                  <Link href="/certifications/continuous-delivery">
                    <button className={styles.moreDetails}>Register for the Exam</button>
                  </Link>
                  <Link href="/tutorials/deploy-services">
                    <button className={styles.startLearning}>
                      <span>See All CD & GitOps Certifications</span>
                      <i className="fa-regular fa-arrow-right"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
