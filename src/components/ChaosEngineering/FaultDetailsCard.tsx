import React from "react";
import { BackToTopButton, ViewDetails } from "./Buttons";
import styles from "./FaultDetailsCard.module.scss";
import { getCategoryDetails, getFaultDetails } from "./utils/helper";

export default function FaultDetailsCard(props) {
  const [heading, ...rest] = props.children;
  return (
    <div className={styles.detailsCard}>
      <div className={styles.headerBar}>
        <div className={styles.logoCont}>
          <img
            height={30}
            width={30}
            src={
              props.icon ? props.icon : getCategoryDetails(props.category).icon
            }
            alt={heading}
          />
          {heading}
        </div>
        <BackToTopButton href="#introduction" />
      </div>
      {rest}
      <ViewDetails
        href={
          getFaultDetails(
            props.category,
            heading.props.children,
            props.subCategory
          ).link
        }
      />
    </div>
  );
}
