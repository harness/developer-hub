import React from "react";
import clsx from "clsx";
import Tooltip from "rc-tooltip";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./TutorialCard.module.scss";
import { MODULES, MODULE_ICON } from "../../constants";

export enum docType {
  Documentation = "doc",
  Interactive = "interactive",
  Video = "video",
  SaaS = "saas",
  SelfManaged = "selfmanaged",
}

export type CardItem = {
  title: string;
  module: MODULES;
  description: JSX.Element | string;
  icon?: string;
  type?: docType[];
  time?: string;
  newDoc?: boolean;
  link?: string;
  featuredCard?: boolean;
  difficulty?: number; // [1, 3]
  children?: CardItem[];
};

export type CardSections = {
  name: string;
  description?: string;
  list: CardItem[];
}[];

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
  difficulty,
  children,
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
        {time && (
          <h6>
            {icon ? (
              <img src={baseUrl + icon} />
            ) : (
              <img src={baseUrl + MODULE_ICON[module]} />
            )}
            {time}
          </h6>
        )}
        {newDoc && (
          <div className={styles.newDoc}>
            <img src={`${baseUrl}img/new.svg`} />
          </div>
        )}
        <h4>{title}</h4>
        <p>{description}</p>
        {children && children.length > 0 && (
          <ul className={styles.subCategories}>
            {children.map((sub) => (
              <li key={sub.link} title={sub.description.toString()}>
                <Link to={sub.link}>{sub.title}</Link>
              </li>
            ))}
          </ul>
        )}
        {type && (
          <div className={styles.tags}>
            <ul className={styles.docTypes}>
              {type.map((props) => (
                <li key={props}>
                  <Tooltip placement="top" overlay={props}>
                    <img
                      src={`${baseUrl}img/icon_doctype_${props}.svg`}
                      alt={props}
                    />
                  </Tooltip>
                </li>
              ))}
            </ul>
            {difficulty ? (
              <div className={styles.difficulty}>
                Difficulty |
                {[...new Array(3)].map((star, idx) => (
                  <i
                    className={clsx("fa-solid", "fa-square", {
                      [styles.lit]: difficulty > idx,
                    })}
                  ></i>
                ))}
              </div>
            ) : null}
          </div>
        )}
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

export function TutorialCards({ sectionClass, data }): JSX.Element {
  return data.map((section) => (
    <div className={sectionClass}>
      <h3 id={section.name}>{section.name}</h3>
      {section.description && <p>{section.description}</p>}
      <TutorialCard FeatureList={section.list} />
    </div>
  ));
}
