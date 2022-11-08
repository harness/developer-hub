import React from 'react'
// import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.scss';
import moduleStyles from './ModuleCard.module.scss';
import ModuleCard from './ModuleCard';

enum docType {
  Documentation = 'doc',
  Interactive = 'interactive',
  Video = 'video',
}

type FeatureItem = {
  title: string;
  module: string;
  description: JSX.Element;
  type: docType[];
  Svg: string;
  ribbon: boolean;
  time: string;
  link?: string;
};
 
const FeaturedList: FeatureItem[] = [{
  title: 'First Kubernetes Deployment',
  module: 'cd',
  Svg: '/img/icon_cd.svg',
  description: (
    <>
      Deploying your first set of Kubernetes Services in a CD Pipline with Kubernetes Manifests. 
    </>
  ),
  ribbon: true,
  type: [docType.Documentation],
  time: '10 min',
  link: '/tutorials/deploy-services/kubernetes-cd-first-tutorial',
},
{
  title: 'TypeScript and React Feature Flags',
  module: 'ff',
  Svg: '/img/icon_ff.svg',
  description: (
    <>
      Walks you through adding JavaScript Feature Flags to a TypeScript and React Application.
    </>
  ),
  ribbon: true,
  type: [docType.Documentation],
  time: '10min',
  link: "/tutorials/manage-feature-flags/typescript-react-first-feature-flag",
  }];

const CIList: FeatureItem[] = [{
  title: 'Node and Docker Pipeline',
  module: 'ci',
  Svg: '',
  description: (
    <>
      This build automation guide walks you through building a NodeJS and Docker Application in a CI Pipeline.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '15 min',
  link: '/tutorials/build-code/ci-node-docker-quickstart',
},
];

const CDList: FeatureItem[] = [{
  title: 'First Kubernetes Deployment',
  module: 'cd',
  Svg: '',
  description: (
    <>
      Deploying your first set of Kubernetes Services in a CD Pipline with Kubernetes Manifests. 
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '10 min',
  link: '/tutorials/deploy-services/kubernetes-cd-first-tutorial',
},
{
  title: 'First GitOps Deployment',
  module: 'cd',
  Svg: '',
  description: (
    <>
      Learn about GitOps and how to leverage your own GitOps Pipeline.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/deploy-services/first-gitops-example',
},
{
  title: 'First Helm Deployment',
  module: 'cd',
  Svg: '',
  description: (
    <>
      Deploying your first set of Kubernetes Resources in a CD Pipeline with Helm (K8s Package Manager).
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '10min',
  link: '/tutorials/deploy-services/helm-cd-first-tutorial',
},
{
  title: 'Private Image Amazon ECR Deployment',
  module: 'cd',
  Svg: '',
  description: (
    <>
      Deploying from a private Amazon ECR Repository to Kubernetes. 
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '15min',
  link: '/tutorials/deploy-services/ecr-private-repo-deployment',
},
{
  title: 'First Amazon ECS Deployment',
  module: 'cd',
  Svg: '',
  description: (
    <>
      Deploying to Amazon ECS with a CD Pipeline. 
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '15min',
  link: '/tutorials/deploy-services/first-ecs-cd-deployment',
}];

const FFList: FeatureItem[] = [{
  title: 'TypeScript and React Feature Flags',
  module: 'ff',
  Svg: '',
  description: (
    <>
      Walks you through adding JavaScript Feature Flags to a TypeScript and React Application.
    </>
  ),
  ribbon: true,
  type: [docType.Documentation],
  time: '10min',
  link: "/tutorials/manage-feature-flags/typescript-react-first-feature-flag",
  },
];

const CCMList: FeatureItem[] = [{
  title: 'Optimizing Kubernetes Cloud Costs 101',
  module: 'ccm',
  Svg: '',
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

const SRMList: FeatureItem[] = [{
  title: 'Introduction to SLO Management with Prometheus',
  module: 'srm',
  Svg: '',
  description: (
    <>
      Introducing SLOs and how to measure and manage your SLOs leveraging Prometheus.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation],
  time: '15min',
  link: '/tutorials/manage-service-reliability/intro-to-srm'
}];

const STOList: FeatureItem[] = [{
  title: 'Scan a NodeJS Application',
  module: 'srm',
  Svg: '',
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

const CEList: FeatureItem[] = [{
  title: 'Your First Chaos Experiment on Kubernetes',
  module: 'ce',
  Svg: '',
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

export default function AllTutorials() {
  return (
    // <Layout title="All Tutorials" description="All Tutorials">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>All Tutorials</li>
    //   </ul>
      <div className={clsx('container', moduleStyles.allTutorials)}>
        <div className={styles.topSection}>
              <h1>All Tutorials</h1>
            <p>
                Learn intelligent software delivery skills with step-by-step tutorials, interactive labs, videos and reference docs.
            </p>
        </div> 
        <div className={styles.subSection}>
          <h3>
            Featured Tutorials
          </h3>
            <ModuleCard FeatureList={FeaturedList} featureCard={true}/>
        </div>
        <div className={styles.subSection}>
            <div className={styles.SectionName}>
                <img src="/img/icon_ci.svg"/>
                <h3>
                    Build code
                </h3>
            </div>
            <ModuleCard FeatureList={CIList}/>
        </div>
        <div className={styles.subSection}>
            <div className={styles.SectionName}>
                <img src="/img/icon_cd.svg"/>
                <h3>
                    Deploy Services
                </h3>
            </div>
            <ModuleCard FeatureList={CDList}/>
        </div>
        <div className={styles.subSection}>
            <div className={styles.SectionName}>
                <img src="/img/icon_ff.svg"/>
                <h3>
                    Manage Feature Flags
                </h3>
            </div>
            <ModuleCard FeatureList={FFList}/>
        </div>
        <div className={styles.subSection}>
            <div className={styles.SectionName}>
                <img src="/img/icon_ccm.svg"/>
                <h3>
                    Optimize Cloud Costs
                </h3>
            </div>
            <ModuleCard FeatureList={CCMList}/>
        </div>
        <div className={styles.subSection}>
            <div className={styles.SectionName}>
                <img src="/img/icon_srm.svg"/>
                <h3>
                    Manage Service Reliability
                </h3>
            </div>
            <ModuleCard FeatureList={SRMList}/>
        </div>
        <div className={styles.subSection}>
            <div className={styles.SectionName}>
                <img src="/img/icon_sto.svg"/>
                <h3>
                    Orchestrate Security Tests
                </h3>
            </div>
            <ModuleCard FeatureList={STOList}/>
        </div>
        <div className={styles.subSection}>
            <div className={styles.SectionName}>
                <img src="/img/icon_ce.svg"/>
                <h3>
                    Run Chaos Experiments
                </h3>
            </div>
            <ModuleCard FeatureList={CEList}/>
        </div>
      </div>
    // </Layout>
  );
}