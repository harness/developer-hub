import React from "react";
import Link from "@docusaurus/Link";
import styles from "./FeatureCard.module.scss";

export type FeatureCardItem = {
  title: string;
  description: JSX.Element | string;
  link: string;
};

export default function FeatureCard({
  title,
  description,
  link,
}: FeatureCardItem) {
  return (
    <Link to={link} className={styles.tutorialCard}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </Link>
  );
}
