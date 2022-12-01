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
 
const FeaturedList: FeatureItem[] = [{
  title: 'Optimizing Kubernetes Cloud Costs 101',
  module: 'ccm',
  Svg: "/img/icon_ccm.svg",
  description: (
    <>
      This guide will walk through how start to optimize your Kubernetes Costs on a public cloud provider.
    </>
  ),
  ribbon: true,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/manage-cloud-costs/ccm-first-kubernetes-tutorial'
}]; 

const CCMList: FeatureItem[] = [{
  title: 'Optimizing Kubernetes Cloud Costs 101',
  module: 'ccm',
  Svg: "/img/icon_ccm.svg",
  description: (
    <>
      This guide will walk through how start to optimize your Kubernetes Costs on a public cloud provider.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/manage-cloud-costs/ccm-first-kubernetes-tutorial'
}]; 

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
              <h1>Cloud Cost Management</h1>
            </div>
            <div>
              <Link href="/docs/cloud-cost-management">
              <button className={clsx('button button--lg', styles.btn, styles.btnLight)}><img src="/img/icon_document.png"/> Documentation</button>
              </Link>
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
                  to="#all-tutorials">
                  CCM Tutorials
                  <img src="/img/Stroke.svg"/>
                </Link>
                <Link href="https://harness.io/products/cloud-cost"><button className={styles.link}>Learn more about CCM</button></Link>
              </div>
            </div>
            <div>
              <img src="/img/ccm_flow.svg"/>
            </div>       
          </div>         
        </div>
        <div className={styles.subSection}>
          <h3>
            Featured Tutorials
          </h3>
            <ModuleCard FeatureList={FeaturedList} featureCard={true}/>
        </div>
        <div className={styles.subSection}>
          <h3 id="all-tutorials">
            All CCM Tutorials 
          </h3>
            <ModuleCard FeatureList={CCMList}/>
        </div>
      </div>
    // </Layout>
  );
}