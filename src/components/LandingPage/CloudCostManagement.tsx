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
  module: 'ccm',
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
  module: 'ccm',
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
  module: 'ccm',
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
    module: 'ccm',
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
    module: 'ccm',
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
    module: 'ccm',
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
module: 'ccm',
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
module: 'ccm',
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

export default function CCM() {
  return (
    // <Layout title="CCM" description="CCM">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Optimize Cloud Costs</li>
    //   </ul>
      <div className="container">
        <img src="/img/ccm.svg"/>
        <div className={styles.SectionName}><h3>Optimize Cloud Costs</h3></div>
        <div className={styles.topSection}>
          <div className={styles.spaceBetween}>
            <div className={styles.moduleTitle}>
              <img src="/img/icon_ccm.svg"/>
              <h1>Cloud Costs Managment</h1>
            </div>
            <div>
              <button className={clsx('button button--lg', styles.btn, styles.btnLight)}><img src="/img/icon_document.png"/> Documentation</button>
            </div>       
          </div>
          <div className={styles.spaceBetween}>
            <div className={styles.content}>
              <p>
              Harness Cloud Cost Management (CCM) is an intelligent cloud cost management solution for FinOps, Infrastructure, and Engineering teams. Harness CCM provides:
                <ul>
                    <li>Complete cost transparency across engineering and finance with robust business intelligence (BI)</li>
                    <li>Ability to reduce wasted cloud costs by up to 75% with Intelligent Cloud AutoStopping</li>
                </ul>      
              </p>
              <div className={styles.alignCenter}>
                <Link
                  className={clsx('button button--lg', styles.btn, styles.btnCCM)}
                  to="#">
                  CCM Quickstart
                  <img src="/img/Stroke.svg"/>
                </Link>
                <button className={styles.link}>Learn more about CCM</button>
              </div>
            </div>
            <div>
              <img src="/img/ccm_flow.svg"/>
            </div>       
          </div>         
        </div>
        <div className={styles.subSection}>
          <h3>
            Cloud Costs Tutorials 
          </h3>
            <ModuleCard FeatureList={FeatureList} />
        </div>
      </div>
    // </Layout>
  );
}