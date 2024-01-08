import React, { useEffect, useRef, useState } from "react";
import DocCard, { Horizon, Props } from "./Card/Card";
import styles from "./index.module.scss";
import { CardData } from "./data/carddata";

const Roadmap = () => {
  const [horizon, setHorizon] = useState<Horizon>(null);
  const [cards, setCards] = useState(CardData);
  const [key, setKey] = useState({});
  const handleCardClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    e.currentTarget.focus();

    setHorizon(null);
    setKey(null);
    const updatedCards = cards.map((card, i) => {
      if (i === index) {
        return {
          ...card,
          isActive: true,
        };
      }
      return {
        ...card,
        isActive: false,
      };
    });
    setCards(updatedCards);
  };

  useEffect(() => {
    cards.map((card) => {
      if (card.isActive && card.horizon) {
        setHorizon(card.horizon);
        const keys = Object.keys(card.horizon);
        setKey(keys);
      }
    });
  }, [cards]);

  useEffect(() => {
    cards.map((card) => {
      if (card.module == "cd") {
        setHorizon(card.horizon);
        const keys = Object.keys(card.horizon);
        setKey(keys);
      }
    });
    const cd = document.getElementById("cd");
    console.log(cd);

    cd.focus();
  }, []);

  return (
    <>
      <div className={styles.main}>
        {CardData.map((card, index) => {
          return (
            <div key={index} onClick={(e) => handleCardClick(e, index)}>
              <DocCard
                isActive={card.isActive}
                title={card.title}
                horizon={card.horizon}
                module={card.module}
              />
            </div>
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
