import React from "react";

import {
  useColorMode,
  useCurrentSidebarCategory,
} from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { TutorialCards } from "../LandingPage/TutorialCard";
import styles from "./styles.module.scss";

import { ReferenceArchitecturesCards } from "./data/referenceArchitecture";
const ReferenceArchitectures = () => {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const category = useCurrentSidebarCategory();
  return (
    <div className="container">
      <h1>Reference Architectures</h1>
      <div className={styles.illustrationContainer}>
        <img
          className={styles.illustration}
          src={
            colorMode !== "light"
              ? `${baseUrl}img/ReferenceArchitectures_Dark.svg`
              : `${baseUrl}img/ReferenceArchitectures_Light.svg`
          }
        />
      </div>
      <TutorialCards
        data={ReferenceArchitecturesCards}
        sectionClass={styles.subSection}
      />
    </div>
  );
};

export default ReferenceArchitectures;
