import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";

interface Props {
  text: string;
  link?: string;
  icon?: string;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
}
const DocsTag: React.FC<Props> = (props) => {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.url;
  console.log(props.iconColor);

  return (
    <>
      <Link
        to={props.link ? baseUrl + props.link : "#/"}
        className={styles.link}
      >
        <button
          className={styles.btn}
          style={{
            backgroundColor: `${props.backgroundColor}`,
            color: `${props.textColor}`,
            // borderColor: `${props.borderColor}`,
          }}
        >
          {props.icon && (
            <i
              className={`${props.icon} ${styles.custom_icon}`}
              style={
                props.iconColor && {
                  color: `${props.iconColor}`
                  // color: "#4d0b8f",
                }
              }
            ></i>
          )}
          {props.text}
        </button>
      </Link>
    </>
  );
};

export default DocsTag;
