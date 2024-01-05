import React, { useEffect, useState } from "react";
import DocCard, { Horizon } from "./Card/Card";
import styles from "./index.module.scss";
import { CardData } from "./data/carddata";
const Roadmap = () => {
  const [horizon, setHorizon] = useState<Horizon>(null);
  const [key, setKey] = useState({});
  const [target, setTarget] = useState("");
  console.log(target);

  useEffect(() => {
    const foundCard = CardData.find((card) => card.module === target);
    setHorizon(null);
    if (foundCard && foundCard.horizon) {
      setHorizon(foundCard.horizon);
      const keys = Object.keys(foundCard.horizon);
      setKey(keys);
    }
  }, [target]);
  useEffect(() => {
    setTarget(localStorage.getItem("roadmap"));
  }, [localStorage.getItem("roadmap")]);
  useEffect(() => {
    localStorage.setItem("roadmap", "cd");
  }, []);

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

      {horizon && (
        <div className={styles.RoadmapSection}>
          <div className={styles.section}>
            <div className={styles.sectionDescription}>
              <div className={styles.titleLine}>
                <h4>{key[0]}</h4>
              </div>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
            {Object.keys(horizon).length > 0 &&
              horizon[Object.keys(horizon)[0]].map((feature, index) => (
                <div key={index} className={styles.features}>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
          </div>
          <div className={styles.verticalLine}></div>
          <div className={styles.section}>
            <div className={styles.sectionDescription}>
              <div className={styles.titleLine}>
                <h4>{key[1]}</h4>
              </div>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
            {Object.keys(horizon).length > 0 &&
              horizon[Object.keys(horizon)[1]].map((feature, index) => (
                <div key={index} className={styles.features}>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
          </div>
          <div className={styles.verticalLine}></div>
          <div className={styles.section}>
            <div className={styles.sectionDescription}>
              <div className={styles.titleLine}>
                <h4>{key[2]}</h4>
              </div>
            </div>
            {Object.keys(horizon).length > 0 &&
              horizon[Object.keys(horizon)[2]].map((feature, index) => (
                <div key={index} className={styles.features}>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Roadmap;
