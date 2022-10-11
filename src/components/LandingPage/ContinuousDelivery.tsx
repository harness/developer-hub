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
//   Svg?: string;
  description: JSX.Element;
  type: docType[];
  time: string;
  link?: string;
};
 
const FeatureList: FeatureItem[] = [{
  title: 'Build Code',
  module: 'cd',
  // Svg: '/img/icon_ci.svg',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
    </>
  ),
  ribbon: true,
  type: [docType.Documentation, docType.Interactive, docType.Video],
  time: '15 min',
},
{
  title: 'Manage Features',
  module: 'cd',
  // Svg: '/img/icon_ci.svg',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation, docType.Interactive],
  time: '8min',
},];

const PipelineList: FeatureItem[] = [{
  title: 'Deploy Services',
  module: 'cd',
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
  module: 'cd',
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
  module: 'cd',
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
  module: 'cd',
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
  module: 'cd',
  // Svg: '/img/icon_ci.svg',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm.
    </>
  ),
  ribbon: true,
  type: [docType.Documentation, docType.Interactive],
  time: '8min',
},];

export default function CI() {
  return (
    // <Layout title="CD" description="CD">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Deploy services</li>
    //   </ul>
      <div className="container">
        <img src="/img/cd.svg"/>
        <div className={styles.SectionName}><h3>Deploy services</h3></div>
        <div className={styles.topSection}>
          <div className={styles.spaceBetween}>
            <div className={styles.moduleTitle}>
              <img src="/img/icon_cd.svg"/>
              <h1>Continuous Delivery</h1>
            </div>
            <div>
              <button className={clsx('button button--lg', styles.btn, styles.btnLight)}><img src="/img/icon_document.png"/> Documentation</button>
            </div>       
          </div>
          <div className={styles.spaceBetween}>
            <div>
              <p>
              Continuous Delivery focuses on delivery and deployment of any sort of change or ribbon feature in a safe and sustainable way. Your Continuous Delivery Pipeline focuses on all of the steps to get your changes into production. 
              </p>
              <div className={styles.alignCenter}>
              <Link
                  className={clsx('button button--lg', styles.btn, styles.btnCD)}
                  to="#">
                  CD Quickstart 
                  <img src="/img/Stroke.svg"/>
              </Link>
              <button className={styles.link}>Learn more about CD</button>
              </div>
            </div>
            <div>
              <img src="/img/cd_flow.svg"/>
            </div>    
          </div>      
        </div>
        <div className={styles.subSection}>
          <h3>
            Feature Tutorials
          </h3>
            <ModuleCard FeatureList={FeatureList} featureCard={true}/>
        </div>
        <div className={styles.subSection}>
          <h3>
            All Pipeline Tutorials 
          </h3>
            <ModuleCard FeatureList={PipelineList}/>
        </div>
      </div>
    // </Layout>
  );
}