import React from "react";
import clsx from "clsx";
// import Tooltip from "rc-tooltip";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./CertCard.module.scss";
import { MODULES, MODULE_ICON } from "../../constants";

export enum type {
  user = "All Users",
  admin = "Administrators",
}

export enum tileType {
  preReq = "pre requisite",
  preReqWAAP = "pre requisite waap",
  commingSoon = "comming soon",
  normal = "normal",
  waap = "waap",
}

export enum cardType {
  ILT ="PAID",
  SPT ="FREE"
}

export enum pillType {
  ilt = "Instructor-Led Training",
  tidbits = "Tidbits",
  videoCourses = "Video Course",
  selfPaced = "Self-Paced Training",
}

export type IltCardItem = {
  title: string;
  module: MODULES;
  type?: type;
  description: JSX.Element | string;
  version?: string;
  link?: string;
  thumb?: boolean;
  tileType: tileType;
  cardType: cardType;
  /** Optional content-format pill rendered under the module line. */
  pill?: pillType;
};

export default function IltOrSptCard({
  title,
  description,
  type,
  module,
  version,
  link = "#",
  thumb = false,
  cardType,
  pill,
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
        <p>{cardType}</p>
      </div>
      <div>
        <div className={styles.moduleLine}>
          <h6>
            <img src={`${baseUrl}${MODULE_ICON[module] || `img/icon_${module}.svg`}`} />{" "}
            {type ? type : module.toUpperCase()}
          </h6>
        </div>
        {pill && <span className={styles.pill}>{pill}</span>}
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
