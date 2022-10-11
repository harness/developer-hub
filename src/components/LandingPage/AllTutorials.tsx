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
  description: JSX.Element;
  type: docType[];
  Svg: string;
  ribbon: boolean;
  time: string;
  link?: string;
};
 
const FeatureList: FeatureItem[] = [{
  title: 'Build Code',
  module: 'ci',
  Svg: '/img/icon_ci.svg',
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
  module: 'ff',
  Svg: '/img/icon_ff.svg',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation, docType.Interactive],
  time: '8 min',
},];

const CIList: FeatureItem[] = [{
  title: 'Deploy Services',
  module: 'ci',
  Svg: '',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation, docType.Interactive, docType.Video],
  time: '20 min',
},
{
  title: 'Build Code',
  module: 'ci',
  Svg: '',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. 
    </>
  ),
  ribbon: false,
  type: [docType.Documentation, docType.Interactive],
  time: '15 min',
},
{
  title: 'Build Code',
  module: 'ci',
  Svg: '',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation, docType.Interactive],
  time: '15 min',
},];

const CDList: FeatureItem[] = [{
  title: 'Deploy Services',
  module: 'cd',
  Svg: '',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation, docType.Interactive, docType.Video],
  time: '15 min',
},
{
  title: 'Build Code',
  module: 'cd',
  Svg: '',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation, docType.Interactive],
  time: '15 min',
},
{
  title: 'Build Code',
  module: 'cd',
  Svg: '',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. 
    </>
  ),
  ribbon: false,
  type: [docType.Documentation, docType.Interactive],
  time: '15 min',
},
{
  title: 'Build Code',
  module: 'cd',
  Svg: '',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm.
    </>
  ),
  ribbon: false,
  type: [docType.Documentation, docType.Interactive],
  time: '15 min',
},
{
  title: 'Build Code',
  module: 'cd',
  Svg: '',
  description: (
    <>
      The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
    </>
  ),
  ribbon: true,
  type: [docType.Documentation, docType.Interactive],
  time: '8 min',
},];

const FFList: FeatureItem[] = [{
    title: 'Deploy Services',
    module: 'ff',
    Svg: '',
    description: (
      <>
        The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
      </>
    ),
    ribbon: true,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    time: '8 min',
  },
  {
    title: 'Build Code',
    module: 'ff',
    Svg: '',
    description: (
      <>
        The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.
      </>
    ),
    ribbon: false,
    type: [docType.Documentation, docType.Interactive],
    time: '15 min',
  },
  {
    title: 'Build Code',
    module: 'ff',
    Svg: '',
    description: (
      <>
        The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm.
      </>
    ),
    ribbon: false,
    type: [docType.Documentation, docType.Interactive],
    time: '15 min',
  },
];

export default function AllTutorials() {
  return (
    // <Layout title="All Tutorials" description="All Tutorials">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>All Tutorials</li>
    //   </ul>
      <div className="container">
        <div className={styles.topSection}>
              <h1>All Tutorials</h1>
            <p>
                Learn intelligent software delivery skills with step-by-step tutorials, interactive labs, videos and reference docs.
            </p>
        </div> 
        <div className={styles.subSection}>
          <h3>
            Feature Tutorials
          </h3>
            <ModuleCard FeatureList={FeatureList} featureCard={true}/>
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
                    manage feature flags
                </h3>
            </div>
            <ModuleCard FeatureList={FFList}/>
        </div>
      </div>
    // </Layout>
  );
}