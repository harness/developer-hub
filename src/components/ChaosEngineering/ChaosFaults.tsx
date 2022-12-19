import React from "react";
import FaultCard, { FaultCardItem } from "./FaultCard";
import styles from "./ChaosFaults.module.scss";

export default function ChaosFaults({
  categories,
}: {
  categories: FaultCardItem[];
}) {
  return (
    <div className={styles.spaceBetween}>
      {categories.map((props, idx) => (
        <FaultCard key={idx} {...props} />
      ))}
    </div>
  );
}
