import React, { useEffect, useState } from "react";
import "./styles.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import Tooltip from "rc-tooltip";

interface Props {
  text: string;
  link: string;
  icon?: string;
  tooltip?: string;
  size?: string;
}
const DocsButton: React.FC<Props> = (props) => {
  const size: string | null = props.size;
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.url;

  return (
      <Link to={baseUrl + props.link} className="link">
        {props.tooltip ? (
          <Tooltip placement="top" overlay={<span>{props.tooltip}</span>}>
            <button className={`doc-button  ${size ? size : "small"}`}>
              {props.text}
              {props.icon && <i className={`${props.icon} custom-icon`}></i>}
            </button>
          </Tooltip>
        ) : (
          <button className={`doc-button ${size ? size : "small"}`}>
            {props.text}
            {props.icon && <i className={`${props.icon} custom-icon`}></i>}
          </button>
        )}
      </Link>
  );
};

export default DocsButton;
