import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "SLO Management with Prometheus",
    module: MODULES.srm,
    icon: "img/icon_srm.svg",
    description: (
      <>
        Introducing SLOs and how to measure and manage your SLOs leveraging
        Prometheus.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/service-reliability/slo-prometheus",
  },
];

export const SRMList: CardItem[] = [
  {
    title: "SLO Management with Prometheus",
    module: MODULES.srm,
    icon: "img/icon_srm.svg",
    description: (
      <>
        Introducing SLOs and how to measure and manage your SLOs leveraging
        Prometheus.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/service-reliability/slo-prometheus",
  },
  {
    title: "Java Error Tracking",
    module: MODULES.srm,
    icon: "img/icon_srm.svg",
    description: (
      <>
        Finding and fixing caught, uncaught, and swallowed Java exceptions.
        Learn the process and find the right tooling.
      </>
    ),
    newDoc: false,
    type: [docType.Interactive, docType.Video],
    time: "10min",
    link: "/tutorials/service-reliability/java-error-tracking",
  },
];
