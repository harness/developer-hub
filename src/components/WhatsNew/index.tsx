import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

type FeatureItem = {
  title: string;
  date: string;
  link: string;
  Svg: string; // React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Developer-First Experience',
    Svg: '/img/icon_ci.svg', // require('@site/static/img/icon_ci.svg').default,
    date: 'April 1 2022',
    link: '#',
    description: (
      <>
        Manage your delivery pipelines with the familiar developer experience - YAML, Git Commits & PRs. Remove all unnecessary toil and speed up developer productivity.
      </>
    ),
  },
  {
    title: 'One Pipeline For All',
    date: 'April 1 2022',
    Svg: '/img/icon_cd.svg', // require('@site/static/img/icon_cd.svg').default,
    link: '#',
    description: (
      <>
        CI, CD, feature flags, <code>infrastructure-as-code</code>, cloud costs, change tracking, and much more - in a single integrated pipeline.
      </>
    ),
  },
  {
    title: 'AI/ML-Driven Workflows',
    date: 'April 1 2022',
    Svg: '/img/icon_ff.svg', // require('@site/static/img/icon_ccm.svg').default,
    link: '#',
    description: (
      <>
        Our AI takes your delivery pipelines to the next level. You can automate canary verifications, prioritize what tests to run, determine the impact of changes, automate cloud costs, and much more.
      </>
    ),
  },
];

function ChangeLog({title, Svg, description, date, link}: FeatureItem) {
  return (
    <div className={styles.changeLog}>
      <div className={styles.moudleAndDate}>
        {/* <Svg className={styles.whatsNewSvg} role="img" /> */}
        <img src={Svg} className={styles.whatsNewSvg} alt={title} />
        {date}
      </div>
      <a href={link}>
      <div className={styles.whatsNewTxt}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      </a>
    </div>
  );
}

export default function WhatsNew(): JSX.Element {
  return (
    <section className={styles.whatsNew}>
      <h2>What's New</h2>
          {FeatureList.map((props, idx) => (
            <ChangeLog key={idx} {...props} />
          ))}
          <div className={styles.seeAll}><a href="#">See all Release notes ❯</a></div>
    </section>
  );
}
