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
  link?: string;
};
 
const FeatureList: FeatureItem[] = [{
  title: 'Feature Flag Security',
  module: 'srm',
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
  module: 'srm',
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
  module: 'srm',
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
    module: 'srm',
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
    module: 'srm',
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
    module: 'srm',
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
module: 'srm',
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
module: 'srm',
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

export default function SRM() {
  return (
    // <Layout title="SRM" description="SRM">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Manage SLOs</li>
    //   </ul>
      <div className="container">
        <img src="/img/srm.svg"/>
        <div className={styles.SectionName}><h3>Manage SLOs</h3></div>
        <div className={styles.topSection}>
          <div className={styles.spaceBetween}>
            <div className={styles.moduleTitle}>
              <img src="/img/icon_srm.svg"/>
              <h1>Service Reliability Management</h1>
            </div>
            <div>
              <button className={clsx('button button--lg', styles.btn, styles.btnLight)}><img src="/img/icon_document.png"/> Documentation</button>
            </div>       
          </div>
          <div className={styles.spaceBetween}>
            <div className={styles.content}>
              <p>
                Harness Service Reliability Management (SRM) module helps engineering and DevOps teams to balance feature velocity and bug fixes along with the stability and reliability needs in a production environment.  
              </p>
              <div className={styles.alignCenter}>
                <Link
                  className={clsx('button button--lg', styles.btn, styles.btnSRM)}
                  to="#">
                  SRM Quickstart
                  <img src="/img/Stroke.svg"/>
                </Link>
                <button className={styles.link}>Learn more about SRM</button>
              </div>
            </div>
            <div>
              <img src="/img/srm_flow.svg"/>
            </div>       
          </div>         
        </div>
        <div className={styles.subSection}>
          <h3>
            Service Reliability Tutorials 
          </h3>
            <ModuleCard FeatureList={FeatureList} />
        </div>
      </div>
    // </Layout>
  );
}