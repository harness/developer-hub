import React, { useEffect } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import LearnAboutPlatform from "@site/src/components/LearnAboutPlatform";
import HomepageUniversity from "@site/src/components/HomepageUniversity";
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

  // useEffect(() => {
  //   async function Calling() {
  //     try {
  //       const response = await fetch("http://localhost:8888/api/setCookie", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json", // Specify the content type as JSON
  //         },
  //         body: JSON.stringify({
  //           // Convert the body object to JSON string
  //           account_id: " body.account_id",
  //           token: "body.token",
  //           return_to: "body.return_to",
  //         }),
  //       });
  //     } catch (error) {
  //       // Handle errors here
  //       console.log(error);
  //     }
  //   }
  //   Calling();
  // }, []);

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

          <HomepageUniversity />
        </div>
      </Layout>
    </MDXContent>
  );
}
