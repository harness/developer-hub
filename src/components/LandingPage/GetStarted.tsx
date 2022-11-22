import React from 'react'
// import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.scss';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css'
import moduleStyles from './ModuleCard.module.scss';

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
  link?: string;
};
 
const FeaturedList: FeatureItem[] = [
    {
        title: 'Build & Test Code',
        module: 'ci',
        Svg: '/img/icon_ci.svg',
        description: (
            <>
                Create a CI build pipeline
            </>
        ),
        type: [docType.Documentation, docType.Interactive, docType.Video],
        link: '/tutorials/build-code',
    },
    {
        title: 'Deploy Services',
        module: 'cd',
        Svg: '/img/icon_cd.svg',
        description: (
            <>
                Create a CD deployment
            </>
        ),
        type: [docType.Documentation, docType.Interactive, docType.Video],
        link: '/tutorials/deploy-services',
    },
    {
        title: 'Manage Feature Flags',
        module: 'ff',
        Svg: '/img/icon_ff.svg',
        description: (
            <>
                Rollout new features progressively
            </>
        ),
        type: [docType.Documentation, docType.Interactive],
        link: '/tutorials/manage-feature-flags',
    },
    {
        title: 'Optimize Cloud Costs',
        module: 'ccm',
        Svg: '/img/icon_ccm.svg',
        description: (
            <>
                Achieve cost transparency and cut costs
            </>
        ),
        type: [docType.Documentation, docType.Interactive, docType.Video],
        link: '/tutorials/manage-cloud-costs',
    },
    {
        title: 'Manage SLOs',
        module: 'srm',
        Svg: '/img/icon_srm.svg',
        description: (
            <>
                Create SLOs. track error budgets, govern pipelines
            </>
        ),
        type: [docType.Documentation, docType.Interactive, docType.Video],
        link: '/tutorials/manage-service-reliability',
    },
    {
        title: 'Orchestrate Security Testings',
        module: 'sto',
        Svg: '/img/icon_sto.svg',
        description: (
            <>
                Scan your code, containers and apps
            </>
        ),
        type: [docType.Documentation, docType.Interactive, docType.Video],
        link: '/tutorials/orchestrate-security-tests',
    },
    {
        title: 'Run Chaos Experiments',
        module: 'ce',
        Svg: '/img/icon_ce.svg',
        description: (
            <>
                Ensure app and infrastructure resilience
            </>
        ),
        type: [docType.Documentation, docType.Interactive],
        link: '/tutorials/run-chaos-experiments',
    },
];
  
  function Feature({title, description, Svg, type, module, link = "#"}: FeatureItem) {
    return (
      <div className={`${moduleStyles.tutorialCard} ${moduleStyles.getStartedCard} ${moduleStyles[module]}`}> 
          <img src={Svg}/>  
          <h4><Link to={link}>{title}</Link></h4>
          <p>{description}</p>
          <div>
          <ul className={moduleStyles.docTypes}>
            {type.map((props, idx) => (
                <li>
                  <Tooltip placement="top" overlay={props}>
                    <img src={`/img/icon_doctype_${props}.svg`} alt={props} />
                  </Tooltip>
                </li>
              ))}          
          </ul>
        </div>
      </div>
    );
  }
  
  function ModuleCard(props): JSX.Element {
    return (
        <div className={moduleStyles.spaceBetween}>        
            {props.FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
        </div>
    );
  }

export default function GetStarted() {
  return ( 
      <div className="container">
        <div className={styles.getStarted}>
              {/* <h1>Get Started</h1> */}
            <p>
                Learn intelligent software delivery skills with step-by-step tutorials, interactive labs, videos and reference docs.
            </p>
        </div> 
        <ModuleCard FeatureList={FeaturedList}/> 
      </div>
  );
}
