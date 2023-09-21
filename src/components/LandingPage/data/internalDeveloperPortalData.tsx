import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "Create a basic service onboarding pipeline in Harness IDP",
    module: MODULES.idp,
    icon: "img/icon_idp.svg",
    description: <>Create a basic service onboarding pipeline in Harness IDP</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/internal-developer-portal/service-onboarding-pipeline",
  },
];

export const IDPList: CardItem[] = [
  {
    title: "Create a basic service onboarding pipeline in Harness IDP",
    module: MODULES.idp,
    icon: "img/icon_idp.svg",
    description: <>Create a basic service onboarding pipeline in Harness IDP</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/internal-developer-portal/service-onboarding-pipeline",
  },
  {
    title: "Using short-lived secrets as inputs to service onboarding",
    module: MODULES.idp,
    icon: "img/icon_idp.svg",
    description: <>Using a short-lived secret to trigger a service onboarding pipeline</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/internal-developer-portal/using-secret-as-an-input",
  },
];
