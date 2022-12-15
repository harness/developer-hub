import React from "react";
import Link from "@docusaurus/Link";
import styles from "./FaultCard.module.scss";
import clsx from "clsx";

export type FaultCardItem = {
  icon: string;
  title: string;
  description: JSX.Element | string;
  faults?: number;
  link: string;
};

export default function FaultCard({
  icon,
  title,
  description,
  faults,
  link = "#",
}: FaultCardItem) {
  return (
    <Link to={link} className={styles.tutorialCard}>
      <div className={styles.icon}>{icon && <img src={icon} />}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      {faults && (
        <div
          className={clsx(styles.description, styles.faults)}
        >{`(${faults} faults)`}</div>
      )}
    </Link>
  );
}
