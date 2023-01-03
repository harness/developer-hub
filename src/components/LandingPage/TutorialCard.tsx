import React from "react";
// import clsx from 'clsx';
import Tooltip from "rc-tooltip";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./TutorialCard.module.scss";

export enum docType {
  Documentation = "doc",
  Interactive = "interactive",
  Video = "video",
}

export type CardItem = {
  title: string;
  module: string;
  description: JSX.Element | string;
  icon: string;
  type?: docType[];
  time?: string;
  newDoc?: boolean;
  link?: string;
  featuredCard?: boolean;
};

function Card({
  title,
  newDoc,
  description,
  icon,
  type,
  time,
  module,
  featuredCard,
  link = "#",
}: CardItem) {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <Link
      to={link}
      className={`${styles.tutorialCard} ${
        featuredCard ? styles.featuredCard : ""
      } ${styles[module]}`}
    >
      <div>
        <h6>
          {icon && <img src={baseUrl + icon} />}
          {time}
        </h6>
        {newDoc && (
          <div className={styles.newDoc}>
            <img src={`${baseUrl}img/new.svg`} />
          </div>
        )}
        <h4>{title}</h4>
        <p>{description}</p>
        <div>
          <ul className={styles.docTypes}>
            {type.map((props, idx) => (
              <li>
                <Tooltip placement="top" overlay={props}>
                  <img
                    src={`${baseUrl}img/icon_doctype_${props}.svg`}
                    alt={props}
                  />
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}

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
