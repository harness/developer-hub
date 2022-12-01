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
  title: 'Scanning a NodeJS Application',
  module: 'sto',
  Svg: "/img/icon_sto.svg",
  description: (
    <>
      Scanning a NodeJS Application and prioritizing scan results. 
    </>
  ),
  ribbon: true,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/orchestrate-security-tests/nodejs-firstscan'
}]; 

const STOList: FeatureItem[] = [{
  title: 'Scanning a NodeJS Application',
  module: 'sto',
  Svg: "/img/icon_sto.svg",
  description: (
    <>
       Scanning a NodeJS Application and prioritizing scan results. 
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/orchestrate-security-tests/nodejs-firstscan'
}];

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
              <Link href="/docs/security-testing-orchestration">
              <button className={clsx('button button--lg', styles.btn, styles.btnLight)}><img src="/img/icon_document.png"/> Documentation</button>
              </Link>
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
                  to="#all-tutorials">
                  STO Tutorials
                  <img src="/img/Stroke.svg"/>
                </Link>
                <Link href="https://harness.io/products/security-testing-orchestration"><button className={styles.link}>Learn more about STO</button></Link>
              </div>
            </div>
            <div>
              <img src="/img/sto_flow.svg"/>
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
            All STO Tutorials 
          </h3>
            <ModuleCard FeatureList={STOList}/>
        </div>
      </div>
    // </Layout>
  );
}