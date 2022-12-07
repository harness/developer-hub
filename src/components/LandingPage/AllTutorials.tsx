import React from "react";
// import Layout from '@theme/Layout';
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.scss";
import moduleStyles from "./ModuleCard.module.scss";
import ModuleCard from "./ModuleCard";

enum docType {
  Documentation = "doc",
  Interactive = "interactive",
  Video = "video",
}

export type FeatureItem = {
  title: string;
  module: string;
  description: JSX.Element;
  type: docType[];
  Svg: string;
  ribbon: boolean;
  time: string;
  link?: string;
  featureCard?: boolean;
};

const FeaturedList: FeatureItem[] = [
  {
    title: 'Deploy a Helm Chart using Harness GitOps for Argo CD',
    module: 'cd',
    Svg: '/img/icon_cd.svg',
    description: (
      <>
        Get started with Harness GitOps for Argo CD.
      </>
    ),
    ribbon: true,
    type: [docType.Documentation],
    time: '8min',
    link: '/tutorials/deploy-services/helm-argocd-gitops-k8s',
  },
  {
    title: "TypeScript and React Feature Flags",
    module: "ff",
    Svg: "/img/icon_ff.svg",
    description: (
      <>
        Walks you through adding JavaScript Feature Flags to a TypeScript and
        React Application.
      </>
    ),
    ribbon: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/manage-feature-flags/typescript-react-first-feature-flag",
  },
  {
    title: "Scan a NodeJS Application",
    module: "sto",
    Svg: "/img/icon_sto.svg",
    description: (
      <>Scanning a NodeJS Application and prioritizing scan results.</>
    ),
    ribbon: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/orchestrate-security-tests/nodejs-firstscan",
  },
  {
    title: "Onboard with Terraform",
    module: "platform",
    Svg: "/img/logo.svg",
    description: (
      <>
        Automate lifecycle management of orgs, projects, services, environments,
        connectors and pipelines using the Harness Terraform Provider.
      </>
    ),
    ribbon: true,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/onboard-terraform-provider",
  },
];

const CIList: FeatureItem[] = [
  {
    title: "Node and Docker Pipeline",
    module: "ci",
    Svg: "/img/icon_ci.svg",
    description: (
      <>
        This build automation guide walks you through building a NodeJS and
        Docker Application in a CI Pipeline.
      </>
    ),
    ribbon: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/ci-node-docker-quickstart",
  },
  {
    title: "Run LocalStack as a Service",
    module: "ci",
    Svg: "/img/icon_ci.svg",
    description: (
      <>
        This build automation guide shows how to run LocalStack as a Service
        Dependency in a CI Pipeline
      </>
    ),
    ribbon: true,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/ci-localstack-background-step",
  },
  {
    title: "Build and publish a Java HTTP Server",
    module: "ci",
    Svg: "/img/icon_ci.svg",
    description: (
      <>
        Build, test, and publish a Docker image for a Java HTTP server application

      </>
    ),
    ribbon: true,
    type: [docType.Documentation],
    time: "20 min",
    link: "/tutorials/build-code/ci-java-http-server",
  },
];

const CDList: FeatureItem[] = [{
  title: 'Deploy a Kubernetes Manifest',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Deploying your first set of Kubernetes Services in a CD Pipline with Kubernetes Manifests. 
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  //type: [docType.Documentation, docType.Interactive, docType.Video],
  time: '10 min',
  link: '/tutorials/deploy-services/microservice-manifest-k8s',
},
{
  title: 'Deploy a Helm Chart',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Deploying your first set of Kubernetes Resources in a CD Pipeline with Helm, a popular Kubernetes Package Manager.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/deploy-services/helm-k8s',
},
{
  title: 'Deploy a Helm Chart using Harness GitOps for Argo CD',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Learn about GitOps and how to leverage your own GitOps Pipeline.
    </>
  ),
  ribbon: true,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/deploy-services/helm-argocd-gitops-k8s',
},
{
  title: 'Deploy a Helm Chart using CD Community Edition',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Use the 100% free, source-available, self-managed Harness CD Community Edition to automate Helm Chart deployments.
    </>
  ),
  ribbon: true,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/deploy-services/helm-argocd-gitops-k8s',
},
{
  title: 'Deploy a Docker Image to Amazon ECS ',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Deploy a Docker image to Amazon ECS using a CD Pipeline.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '15min',
  link: '/tutorials/deploy-services/docker-ecs',
},
{
  title: 'Deploy a Private Image in Amazon ECR to Kubernetes ',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Deploy a Docker image from a private Amazon ECR Repository to Kubernetes. 
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '15min',
  link: '/tutorials/deploy-services/docker-ecr-k8s',
},
];

const FFList: FeatureItem[] = [
  {
    title: "TypeScript and React Feature Flags",
    module: "ff",
    Svg: "/img/icon_ff.svg",
    description: (
      <>
        Walks you through adding JavaScript Feature Flags to a TypeScript and
        React Application.
      </>
    ),
    ribbon: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/manage-feature-flags/typescript-react-first-feature-flag",
  },
];

