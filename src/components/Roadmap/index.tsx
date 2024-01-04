import React, { useEffect, useState } from "react";
import DocCard, { Horizon } from "./Card/Card";
import styles from "./index.module.scss";
import { CardData } from "./data/carddata";
const Roadmap = () => {
  const [horizon, setHorizon] = useState<Horizon>(null);
  const currentURL = window.location.href;
  const url = new URL(currentURL);
  const target = url.hash ? url.hash.slice(1) : "cd";
  useEffect(() => {
    const foundCard = CardData.find((card) => card.module === target);
    if (foundCard) {
      setHorizon(foundCard.horizon);
    }
  }, [target]);

  return (
    <>
      <div className={styles.main}>
        {CardData.map((card, index) => {
          return (
            <DocCard
              key={index}
              title={card.title}
              horizon={card.horizon}
              module={card.module}
            />
          );
        })}
      </div>

      <div className={styles.RoadmapSection}>
        <div className={styles.section}>
          <div className={styles.sectionDescription}>
            <div className={styles.titleLine}>
              <h4>3 Mos</h4>
              <p>3 months</p>
            </div>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          {horizon &&
            horizon.threemos.map((feature) => (
              <div className={styles.features}>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.section}>
          <div className={styles.sectionDescription}>
            <div className={styles.titleLine}>
              <h4>9 Mos</h4>
              <p>9 months</p>
            </div>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          {horizon &&
            horizon.ninemos.map((feature) => (
              <div className={styles.features}>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.section}>
          <div className={styles.sectionDescription}>
            <div className={styles.titleLine}>
              <h4>12 Mos+</h4>
              <p>12 months+</p>
            </div>
          </div>
          {horizon &&
            horizon.twelvemos.map((feature) => (
              <div className={styles.features}>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Roadmap;
