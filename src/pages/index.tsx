import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import BrowserOnly from '@docusaurus/BrowserOnly';
import clsx from 'clsx';
import React from 'react';
import allModuleAnimationDark from './assets/hdh_hero-dark.json';
import allModuleAnimation from './assets/hdh_hero.json';
import LearnAboutPlatform from '@site/src/components/LearnAboutPlatform';
import HomepageUniversity from '@site/src/components/HomepageUniversity';
import Feedback from '@site/src/components/Feedback';
import styles from './index.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

// NEW: category layout replacing the old "Get Started / Learn More" surface
import CategoryGrid from '@site/src/pages/home/components/CategoryGrid';
import { categories } from '@site/src/pages/home/components/categories.data';

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
    <header className={clsx('container', styles.heroBanner)}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubTitle}>{siteConfig.tagline}</p>
      </div>
    </header>
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
              {/* NEW: Category grid (desktop: hover-expand; mobile: collapsible) */}
              <CategoryGrid categories={categories} />

              {/* Keep Platform section as-is */}
              <LearnAboutPlatform />
            </div>

            {/* Keep Feedback widget as-is */}
            <Feedback />
          </main>

          {/* Keep University carousel + footer as-is */}
          <HomepageUniversity />
        </div>
      </Layout>
    </MDXContent>
  );
}