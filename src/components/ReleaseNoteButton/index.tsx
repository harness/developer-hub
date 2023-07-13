import React from "react";
import "./styles.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";


interface Props {
  text: string;
  link: string;
}
const RNButton: React.FC<Props> = (props) => {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.url;
  const handleClick = () => {
    window.location.href = baseUrl + props.link;
    console.log("Here");
  };
  return (
    <button className="rs-button" onClick={handleClick}>
      {props.text}
      <i className="fa-solid fa-square-rss"></i>
    </button>
  );
};

export default RNButton;
