import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import LearnAboutPlatform from "@site/src/components/LearnAboutPlatform";
import HomepageCertifications from "@site/src/components/HomepageCertifications";
import Feedback from "@site/src/components/Feedback";
import MDXContent from "@theme/MDXContent";
import Lottie from "lottie-react";
import allModuleAnimation from "./assets/hdh_hero.json";
import allModuleAnimationDark from "./assets/hdh_hero-dark.json";

import styles from "./index.module.scss";

import { useColorMode } from "@docusaurus/theme-common";
function HomepageHeader() {
  const { colorMode } = useColorMode();
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <header className={clsx("container", styles.heroBanner)}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubTitle}>{siteConfig.tagline}</p>
        </div>
      </header>
      <div className={styles.heroImg}>
        <Lottie
          animationData={
            colorMode === "dark" ? allModuleAnimationDark : allModuleAnimation
          }
          loop={true}
        />
        {/* <Lottie animationData={allModuleAnimationDark} loop={true} /> */}
      </div>
    </>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <MDXContent>
      <Layout
        // title="Home" // {`${siteConfig.title}`}
        description={`${siteConfig.tagline}`} // "Description will go into a meta tag in <head />"
      >
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

          <HomepageCertifications />
        </div>
      </Layout>
    </MDXContent>
  );
}
