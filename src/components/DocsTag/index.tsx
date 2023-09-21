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
// use it like this
//  <DocsTag icon = "fa-solid fa-icons" text="Default" link="/docs/security-testing-orchestration" />
//  <DocsTag  text="Default without icon" link="/docs/security-testing-orchestration" />
//  <DocsTag  backgroundColor= "#ff8ac1" text="With out icon"  textColor="#ca136c"  />
//  <DocsTag icon = "fa-solid fa-hand-dots"  backgroundColor= "#cbe2f9"   textColor="#0b5cad" iconColor="#6938c0" text="Community" link="/docs/security-testing-orchestration"  />


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
