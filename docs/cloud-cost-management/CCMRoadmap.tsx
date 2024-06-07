import React from "react";
import { CcmData } from "./roadmapData";
import HorizonCard from "@site/src/components/Roadmap/HorizonCard";

import styles from "@site/src/components/Roadmap/index.module.scss";

const CCMRoadmap = () => {
  return (
    <div className={styles.roadmap}>
      <div className={styles.RoadmapSection}>
        {Object.entries(CcmData).map(([key, value], index) => (
          <div className={styles.section}>
            <div className={styles.sectionDescription}>
              <div className={styles.titleLine}>
                <h4>{key}</h4>
                <p>{value.description}</p>
              </div>
            </div>
            {value.feature.map((feature, index) => (
              <HorizonCard
                module={"ccm"}
                tag={feature.tag}
                title={feature.title}
                description={feature.description}
                link={feature.link}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CCMRoadmap;
