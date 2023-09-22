import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./styles.module.scss";

export default function communityIcon() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (

      <div className={styles.community}>
        <img src={`${baseUrl}img/harness_community.svg`} />
      </div>

    // </Layout>
  );
}
