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
 
const FeaturedList: FeatureItem[] = [{
  title: 'Install Delegate',
  module: 'platform',
  description: (
    <>
      Install a Docker or Kubernetes Delegate. 
    </>
  ),
  ribbon: true,
  type: [docType.Documentation, docType.Video],
  time: '5 min',
  link: '/tutorials/platform/install-delegate',
},
];

const PlatformList: FeatureItem[] = [{
  title: 'Install Delegate',
  module: 'platform',
  description: (
    <>
      Install a Docker or Kubernetes Delegate on your infrastructure.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation, docType.Video],
  time: '5 min',
  link: '/tutorials/platform/install-delegate',
},

];

export default function Platform() {
  return (
    // <Layout title="CD" description="CD">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Deploy services</li>
    //   </ul>
      <div className="container">
       {/* <img src="/img/cd.svg"/> 
       <div className={styles.SectionName}><h3>Administering The Harness Platform</h3></div> */}
        <div className={styles.topSection}>
          <div className={styles.spaceBetween}>         
            {/* <div>
              <Link href="https://docs.harness.io/category/3fso53aw1u-howto-general">
              <button className={clsx('button button--lg', styles.btn, styles.btnLight)}><img src="/img/icon_document.png"/> Documentation</button>
              </Link>
            </div>       
          </div>
          <div className={styles.spaceBetween}>
            <div>
              <p>
              The Harness Platform is a self-service platform that enables end-to-end software delivery.
              </p>
              <div className={styles.alignCenter}>
              <Link
                  className={clsx('button button--lg', styles.btn, styles.btnCD)}
                  to="#all-tutorials">
                  Platform Quickstart 
                  <img src="/img/Stroke.svg"/>
              </Link>
              <Link href="https://harness.io/products/platform"><button className={styles.link}>Learn more about the Harness Platform</button></Link>
              </div>
            </div>
            <div>
              <img src="/img/cd_flow.svg"/>
  </div> */}   
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
            All Platform Tutorials 
          </h3>
            <ModuleCard FeatureList={PlatformList}/>
        </div>
      </div>
    // </Layout>
  );
}