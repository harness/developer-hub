import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "How to create a Sprint Metrics Insight?",
    module: MODULES.sei,
    icon: "img/icon_sei.svg",
    description: <>Learn how to create an Sprint metrics Insights on Harness SEI</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/software-engineering-insights/sprint-metrics-insight",
  },
  {
    title: "How to create a DORA metrics Insight?",
    module: MODULES.sei,
    icon: "img/icon_sei.svg",
    description: <>Learn how to create an Insight to measure DORA metrics on Harness SEI</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/software-engineering-insights/dora-insight",
  },
  {
    title: "How to create a Developer metrics Insight?",
    module: MODULES.sei,
    icon: "img/icon_sei.svg",
    description: <>Learn how to create an Insight to measure developer metrics i.e. SCM activity on Harness SEI</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/software-engineering-insights/developer-insight",
  },
];

export const SEIList: CardItem[] = [
  {
    title: "How to create a Sprint metrics Insight?",
    module: MODULES.sei,
    icon: "img/icon_sei.svg",
    description: <>Learn how to create an Sprint metrics Insights on Harness SEI</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/software-engineering-insights/sprint-metrics-insight",
  },
  {
    title: "How to create a Trellis Scores Insight?",
    module: MODULES.sei,
    icon: "img/icon_sei.svg",
    description: <>Learn how to create an Insight to measure Trellis Scores on Harness SEI</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/software-engineering-insights/trellis-insight",
  },
  {
    title: "How to create a Developer metrics Insight?",
    module: MODULES.sei,
    icon: "img/icon_sei.svg",
    description: <>Learn how to create an Insight to measure developer metrics i.e. SCM activity on Harness SEI</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/software-engineering-insights/developer-insight",
  },
  {
    title: "How to create a DORA metrics Insight?",
    module: MODULES.sei,
    icon: "img/icon_sei.svg",
    description: <>Learn how to create an Insight to measure DORA metrics on Harness SEI</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/software-engineering-insights/dora-insight",
  },
];
