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
            <Link href="https://join.slack.com/t/harnesscommunity/shared_invite/zt-1h2cy1up2-Bf3MQQvKTf~YkVcsnkJ5pw">
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
            <Link href="https://discuss.harness.io/">
              <Tooltip placement="top" overlay="Forum [Discourse] - Read only as of June 16, 2023">
                <button className={styles.btn}>
                  <img src={`${baseUrl}img/discuss.svg`} />
                </button>
              </Tooltip>
            </Link>
          </div>
        </div>
      </div>
   
    // </Layout>
  );
}
