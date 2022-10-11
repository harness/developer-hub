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
  ribbon: boolean;
  description: JSX.Element;
  type: docType[];
  time: string;
};
 
const FeatureList: FeatureItem[] = [{
  title: 'Feature Flag Security',
  module: 'sto',
  // Svg: '/img/icon_ci.svg',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation, docType.Interactive, docType.Video],
  time: '15min',
},
{
  title: 'Build Code',
  module: 'sto',
  // Svg: '/img/icon_ci.svg',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation, docType.Interactive],
  time: '15min',
},
{
  title: 'Build Code',
  module: 'sto',
  // Svg: '/img/icon_ci.svg',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. 
    </>
  ),
  ribbon: false,
  type: [docType.Documentation, docType.Interactive],
  time: '15min',
},
{
    title: 'Build Code',
    module: 'sto',
    // Svg: '/img/icon_ci.svg',
    description: (
      <>
        The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. 
      </>
    ),
    ribbon: false,
    type: [docType.Documentation, docType.Interactive],
    time: '15min',
  },
  {
    title: 'Build Code',
    module: 'sto',
    // Svg: '/img/icon_ci.svg',
    description: (
      <>
        The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
      </>
    ),
    ribbon: true,
    type: [docType.Documentation, docType.Interactive],
    time: '15min',
  },
  {
    title: 'Build Code',
    module: 'sto',
    // Svg: '/img/icon_ci.svg',
    description: (
      <>
        The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm.
      </>
    ),
    ribbon: false,
    type: [docType.Documentation, docType.Interactive],
    time: '8min',
  },
{
title: 'Build Code',
module: 'sto',
// Svg: '/img/icon_ci.svg',
description: (
    <>
    The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
    </>
),
ribbon: true,
type: [docType.Documentation, docType.Interactive],
time: '15min',
},
{
title: 'Build Code',
module: 'sto',
// Svg: '/img/icon_ci.svg',
description: (
    <>
    The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm.
    </>
),
ribbon: false,
type: [docType.Documentation, docType.Interactive],
time: '8min',
},]; 

export default function STO() {
  return (
    // <Layout title="STO" description="STO">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Orchestrate security tests</li>
    //   </ul>
      <div className="container">
        <img src="/img/sto.svg"/>
        <div className={styles.SectionName}><h3>Orchestrate security tests</h3></div>
        <div className={styles.topSection}>
          <div className={styles.spaceBetween}>
            <div className={styles.moduleTitle}>
              <img src="/img/icon_sto.svg"/>
              <h1>Security Testing Orchestration</h1>
            </div>
            <div>
              <button className={clsx('button button--lg', styles.btn, styles.btnLight)}><img src="/img/icon_document.png"/> Documentation</button>
            </div>       
          </div>
          <div className={styles.spaceBetween}>
            <div className={styles.content}>
              <p>
                Harness Security Testing Orchestration (STO) enables DevOps and DevSecOps teams to left shift security testing. STO orchestrates scanning, intelligently deduplicating scanner output, prioritizing remediations, and enforcing governance into your Pipeline. STO puts scanning directly into your Pipelines to ensure that vulnerabilities are caught and fixed before your products are ever released. 
              </p>
              <div className={styles.alignCenter}>
                <Link
                  className={clsx('button button--lg', styles.btn, styles.btnSTO)}
                  to="#">
                  STO Quickstart
                  <img src="/img/Stroke.svg"/>
                </Link>
                <button className={styles.link}>Learn more about STO</button>
              </div>
            </div>
            <div>
              <img src="/img/sto_flow.svg"/>
            </div>       
          </div>         
        </div>
        <div className={styles.subSection}>
          <h3>
            STO Tutorials 
          </h3>
            <ModuleCard FeatureList={FeatureList} />
        </div>
      </div>
    // </Layout>
  );
}