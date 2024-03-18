import React from "react";
import clsx from "clsx";
// import Tooltip from "rc-tooltip";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./CertCard.module.scss";
import { MODULES } from "../../constants";

export enum iltType {
  user = "All Users",
  admin = "Administrators",
}

export type IltCardItem = {
  title: string;
  module: MODULES;
  iltType?: iltType;
  description: JSX.Element | string;
  version?: string;
  link?: string;
  thumb?: boolean;
};

export default function IltCard({
  title,
  description,
  iltType,
  module,
  version,
  link = "#",
  thumb = false,
}: IltCardItem) {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <Link
      to={link}
      className={clsx(styles.certCard, styles[module], {
        [styles.thumb]: thumb,
      })}
    >
      <div className={styles.Topright}>
        <p> ILT</p>
      </div>
      <div>
        <div className={styles.moduleLine}>
          <h6>
            <img src={`${baseUrl}img/icon_${module}.svg`} />{" "}
            {iltType ? iltType : module.toUpperCase()}
          </h6>
        </div>
        <h4>{title}</h4>
        <p>{description}</p>
        {version && (
          <div className={styles.productVersion}>
            <strong>Product version</strong>: {version}
          </div>
        )}
      </div>
    </Link>
  );
}
