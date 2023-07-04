import React, { useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import styles from "./styles.module.scss";
import { MODULE_DISPLAY_NAME } from "../../constants";
import { communityList } from "./data/communityData";

export default function Community() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  //   const [tab, setTab] = useState(certType.developer);
  //   const handleSwitchTab = (tabVal) => {
  //     setTab(tabVal);
  //   };

  return (
    <div className={styles.community}>
      <div className={styles.title}>
        <h2>Community Posts</h2>
      </div>
      <ul className={styles.communityList}>
        {communityList.map((community) => (
          <li>
            <Link href={community.link}>
              <h3>{community.title}</h3>
            </Link>
            <div className={clsx(styles.props, styles[community.module])}>
              <i className="fa-solid fa-square"></i>
              {MODULE_DISPLAY_NAME[community.module]} &nbsp; • &nbsp; {community.date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
