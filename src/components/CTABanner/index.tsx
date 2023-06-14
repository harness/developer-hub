import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "./styles.css";

/* Usage:
<ctabanner
  buttonText="Sign Up"
  title="THE WORLD'S FASTEST CI."
  tagline="Sign up today to get started for free!"
  link="https://app.harness.io/auth/#/signup/?module=ci&utm_source=Website&utm_medium=&utm_campaign=CI-Product-Page-Hero-PLG"
  closable={true}
  target="_blank"
/>
*/

const CTABanner = ({
  buttonText = "Sign Up",
  title,
  tagline,
  link = "#",
  closable = false,
  target = "_blank",
}) => {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const handleClose = () => {
    const elemCtaBanner = document.getElementById("cta-banner");
    if (elemCtaBanner) {
      elemCtaBanner.style.display = "none";
    }
    localStorage.setItem(link, "true"); // use link as an unique key
  };
  useEffect(() => {
    if (!closable) {
      localStorage.setItem(link, "false"); // clear the closable marker if it's set to false
    }
    const elemCtaBanner = document.getElementById("cta-banner");
    const isClosed = localStorage.getItem(link) === "true";
    if (elemCtaBanner) {
      document.body.removeChild(elemCtaBanner);
    }
    if (!isClosed) {
      const elemFirstChild = document.body.children[0];
      const ctaBannerRoot = document.createElement("div");
      ctaBannerRoot.setAttribute("class", "cta-banner");
      ctaBannerRoot.setAttribute("id", "cta-banner");
      const imgIcon = document.createElement("img");
      imgIcon.setAttribute("class", "cta-banner-icon");
      imgIcon.setAttribute("src", `${baseUrl}img/icon_cta.svg`);
      imgIcon.setAttribute("alt", "Information");
      const spanTitle = document.createElement("span");
      spanTitle.setAttribute("class", "cta-banner-title");
      const spanTagline = document.createElement("span");
      spanTagline.setAttribute("class", "cta-banner-tagline");
      const linkButton = document.createElement("a");
      linkButton.setAttribute("href", link);
      linkButton.setAttribute("target", target);
      const btnCTA = document.createElement("button");
      btnCTA.setAttribute("class", "cta-banner-button");
      const spanClose = document.createElement("span");
      spanClose.setAttribute("class", "cta-banner-close");
      spanClose.addEventListener("click", handleClose);
      spanTitle.appendChild(document.createTextNode(title));
      spanTagline.appendChild(document.createTextNode(tagline));
      btnCTA.appendChild(document.createTextNode(buttonText));
      linkButton.appendChild(btnCTA);
      spanClose.appendChild(document.createTextNode("✕"));
      ctaBannerRoot.appendChild(imgIcon);
      if (title) {
        ctaBannerRoot.appendChild(spanTitle);
      }
      if (tagline) {
        ctaBannerRoot.appendChild(spanTagline);
      }
      ctaBannerRoot.appendChild(linkButton);
      if (closable) {
        ctaBannerRoot.appendChild(spanClose);
      }
      document.body.insertBefore(ctaBannerRoot, elemFirstChild);
    }
  }, [buttonText, title, tagline, link, closable, target]);
  return null;
};

export default CTABanner;
