import React from "react";
import Link from "@docusaurus/Link";
import { CcmData } from "./roadmapData";
import roadmapStyles from "@site/src/components/Roadmap/index.module.scss";
import styles from "./styles.module.scss";

const CCMRoadmap = () => {
  return (
    <div className={roadmapStyles.roadmap}>
      <div className={roadmapStyles.RoadmapSection}>
        {Object.entries(CcmData).map(([key, value]) => (
          <div className={roadmapStyles.section}>
            <div className={roadmapStyles.sectionDescription}>
              <div className={roadmapStyles.titleLine}>
                <h4>{key}</h4>
                <p>{value.description}</p>
              </div>
            </div>
            {value.feature.map((feature) => (
              <Link to={feature.link} className={styles.card}>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CCMRoadmap;
