import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./styles.module.scss";

export default function communityAspects() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          <div className={styles.btnContainer}>
            <Link href="https://join-community-slack.harness.io/">
              <Tooltip placement="top" overlay="Join Harness Community Slack">
                <button className={styles.btn}>
                  <img src={`${baseUrl}img/slack.svg`} />
                  Slack
                </button>
              </Tooltip>
            </Link>
            <Link href="/kb">
              <Tooltip placement="top" overlay="Knowledge Base">
                <button className={styles.btn}>
                  <img src={`${baseUrl}img/kb.svg`} />
                </button>
              </Tooltip>
            </Link>
            <Link href="https://www.youtube.com/@Harnesscommunity/videos">
              <Tooltip placement="top" overlay="YouTube Channel">
                <button className={styles.btn}>
                  <img src={`${baseUrl}img/youtube.svg`} />
                  Youtube
                </button>
              </Tooltip>
            </Link>
            <Link href="https://www.reddit.com/r/Harnessio/">
              <Tooltip placement="top" overlay="Harness Reddit">
                <button className={styles.btn}>
                  <img src={`${baseUrl}img/reddit.svg`} />
                  Reddit
                </button>
              </Tooltip>
            </Link>
            <Link href="https://drone.discourse.group/">
              <Tooltip placement="top" overlay="Drone Discourse (Read Only)">
                <button className={styles.btn}>
                  <img src={`${baseUrl}img/discourse.svg`} />
                  Drone Discourse
                </button>
              </Tooltip>
            </Link>
            <Link href="/university">
              <Tooltip placement="top" overlay="Harness University">
                <button className={styles.btn}>
                  <img src={`${baseUrl}img/school.svg`} />
                  Harness University
                </button>
              </Tooltip>
            </Link>
          </div>
        </div>
      </div>
   
    // </Layout>
  );
}
