import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import DocCardList from "@theme/DocCardList";
import { useCurrentSidebarCategory } from "@docusaurus/theme-common";
import styles from "./styles.module.scss";

export default function Docs() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const category = useCurrentSidebarCategory();
  return (
      <article className="margin-top--lg">
        <DocCardList items={category.items} />
      </article>
    
  );
}
