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
 
const FeaturedList: FeatureItem[] = [
{
  title: 'Deploy a Helm Chart using Harness GitOps for Argo CD',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Get started with Harness GitOps for Argo CD.
    </>
  ),
  ribbon: true,
  type: [docType.Documentation],
  time: '8min',
  link: '/tutorials/deploy-services/helm-argocd-gitops-k8s',
},
{
  title: 'Deploy a Helm Chart using CD Community Edition',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Use the 100% free, source-available, self-managed Harness CD Community Edition to automate Helm Chart deployments.
    </>
  ),
  ribbon: true,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/deploy-services/cdce-helm-k8s',
},
];

const CDList: FeatureItem[] = [{
  title: 'Deploy a Kubernetes Manifest',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Deploying your first set of Kubernetes Services in a CD Pipline with Kubernetes Manifests. 
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  //type: [docType.Documentation, docType.Interactive, docType.Video],
  time: '10 min',
  link: '/tutorials/deploy-services/microservice-manifest-k8s',
},
{
  title: 'Deploy a Helm Chart',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Deploying your first set of Kubernetes Resources in a CD Pipeline with Helm, a popular Kubernetes Package Manager.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/deploy-services/helm-k8s',
},
{
  title: 'Deploy a Helm Chart using Harness GitOps for Argo CD',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Learn about GitOps and how to leverage your own GitOps Pipeline.
    </>
  ),
  ribbon: true,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/deploy-services/helm-argocd-gitops-k8s',
},
{
  title: 'Deploy a Helm Chart using CD Community Edition',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Use the 100% free, source-available, self-managed Harness CD Community Edition to automate Helm Chart deployments.
    </>
  ),
  ribbon: true,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/deploy-services/helm-argocd-gitops-k8s',
},
{
  title: 'Deploy a Docker Image to Amazon ECS ',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Deploy a Docker image to Amazon ECS using a CD Pipeline.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '15min',
  link: '/tutorials/deploy-services/docker-ecs',
},
{
  title: 'Deploy a Private Image in Amazon ECR to Kubernetes ',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Deploy a Docker image from a private Amazon ECR Repository to Kubernetes. 
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '15min',
  link: '/tutorials/deploy-services/docker-ecr-k8s',
},
];

export default function CD() {
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
              <h1>Continuous Delivery & GitOps</h1>
            </div>
            <div>
              <Link href="/docs/continuous-delivery">
              <button className={clsx('button button--lg', styles.btn, styles.btnLight)}><img src="/img/icon_document.png"/> Documentation</button>
              </Link>
            </div>       
          </div>
          <div className={styles.spaceBetween}>
            <div className={styles.content}>
              <p>
              Continuous Delivery & GitOps focuses on delivery and deployment of application and infrastructure changes in a safe and sustainable way. Your Continuous Delivery pipeline should automate all of the steps necessary to get your changes into production. 
              </p>
              <div className={styles.alignCenter}>
              <Link
                  className={clsx('button button--lg', styles.btn, styles.btnCD)}
                  to="#all-tutorials">
                  CD & GitOps Tutorials 
                  <img src="/img/Stroke.svg"/>
              </Link>
              <Link href="https://harness.io/products/continuous-delivery"><button className={styles.link}>Learn more about CD & GitOps</button></Link>
              </div>
            </div>
            <div>
              <img src="/img/cd_flow.svg"/>
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
            All CD & GitOps Tutorials 
          </h3>
            <ModuleCard FeatureList={CDList}/>
        </div>
      </div>
    // </Layout>
  );
}