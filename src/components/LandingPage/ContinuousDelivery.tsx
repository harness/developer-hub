import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard, { CardItem, docType } from "./TutorialCard";

/* Define the cards here */
const PlansList: CardItem[] = [
  {
    title: "Free Plan",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: <>Signup for your free Harness SaaS account</>,
    type: [docType.SaaS],
    link: "https://app.harness.io/auth/#/signup/?module=cd&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=get-started",
  },
  {
    title: "Community Edition",
    module: "cd",
    icon: "img/icon_cd.svg",
    type: [docType.SelfManaged],
    description: <>Install on your self-managed Docker or Kubernetes</>,
    link: "/tutorials/platform/install-cd-community-edition",
  },
];

const FeaturedList: CardItem[] = [
  {
    title: "Deploy a Kubernetes Helm Chart",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: <>Deploy a Helm Chart onto your Kubernetes cluster.</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "8min",
    link: "/tutorials/deploy-services/kubernetes/helm-chart",
  },
  {
    title: "Deploy a Kubernetes Manifest",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: (
      <>
        Deploy a Kubernetes Manifest onto your Kubernetes cluster.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/deploy-services/kubernetes/manifest",
  },
];

const CDList: CardItem[] = [
  {
    title: "Deploy a Kubernetes Helm Chart",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: (
      <>
        Deploy your first set of Kubernetes Resources in a CD Pipeline with
        Helm, a popular Kubernetes Package Manager.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    //type: [docType.Documentation, docType.Interactive, docType.Video],
    time: "10 min",
    link: "/tutorials/deploy-services/kubernetes/helm-chart",
  },
  {
    title: "Deploy a Kubernetes Manifest",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: (
      <>
        Deploy your first set of Kubernetes Services in a CD Pipeline with
        Kubernetes Manifests.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/deploy-services/kubernetes/manifest",
  },
  {
    title: "Build and Deploy a NodeJS App to Kubernetes",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: (
      <>Build and deploy a simple nodejs application using Harness CI and CD.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    //type: [docType.Documentation, docType.Interactive, docType.Video],
    time: "10 min",
    link: "/tutorials/deploy-services/unified-cicd",
  },
  {
    title: "Deploy a Docker Image to Amazon ECS ",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: <>Deploy a Docker image to Amazon ECS.</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/deploy-services/amazon-ecs",
  },
];

export default function CD() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    // <Layout title="CD" description="CD">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Deploy services</li>
    //   </ul>
    <div className="container">
      <div className={styles.SectionName}>
        <h3>Deploy services</h3>
      </div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src={`${baseUrl}img/icon_cd.svg`} />
            <h1>Continuous Delivery & GitOps</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/docs/continuous-delivery">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_documentation.svg`} />
                Documentation
              </button>
            </Link>

            <Link href="/release-notes/continuous-delivery">
              <button
                className={clsx(
                  "button button--lg",
                  styles.btn,
                  styles.btnLight
                )}
              >
                {/* <i className="fa-regular fa-file"></i> */}
                <img src={`${baseUrl}img/icon_release_notes.svg`} />
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Harness CD & GitOps enables deployment of
              application and infrastructure changes in a safe and sustainable
              way. Your CD pipeline or GitOps workflow should automate all of the
              steps necessary to get your changes into production.
            </p>
            <div className={styles.alignCenter}>
              <Link
                className={clsx("button button--lg", styles.btn, styles.btnCD)}
                to="#get-started"
              >
                Tutorials <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link href="https://harness.io/products/continuous-delivery">
                <button className={styles.link}>Learn more</button>
              </Link>
            </div>
          </div>
          <div>
            <img src={`${baseUrl}img/cd.svg`} />
          </div>
        </div>
      </div>
      <div className={styles.subSection}>
        <h3 id="get-started">Get Started for Free</h3>
        <TutorialCard FeatureList={PlansList} />
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">All CD & GitOps Tutorials</h3>
        <TutorialCard FeatureList={CDList} />
      </div>
    </div>
    // </Layout>
  );
}
