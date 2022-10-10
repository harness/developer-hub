import React from 'react';
import clsx from 'clsx';
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
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: '/build-code',
  },
  {
    title: 'Deploy Services',
    module: 'cd',
    Svg: '/img/icon_cd.svg',
    description: (
      <>
        Create a CD deployment.
      </>
    ),
    type: [docType.Documentation, docType.Interactive],
    link: '/deploy-services',
  },
  {
    title: 'Manage Feature Flags',
    module: 'ff',
    Svg: '/img/icon_ff.svg',
    description: (
      <>
        Rollout new features progressively.
      </>
    ),
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: '/manage-feature-flags',
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
    type: [docType.Documentation, docType.Video],
    link: '/category/optimize-cloud-costs',
  },
  {
    title: 'Manage SLOs',
    module: 'srm',
    Svg: '/img/icon_srm.svg',
    description: (
      <>
        Create SLOs. track error budgets, govern pipelines.
      </>
    ),
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: '/category/manage-slos',
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
    link: '/category/orchestrate-security-tests',
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
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: '/category/run-chaos-experiments',
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
            <li><img src={`/img/icon_doctype_${props}.svg`} alt={props} /></li>
          ))}
          
        </ul>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <h2>Tutorials</h2>
      <div className={styles.getStart}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
      </div>
    </section>
  );
}
