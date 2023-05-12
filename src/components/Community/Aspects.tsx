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
            <Link href="https://join.slack.com/t/harnesscommunity/shared_invite/zt-y4hdqh7p-RVuEQyIl5Hcx4Ck8VCvzBw">
              <Tooltip placement="top" overlay="Join Harness Community Slack">
                <button className={styles.btn}>
                  <img src={`${baseUrl}img/slack.svg`} />
                  Slack
                </button>
              </Tooltip>
            </Link>
            <Link href="https://www.youtube.com/@Harnessio/videos">
              <Tooltip placement="top" overlay="YouTube Channel">
                <button className={styles.btn}>
                  <img src={`${baseUrl}img/youtube.svg`} />
                  Youtube
                </button>
              </Tooltip>
            </Link>
            <Link href="https://apidocs.harness.io/">
              <Tooltip placement="top" overlay="API Reference">
                <button className={styles.btn}>
                  <img src={`${baseUrl}img/icon_api_docs.svg`} />
                </button>
              </Tooltip>
            </Link>
          </div>
        </div>
      </div>
   
    // </Layout>
  );
}
