import React from "react";
import clsx from "clsx";
import Tooltip from "rc-tooltip";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { CardItem } from "../LandingPage/TutorialCard";
import { moduleList } from "./data/moduleListData";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./styles.module.scss";

function Feature({ title, icon, description, type, module, link }: CardItem) {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <Link href={link}>
      <div className={clsx(styles.getStartItem, styles[module])}>
        <div className="text--center">
          {/* <icon className={styles.featureSvg} role="img" /> */}
          <img
            src={baseUrl + (icon ? icon : `img/icon_${module}.svg`)}
            className={styles.featureSvg}
            alt={title}
          />
        </div>
        <div
          className={clsx(
            "text--center padding-horiz--md",
            styles.titleAndDesc
          )}
        >
          <h3>{title}</h3>
          {/* <p>{description}</p> */}
        </div>
        {type && (
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
        )}
      </div>
    </Link>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.modules}>
      <div className={styles.getStart}>
        {moduleList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
