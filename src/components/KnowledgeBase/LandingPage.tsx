import React, { useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// import CertCard, { certType } from "./CertCard";
// import { certifications } from "./data/certification-cards";
import styles from "./styles.module.scss";

export type CardItem = {
  title: string;
  module: string;
  description?: JSX.Element | string;
  date?: string;
  link?: string;
};

const kbs: CardItem[] = [
  {
    title: "How to update Template version in a pipeline using an API Drone",
    module: "Drone Support",
    date: "Feb 23, 2023",
    link: "/kb/continuous-integration/kaniko_container_runtime_error",
  },
  {
    title: "How to update Template version in a pipeline using an API Drone",
    module: "Drone Support",
    date: "Feb 23, 2023",
    link: "/kb/continuous-integration/kaniko_container_runtime_error",
  },
  {
    title: "How to update Template version in a pipeline using an API Drone",
    module: "Drone Support",
    date: "Feb 23, 2023",
    link: "/kb/continuous-integration/kaniko_container_runtime_error",
  },
  {
    title: "How to update Template version in a pipeline using an API Drone",
    module: "Drone Support",
    date: "Feb 23, 2023",
    link: "/kb/continuous-integration/kaniko_container_runtime_error",
  },
  {
    title: "How to update Template version in a pipeline using an API Drone",
    module: "Drone Support",
    date: "Feb 23, 2023",
    link: "/kb/continuous-integration/kaniko_container_runtime_error",
  },
  {
    title: "How to update Template version in a pipeline using an API Drone",
    module: "Drone Support",
    date: "Feb 23, 2023",
    link: "/kb/continuous-integration/kaniko_container_runtime_error",
  },
  {
    title: "How to update Template version in a pipeline using an API Drone",
    module: "Drone Support",
    date: "Feb 23, 2023",
    link: "/kb/continuous-integration/kaniko_container_runtime_error",
  },
  {
    title: "How to update Template version in a pipeline using an API Drone",
    module: "Drone Support",
    date: "Feb 23, 2023",
    link: "/kb/continuous-integration/kaniko_container_runtime_error",
  },
  {
    title: "How to update Template version in a pipeline using an API Drone",
    module: "Drone Support",
    date: "Feb 23, 2023",
    link: "/kb/continuous-integration/kaniko_container_runtime_error",
  },
  {
    title: "How to update Template version in a pipeline using an API Drone",
    module: "Drone Support",
    date: "Feb 23, 2023",
    link: "/kb/continuous-integration/kaniko_container_runtime_error",
  },
];

export default function KnowledgeBase() {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  //   const [tab, setTab] = useState(certType.Developer);
  //   const handleSwitchTab = (tabVal) => {
  //     setTab(tabVal);
  //   };

  return (
    <div className={styles.knowledgeBase}>
      <div className={styles.title}>
        <h2>Articles</h2>
      </div>
      <ul className={styles.kbList}>
        {kbs.map((kb) => (
          <li>
            <Link href={kb.link}>
              <h3>{kb.title}</h3>
              <div className={styles.props}>
                <i className="fa-solid fa-square"></i> {kb.module} &nbsp; •
                &nbsp; {kb.date}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
