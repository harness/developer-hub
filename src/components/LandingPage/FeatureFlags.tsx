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
  module: 'ff',
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
  module: 'ff',
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
  module: 'ff',
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
    module: 'ff',
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
    module: 'ff',
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
    module: 'ff',
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
module: 'ff',
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
module: 'ff',
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

export default function FF() {
  return (
    // <Layout title="FF" description="FF">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Manage feature flags</li>
    //   </ul>
      <div className="container">
        <img src="/img/ff.svg"/>
        <div className={styles.SectionName}><h3>Manage Feature Flags</h3></div>
        <div className={styles.topSection}>
          <div className={styles.spaceBetween}>
            <div className={styles.moduleTitle}>
              <img src="/img/icon_ff.svg"/>
              <h1>Feature Flags</h1>
            </div>
            <div>
              <button className={clsx('button button--lg', styles.btn, styles.btnLight)}><img src="/img/icon_document.png"/> Documentation</button>
            </div>       
          </div>
          <div className={styles.spaceBetween}>
            <div>
              <p>
                Harness Feature Flags (FF) is a feature management solution that lets you change your software's functionality without deploying new code. It does this by allowing you to hide code or behavior without having to ship new versions of the software. A feature flag is like a powerful if statement.
              </p>
              <img src="/img/ff_flow.svg" className={styles.ff_img}/>
              <div className={styles.alignCenter}>
                <Link
                  className={clsx('button button--lg', styles.btn, styles.btnFF)}
                  to="#">
                  FF Quickstart
                  <img src="/img/Stroke.svg"/>
                </Link>
                <button className={styles.link}>Learn more about FF</button>
              </div>
            </div>     
          </div>          
        </div>
        <div className={styles.subSection}>
          <h3>
            Feature Flags Tutorials 
          </h3>
            <ModuleCard FeatureList={FeatureList} />
        </div>
      </div>
    // </Layout>
  );
}