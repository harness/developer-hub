import React from "react";
// import clsx from 'clsx';
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./ModuleCard.module.scss";
import Link from "@docusaurus/Link";
import { FeatureItem } from "./AllTutorials";

function Feature({
  title,
  ribbon,
  description,
  Svg,
  type,
  time,
  module,
  featureCard,
  link = "#",
}: FeatureItem) {
  return (
    <Link
      to={link}
      className={`${styles.tutorialCard} ${
        featureCard ? styles.featureCard : ""
      } ${styles[module]}`}
    >
      <div>
        <h6>
          {Svg && <img src={Svg} />}
          {time}
        </h6>
        {ribbon && (
          <div className={styles.ribbon}>
            <img src="/img/new.svg" />
          </div>
        )}
        <h4>{title}</h4>
        <p>{description}</p>
        <div>
          <ul className={styles.docTypes}>
            {type.map((props, idx) => (
              <li>
                <Tooltip placement="top" overlay={props}>
                  <img src={`/img/icon_doctype_${props}.svg`} alt={props} />
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}

export default function ModuleCard(props): JSX.Element {
  return (
    <div className={styles.spaceBetween}>
      {props.featureCard
        ? props.FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} featureCard={true} />
          ))
        : props.FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} featureCard={false} />
          ))}
    </div>
  );
}
