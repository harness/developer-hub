import React from "react";
import clsx from "clsx";
// import Tooltip from "rc-tooltip";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./CertCard.module.scss";
import { MODULES } from "../../constants";

export enum certType {
  developer = "Developers",
  administrator = "Administrators",
  architect = "Architects",
}
const stars = {
  [certType.developer]: 1,
  [certType.administrator]: 2,
  [certType.architect]: 3,
};

export type CardItem = {
  title: string;
  module: MODULES;
  type?: certType;
  description: JSX.Element | string;
  version?: string;
  link?: string;
  thumb?: boolean;
  numberOfCerts?: number;
  ILT_available?: boolean;
  SPT_available?: boolean;
};

export default function CertCard({
  title,
  description,
  type,
  module,
  version,
  link = "#",
  thumb = false,
  numberOfCerts,
  ILT_available,
  SPT_available,
}: CardItem) {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <Link
      to={link}
      className={clsx(styles.certCard, styles[module], {
        [styles.thumb]: thumb,
      })}
    >
      <div>
        <div className={styles.moduleLine}>
          <h6>
            <img src={`${baseUrl}img/icon_${module}.svg`} />{" "}
            {type ? type : module.toUpperCase()}
          </h6>
          <span>
            {[...new Array(stars[type || ""] || 0)].map(() => (
              <i className="fa-solid fa-star"></i>
            ))}
          </span>
        </div>
        <h4>{title}</h4>
        {numberOfCerts && (
          <div className={styles.numberOfCerts}>
            <img src="/img/icon_cert.svg" /> {numberOfCerts} Certifications
          </div>
        )}
        {ILT_available && (
          <div className={styles.numberOfCerts}>
            <img src="/img/Instructor_led_trainin_logo.svg" />
            Instructor-Led Training Available
          </div>
        )}
        {SPT_available && (
          <div className={styles.numberOfCerts}>
            <img src="/img/self-paced-training-logo-active.svg" />
            Self Paced Training Available
          </div>
        )}
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
