import React from "react";
import FeatureCard, { FeatureCardItem } from "./FeatureCard";
import styles from "./Features.module.scss";

export default function Features({
  categories,
}: {
  categories: FeatureCardItem[];
}) {
  return (
    <div className={styles.spaceBetween}>
      {categories.map((props, idx) => (
        <FeatureCard key={idx} {...props} />
      ))}
    </div>
  );
}