const CCMList: FeatureItem[] = [
  {
    title: "Optimizing Kubernetes Cloud Costs 101",
    module: "ccm",
    Svg: "/img/icon_ccm.svg",
    description: (
      <>
        This guide will walk through how start to optimize your Kubernetes Costs
        on a public cloud provider.
      </>
    ),
    ribbon: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/manage-cloud-costs/ccm-first-kubernetes-tutorial",
  },
];

const SRMList: FeatureItem[] = [
  {
    title: "Introduction to SLO Management with Prometheus",
    module: "srm",
    Svg: "/img/icon_srm.svg",
    description: (
      <>
        Introducing SLOs and how to measure and manage your SLOs leveraging
        Prometheus.
      </>
    ),
    ribbon: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/manage-service-reliability/intro-to-srm",
  },
  {
    title: "Introduction to Java Exception Management",
    module: "srm",
    Svg: "/img/icon_srm.svg",
    description: (
      <>
        Finding and fixing caught, uncaught, and swallowed Java exceptions.
        Learn the process and find the right tooling.
      </>
    ),
    ribbon: false,
    type: [docType.Interactive, docType.Video],
    time: "10min",
    link: "/tutorials/manage-service-reliability/intro-java-exception-management",
  },
];

const STOList: FeatureItem[] = [
  {
    title: "Scan a NodeJS Application",
    module: "sto",
    Svg: "/img/icon_sto.svg",
    description: (
      <>Scanning a NodeJS Application and prioritizing scan results.</>
    ),
    ribbon: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/orchestrate-security-tests/nodejs-firstscan",
  },
];

const CEList: FeatureItem[] = [
  {
    title: "Your First Chaos Experiment on Kubernetes",
    module: "ce",
    Svg: "/img/icon_ce.svg",
    description: (
      <>Running a Chaos Experiment on Kubernetes for the first time.</>
    ),
    ribbon: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/run-chaos-experiments/first-chaos-engineering",
  },
  {
    title: "Chaos Experiment from a Blank Canvas",
    module: "ce",
    Svg: "/img/icon_ce.svg",
    description: (
      <>Create, run, observe and evaluate a custom chaos experiment.</>
    ),
    ribbon: false,
    type: [docType.Documentation],
    time: "5min",
    link: "/tutorials/run-chaos-experiments/chaos-experiment-from-blank-canvas",
  },
  {
    title: 'Integration with Harness CD',
    module: 'ce',
    Svg: "/img/icon_ce.svg",
    description: (
      <>Execute a chaos experiment as part of a Harness CD pipeline for continuous resilience.</>
    ),
    ribbon: false,
    type: [docType.Documentation],
    time: '15min',
    link: '/tutorials/run-chaos-experiments/integration-with-harness-cd'
  },
];

const PlatformList: FeatureItem[] = [
  {
    title: "Install Delegate",
    module: "platform",
    Svg: "/img/logo.svg",
    description: (
      <>Install a Docker or Kubernetes Delegate on your infrastructure.</>
    ),
    ribbon: false,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/install-delegate",
  },
  {
    title: "Onboard with Terraform",
    module: "platform",
    Svg: "/img/logo.svg",
    description: (
      <>
        Automate lifecycle management of orgs, projects, services, environments,
        connectors and pipelines using the Harness Terraform Provider.
      </>
    ),
    ribbon: true,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/onboard-terraform-provider",
  },
];

export default function AllTutorials() {
  return (
    // <Layout title="All Tutorials" description="All Tutorials">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>All Tutorials</li>
    //   </ul>
    <div className={clsx("container", moduleStyles.allTutorials)}>
      <div className={styles.topSection}>
        <h1>All Tutorials</h1>
        <p>
          Learn intelligent software delivery skills with step-by-step
          tutorials, interactive labs, videos and reference docs.
        </p>
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <ModuleCard FeatureList={FeaturedList} featureCard={true} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src="/img/icon_ci.svg" />
          <h3>Build & Test Code</h3>
        </div>
        <ModuleCard FeatureList={CIList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src="/img/icon_cd.svg" />
          <h3>Deploy Services</h3>
        </div>
        <ModuleCard FeatureList={CDList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src="/img/icon_ff.svg" />
          <h3>Manage Feature Flags</h3>
        </div>
        <ModuleCard FeatureList={FFList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src="/img/icon_ccm.svg" />
          <h3>Optimize Cloud Costs</h3>
        </div>
        <ModuleCard FeatureList={CCMList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src="/img/icon_srm.svg" />
          <h3>Manage Service Reliability</h3>
        </div>
        <ModuleCard FeatureList={SRMList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src="/img/icon_sto.svg" />
          <h3>Orchestrate Security Tests</h3>
        </div>
        <ModuleCard FeatureList={STOList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src="/img/icon_ce.svg" />
          <h3>Run Chaos Experiments</h3>
        </div>
        <ModuleCard FeatureList={CEList} />
      </div>
      <div className={styles.subSection}>
        <div className={styles.SectionName}>
          <img src="/img/logo.svg" />
          <h3>Administer Harness Platform</h3>
        </div>
        <ModuleCard FeatureList={PlatformList} />
      </div>
    </div>
    // </Layout>
  );
}
