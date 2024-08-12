import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { tag } from "../data/roadmapData";
import Link from "@docusaurus/Link";

const HorizonCard = ({ title, description, tag, module, link, backgroundColorCard }) => {
  const colorMap = new Map([
    [
      "red",
      {
        color: "var(--red-200)",
        textColor: "var(--red-800)",
      },
    ],
    [
      "blue",
      {
        color: "var(--primary-2)",
        textColor: "var(--primary-8)",
      },
    ],
    [
      "yellow",
      {
        color: "var(--yellow-200)",
        textColor: "var(--yellow-800)",
      },
    ],
    [
      "green",
      {
        color: "var(--green-200)",
        textColor: "var(--green-800)",
      },
    ],
    [
      "gray",
      {
        color: "var(--gray-200)",
        textColor: "var(--gray-800)",
      },
    ],
  ]);

  return (
    <Link to={link} className={clsx(styles.card, styles[module])} style={{backgroundColor: backgroundColorCard}}>
      <div className={styles.tag}>
        {tag.length > 0 &&
          tag.map((tagItem: tag) => {
            const colorSet = colorMap.get(tagItem.color);

            //if  colorSet doesnot exists then it means the colors are hex code custom color and not predefined colors
            const textColorTag = colorSet ? colorSet.textColor : tagItem.textColor;
            const backgroundColorTag = colorSet ? colorSet.color : tagItem.color;

            return (
              <p
                style={{
                  color: textColorTag,
                  backgroundColor: backgroundColorTag,
                }}
              >
                {tagItem.value}
              </p>
            );
          })}
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </Link>
  );
};

export default HorizonCard;
