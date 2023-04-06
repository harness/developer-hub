import React, { useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import styles from "./styles.module.scss";
import { MODULE_DISPLAY_NAME } from "../../constants";
import { knowledgeBaseList } from "./data/knowledgeBaseData";

export default function KnowledgeBase() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  //   const [tab, setTab] = useState(certType.developer);
  //   const handleSwitchTab = (tabVal) => {
  //     setTab(tabVal);
  //   };

  return (
    <div className={styles.knowledgeBase}>
      <div className={styles.title}>
        <h2>Articles</h2>
      </div>
      <ul className={styles.kbList}>
        {knowledgeBaseList.map((kb) => (
          <li>
            <Link href={kb.link}>
              <h3>{kb.title}</h3>
            </Link>
            <div className={clsx(styles.props, styles[kb.module])}>
              <i className="fa-solid fa-square"></i>
              {MODULE_DISPLAY_NAME[kb.module]} &nbsp; • &nbsp; {kb.date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
