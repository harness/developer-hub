import React from "react";
import Link from "@docusaurus/Link";
import { CcmData, Feature } from "./roadmapData";
import roadmapStyles from "@site/src/components/Roadmap/index.module.scss";
import styles from "./styles.module.scss";

const legendList = [
  { backgroundColor: "var(--green-100)", label: "Delivered on Time" },
  { backgroundColor: "var(--purple-100)", label: "Delivery delayed" },
  { backgroundColor: "var(--yellow-100)", label: "Active Development" },
  { backgroundColor: "var(--blue-100)", label: "Future Development" },
];

const CCMRoadmap = () => {
  return (
    <>
      <div className={roadmapStyles.roadmap}>
        <div className={styles.legends}>
          {legendList.map((item) => (
            <div className={styles.legendCtn}>
              <div
                className={styles.legend}
                style={{ backgroundColor: item.backgroundColor }}
              />
              <div>{item.label}</div>
            </div>
          ))}
        </div>
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
                <Link
                  to={feature.link}
                  className={styles.card}
                  style={{ backgroundColor: feature.backgroundColor }}
                >
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CCMRoadmap;
