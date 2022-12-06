import React from 'react'
// import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.scss';
import ModuleCard from './ModuleCard';

enum docType {
  Documentation = 'doc',
  Interactive = 'interactive',
  Video = 'video',
}

type FeatureItem = {
  title: string;
  module: string;
  description: JSX.Element;
  type: docType[];
  ribbon: boolean;
  time: string;
  link?: string;
};

const FeaturedList: FeatureItem[] = [
  {
    title: 'Node and Docker CI Pipeline',
    module: 'ci',
    Svg: '/img/icon_ci.svg',
    description: (
      <>
        This build automation guide walks you through building a NodeJS and Docker Application in a CI Pipeline.
      </>
    ),
    ribbon: true,
    type: [docType.Documentation],
    time: '15 min',
    link: '/tutorials/build-code/ci-node-docker-quickstart',
  },];

const DroneList: FeatureItem[] = [{
  title: 'Coming Soon',
  module: 'ci',
  Svg: '/img/icon_ci.svg',
  description: (
    <>
      Drone Tutorials Coming Soon
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: 'tbd',
},
];

const CIList: FeatureItem[] = [{
  title: 'Node and Docker CI Pipeline',
  module: 'ci',
  Svg: '/img/icon_ci.svg',
  description: (
    <>
      This build automation guide walks you through building a NodeJS and Docker Application in a CI Pipeline.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '15 min',
  link: '/tutorials/build-code/ci-node-docker-quickstart',
},
{
  title: 'Run LocalStack as a Service',
  module: 'ci',
  Svg: '/img/icon_ci.svg',
  description: (
    <>
      This build automation guide shows how to run LocalStack as a Service Dependency in a CI Pipeline
    </>
  ),
  ribbon: true,
  type: [docType.Documentation],
  time: '15 min',
  link: '/tutorials/build-code/ci-localstack-background-step',
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

export default function CI() {
  return (
    // <Layout title="CI" description="CI">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Build and Test Code</li>
    //   </ul>
    <div className="container">
      <img src="/img/ci.svg" />
      <div className={styles.SectionName}><h3>Build & Test Code</h3></div>
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.moduleTitle}>
            <img src="/img/icon_ci.svg" />
            <h1>Continuous Integration</h1>
          </div>
          <div>
            <Link href="/docs/continuous-integration">
            <button className={clsx('button button--lg', styles.btn, styles.btnLight)}><img src="/img/icon_document.png" /> Documentation</button>
            </Link>
          </div>
        </div>
        <div className={styles.spaceBetween}>
          <div className={styles.content}>
            <p>
              The CI Overview provides a bird's-eye view of all your Builds — successful, failed, aborted, and expired — and the percentage of successful builds for individual codebases. You can easily see where your builds have failed and drill down into specific builds to troubleshoot and analyze the root causes.
            </p>
            <div className={styles.alignCenter}>
              <Link
                className={clsx('button button--lg', styles.btn, styles.btnCI)}
                to="#all-tutorials">
                CI Tutorials
                <img src="/img/Stroke.svg" />
              </Link>
              <Link href="https://harness.io/products/continuous-integration"><button className={styles.link}>Learn more about CI</button></Link>
            </div>
          </div>
          <div>
            <img src="/img/ci_flow.svg" />
          </div>          
        </div>
      </div>
      <div className={styles.subSection}>
        <h3>
          Featured Tutorials
        </h3>
        <ModuleCard FeatureList={FeaturedList} featureCard={true} />
      </div>
      <div className={styles.subSection}>
        {/* <h3>
          Drone Tutorials
        </h3>
  <ModuleCard FeatureList={DroneList} /> */}
        <h3 id="all-tutorials">
          All CI Tutorials
        </h3>
        <ModuleCard FeatureList={CIList} />
      </div>
    </div>
    // </Layout>
  );
}
