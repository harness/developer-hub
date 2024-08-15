import React from "react";

import { useColorMode, useCurrentSidebarCategory } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import DocCardList from "@theme/DocCardList";
import styles from "./styles.module.scss";
const ReferenceArchitectures = () => {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const category = useCurrentSidebarCategory();
  return (
    <div className="container">
      <h1>Reference Architectures</h1>
      <article className="margin-top--lg">
        <DocCardList items={category.items} />
      </article>
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
    </div>
  );
};

export default ReferenceArchitectures;
