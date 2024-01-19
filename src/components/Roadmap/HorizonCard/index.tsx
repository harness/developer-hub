import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
const HorizonCard = ({ title, description, tag, module }) => {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();

  return (
    <div className={clsx(styles.card, styles[module])}>
      <div className={styles.tag}>
        {tag && tag.map((txt: string) => <p>{txt}</p>)}
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default HorizonCard;
