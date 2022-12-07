import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import WhatsNew from "@site/src/components/WhatsNew";
import LearnAboutPlatform from "@site/src/components/LearnAboutPlatform";
import HarnessU from "@site/src/components/HarnessU";
import Feedback from "@site/src/components/Feedback";
import MDXContent from "@theme/MDXContent";
// import Lottie from "lottie-react";
// import allModuleAnimation from "./all_module_animation.json";

import styles from "./index.module.scss";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("container", styles.heroBanner)}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubTitle}>{siteConfig.tagline}</p>
        {/*<div className={styles.buttons}>
          <Link
            className={clsx('button button--lg', styles.heroButton)}
            to="/intro">
            Start Here
          </Link>
      </div> */}
      </div>
      {/* <img src="/img/hero.svg" className={styles.heroImg} /> */}
      <div className={styles.heroImg}>
        {/* <Lottie animationData={allModuleAnimation} loop={true} /> */}
        <video autoPlay={true} loop={true} muted={true}>
          <source src="/img/all_module_animation.mp4" type="video/mp4" />
        </video>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <MDXContent>
      <Layout
        title={`${siteConfig.title}`}
        description="Description will go into a meta tag in <head />"
      >
        <div className={styles.homepageWrapper}>
          <HomepageHeader />
          <main>
            <div className="container">
              <div className="flexContainer">
                <HomepageFeatures />
                {/* <WhatsNew /> */}
              </div>
              <LearnAboutPlatform />
            </div>
            <Feedback />
          </main>

          <HarnessU />
        </div>
      </Layout>
    </MDXContent>
  );
}
