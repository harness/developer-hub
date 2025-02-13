import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import BrowserOnly from '@docusaurus/BrowserOnly';
import clsx from 'clsx';
import React from 'react';
import allModuleAnimationDark from './assets/hdh_hero-dark.json';
import allModuleAnimation from './assets/hdh_hero.json';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import LearnAboutPlatform from '@site/src/components/LearnAboutPlatform';
import HomepageUniversity from '@site/src/components/HomepageUniversity';
import Feedback from '@site/src/components/Feedback';
import styles from './index.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

function HomePageAnimation() {
  const { colorMode } = useColorMode();
  return (
    <BrowserOnly fallback={<div></div>}>
      {() => {
        const Lottie = require('lottie-react').default;

        return (
          <Lottie
            animationData={
              colorMode === 'dark' ? allModuleAnimationDark : allModuleAnimation
            }
            loop={true}
          />
        );
      }}
    </BrowserOnly>
  );
}
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div style={{ position: 'relative' }}>
      <header className={clsx('container', styles.heroBanner)}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubTitle}>{siteConfig.tagline}</p>
        </div>
      </header>
      <div className={styles.heroImg}>
        <HomePageAnimation />
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <MDXContent>
      <Layout description={`${siteConfig.tagline}`}>
        <div className={styles.homepageWrapper}>
          <HomepageHeader />
          <main>
            <div className="container">
              <div className="flexContainer">
                <HomepageFeatures />
              </div>
              <LearnAboutPlatform />
            </div>
            <Feedback />
          </main>

          <HomepageUniversity />
        </div>
      </Layout>
    </MDXContent>
  );
}
