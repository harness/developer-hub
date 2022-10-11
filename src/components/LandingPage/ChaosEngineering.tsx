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
  title: 'Your First Chaos Experiment on Kubernetes',
  module: 'ce',
  description: (
    <>
      Running a Chaos Experiment on Kuberenetes for the first time. 
    </>
  ),
  ribbon: true,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/run-chaos-experiments/first-chaos-engineering'
}]; 

const CEList: FeatureItem[] = [{
  title: 'Your First Chaos Experiment on Kubernetes',
  module: 'ce',
  description: (
    <>
      Running a Chaos Experiment on Kuberenetes for the first time. 
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/run-chaos-experiments/first-chaos-engineering'
}];

export default function CE() {
  return (
    // <Layout title="CE" description="CE">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Run chaos experiments</li>
    //   </ul>
      <div className="container">
        <img src="/img/ce.svg"/>
        <div className={styles.SectionName}><h3>Run chaos experiments</h3></div>
        <div className={styles.topSection}>
          <div className={styles.spaceBetween}>
            <div className={styles.moduleTitle}>
              <img src="/img/icon_ce.svg"/>
              <h1>Chaos Engineering</h1>
            </div>
            <div>
              <button className={clsx('button button--lg', styles.btn, styles.btnLight)}><img src="/img/icon_document.png"/> Documentation</button>
            </div>       
          </div>
          <div className={styles.spaceBetween}>
            <div className={styles.content}>
              <p>
                Harness CE helps you find your system’s weak points using controlled systems-level failure experiments, and equips you with the information you need to prevent them from happening in the future. The result? Increased systems reliability and less downtime.
              </p>
              <div className={styles.alignCenter}>
                <Link
                  className={clsx('button button--lg', styles.btn, styles.btnCE)}
                  to="#">
                  CE Quickstart
                  <img src="/img/Stroke.svg"/>
                </Link>
                <button className={styles.link}>Learn more about CE</button>
              </div>
            </div>
            <div>
              <img src="/img/ce_flow.svg"/>
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
          <h3>
            All Chaos Engineering Tutorials 
          </h3>
            <ModuleCard FeatureList={CEList}/>
        </div>
      </div>
    // </Layout>
  );
}