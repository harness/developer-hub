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
}: CardItem) {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <Link
      to={link}
      className={clsx(styles.certCard, styles[module], {
        [styles.thumb]: thumb,
      })}
    >
      <div className={styles.Topright}>
        <img src="/img/certification_icon.svg" alt="" />
      </div>
      <div>
        <div className={styles.moduleLine}>
          <h6>
            <img src={`${baseUrl}img/icon_${module}.svg`} />{" "}
            {type ? type : module.toUpperCase()}
            <span>
              {[...new Array(stars[type || ""] || 0)].map(() => (
                <i className="fa-solid fa-star"></i>
              ))}
            </span>
          </h6>
        </div>
        <h4>{title}</h4>
        {numberOfCerts && (
          <div className={styles.numberOfCerts}>
            <img src="/img/icon_cert.svg" /> {numberOfCerts} University
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

/*
export default function TutorialCard(props): JSX.Element {
  return (
    <div className={styles.spaceBetween}>
      {props.featuredCard
        ? props.FeatureList.map((props, idx) => (
            <Card key={idx} {...props} featuredCard={true} />
          ))
        : props.FeatureList.map((props, idx) => (
            <Card key={idx} {...props} featuredCard={false} />
          ))}
    </div>
  );
}
*/
