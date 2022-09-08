import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Developer-First Experience',
    Svg: require('@site/static/img/icon_ci.svg').default,
    description: (
      <>
        Manage your delivery pipelines with the familiar developer experience - YAML, Git Commits & PRs. Remove all unnecessary toil and speed up developer productivity.
      </>
    ),
  },
  {
    title: 'One Pipeline For All',
    Svg: require('@site/static/img/icon_cd.svg').default,
    description: (
      <>
        CI, CD, feature flags, <code>infrastructure-as-code</code>, cloud costs, change tracking, and much more - in a single integrated pipeline.
      </>
    ),
  },
  {
    title: 'AI/ML-Driven Workflows',
    Svg: require('@site/static/img/icon_ccm.svg').default,
    description: (
      <>
        Our AI takes your delivery pipelines to the next level. You can automate canary verifications, prioritize what tests to run, determine the impact of changes, automate cloud costs, and much more.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
