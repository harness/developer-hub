import React from 'react';
import clsx from 'clsx';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css'
import styles from './styles.module.scss';


enum docType {
  Documentation = 'doc',
  Interactive = 'interactive',
  Video = 'video',
}

type FeatureItem = {
  title: string;
  module: string;
  Svg?: string; // React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  type: docType[];
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Build Code',
    module: 'ci',
    Svg: '/img/icon_ci.svg',
    description: (
      <>
        Create a CI build pipeline.
      </>
    ),
    type: [docType.Documentation],
    //type: [docType.Documentation, docType.Interactive, docType.Video],
    link: '/tutorials/build-code',
  },
  {
    title: 'Deploy Services',
    module: 'cd',
    Svg: '/img/icon_cd.svg',
    description: (
      <>
        Create a CD deployment pipeline.
      </>
    ),
    type: [docType.Documentation],
    link: '/tutorials/deploy-services',
  },
  {
    title: 'Manage Feature Flags',
    module: 'ff',
    Svg: '/img/icon_ff.svg',
    description: (
      <>
        Roll out new features progressively.
      </>
    ),
    type: [docType.Documentation],
    link: '/tutorials/manage-feature-flags',
  },
  {
    title: 'Manage Cloud Costs',
    module: 'ccm',
    Svg: '/img/icon_ccm.svg',
    description: (
      <>
        Achieve cost transparency and cut costs.
      </>
    ),
    type: [docType.Documentation],
    link: '/tutorials/manage-cloud-costs',
  },
  {
    title: 'Manage Service Reliability',
    module: 'srm',
    Svg: '/img/icon_srm.svg',
    description: (
      <>
        Monitor SLOs, track error budgets, debug code errors.
      </>
    ),
    type: [docType.Documentation],
    link: '/tutorials/manage-service-reliability',
  },
  {
    title: 'Orchestrate Security Testings',
    module: 'sto',
    Svg: '/img/icon_sto.svg',
    description: (
      <>
        Scan code, containers and apps.
      </>
    ),
    type: [docType.Documentation],
    link: '/tutorials/orchestrate-security-tests',
  },
  {
    title: 'Run Chaos Experiments',
    module: 'ce',
    Svg: '/img/icon_ce.svg',
    description: (
      <>
        Ensure app and infrastructure resilience.
      </>
    ),
    type: [docType.Documentation],
    link: '/tutorials/run-chaos-experiments',
  },
  {
    title: 'Install Delegate',
    module: 'platform',
    Svg: '/img/logo.svg',
    description: (
      <>
        Connect your infrastructure with Harness Platform using Docker & Kubernetes Delegate.
      </>
    ),
    type: [docType.Documentation],
    link: '/tutorials/platform/kubernetes-delegate-install-standalone',
  },
];

function Feature({title, Svg, description, type, module, link}: FeatureItem) {
  return (
    <div className={clsx(styles.getStartItem, styles[module])}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
        <img src={Svg} className={styles.featureSvg} alt={title} />
      </div>
      <div className={clsx('text--center padding-horiz--md', styles.titleAndDesc)}>
        <a href={link}>
          <h3>{title}</h3>
          <p>{description}</p>
        </a>
      </div>
      <div>
        <ul className={styles.docTypes}>
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

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
     {/* <h2>Tutorials</h2> */}
      <div className={styles.getStart}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
      </div>
    </section>
  );
}
