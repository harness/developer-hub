import React from "react";
import "./styles.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";

interface Props {
  text: string;
  link: string;
  icon: string;
}
const CustonButton: React.FC<Props> = (props) => {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.url;

  return (
    <Link to={baseUrl + props.link} className="link">
      <button className="rs-button">
        {props.text}
        <i className={`${props.icon}`}></i>
      </button>
    </Link>
  );
};

export default CustonButton;
