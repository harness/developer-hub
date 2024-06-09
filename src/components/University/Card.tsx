import React from "react";
import clsx from "clsx";
// import Tooltip from "rc-tooltip";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./CertCard.module.scss";
import { MODULES } from "../../constants";

export enum type {
  user = "All Users",
  admin = "Administrators",
}

export enum tileType {
  preReq = "pre requisite",
  commingSoon = "comming soon",
  normal = "normal",
}

export enum cardType {
  ILT ="PAID",
  SPT ="FREE"
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
};

export default function IltOrSptCard({
  title,
  description,
  type,
  module,
  version,
  link = "#",
  thumb = false,
  cardType
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
            <img src={`${baseUrl}img/icon_${module}.svg`} />{" "}
            {type ? type : module.toUpperCase()}
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
