import React from "react";
import Link from "@docusaurus/Link";
import styles from "./FaultCard.module.scss";
import clsx from "clsx";
import { getCategoryDetails } from "./utils/helper";

export type FaultCardItem = {
  icon?: string;
  title: string;
  category: string;
  description: JSX.Element | string;
  faults?: number;
  faultLabel?: string;
  link?: string;
};

export default function FaultCard({
  icon,
  title,
  category,
  description,
  faults,
  faultLabel,
  link,
}: FaultCardItem) {
  const details = getCategoryDetails(category);
  return (
    <Link to={link ?? details.link} className={styles.tutorialCard}>
      <div className={styles.icon}>
        {icon ? <img src={icon} /> : <img src={details.icon} />}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      {faults && (
        <div
          className={clsx(styles.description, styles.faults)}
        >{`(${faults} ${faultLabel || "faults"})`}</div>
      )}
    </Link>
  );
}
