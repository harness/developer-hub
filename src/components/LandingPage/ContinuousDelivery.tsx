import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard, { CardItem, docType } from "./TutorialCard";

/* Define the cards here */
const FeaturedList: CardItem[] = [
  {
    title: "Deploy a Helm Chart using Harness GitOps for Argo CD",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: <>Get started with Harness GitOps for Argo CD.</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "8min",
    link: "/tutorials/deploy-services/helm-argocd-gitops-k8s",
  },
  {
    title: "Deploy a Helm Chart using CD Community Edition",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: (
      <>
        Use the 100% free, source-available, self-managed Harness CD Community
        Edition to automate Helm Chart deployments.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/deploy-services/cdce-helm-k8s",
  },
];

const CDList: CardItem[] = [
  {
    title: "Deploy a Kubernetes Manifest",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: (
      <>
        Deploying your first set of Kubernetes Services in a CD Pipline with
        Kubernetes Manifests.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    //type: [docType.Documentation, docType.Interactive, docType.Video],
    time: "10 min",
    link: "/tutorials/deploy-services/microservice-manifest-k8s",
  },
  {
    title: "Deploy a Helm Chart",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: (
      <>
        Deploying your first set of Kubernetes Resources in a CD Pipeline with
        Helm, a popular Kubernetes Package Manager.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/deploy-services/helm-k8s",
  },
  {
    title: "Deploy a Helm Chart using Harness GitOps for Argo CD",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: (
      <>Learn about GitOps and how to leverage your own GitOps Pipeline.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/deploy-services/helm-argocd-gitops-k8s",
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
    link: "/tutorials/deploy-services/harness-cicd-tutorial",
  },
  {
    title: "Deploy a Helm Chart using CD Community Edition",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: (
      <>
        Use the 100% free, source-available, self-managed Harness CD Community
        Edition to automate Helm Chart deployments.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/deploy-services/helm-argocd-gitops-k8s",
  },
  {
    title: "Deploy a Docker Image to Amazon ECS ",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: <>Deploy a Docker image to Amazon ECS using a CD Pipeline.</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/deploy-services/docker-ecs",
  },
  {
    title: "Deploy a Private Image in Amazon ECR to Kubernetes ",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: (
      <>
        Deploy a Docker image from a private Amazon ECR Repository to
        Kubernetes.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/deploy-services/docker-ecr-k8s",
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
                <i className="fa-regular fa-file"></i>
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
                <i className="fa-regular fa-file"></i>
                Release Notes
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              Harness CD & GitOps focuses on delivery and deployment of
              application and infrastructure changes in a safe and sustainable
              way. Your Continuous Delivery pipeline should automate all of the
              steps necessary to get your changes into production.
            </p>
            <div className={styles.alignCenter}>
              <Link
                className={clsx("button button--lg", styles.btn, styles.btnCD)}
                to="#all-tutorials"
              >
                Tutorials
                <img src={`${baseUrl}img/Stroke.svg`} />
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
