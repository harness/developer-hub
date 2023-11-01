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
  {
    title: "How to Register Your Software Components in Catalog ?",
    module: MODULES.idp,
    icon: "img/icon_idp.svg",
    description:
      "Create a Software Component and register it in Software Catalog.",
    newDoc: true,
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/internal-developer-portal/register-component-in-catalog", 
  },
  {
    title: "How to use a short-lived secret to trigger a service onboarding pipeline?",
    module: MODULES.idp,
    icon: "img/icon_idp.svg",
    description:
      "Create a secret input field for developers to provide their credentials, and then use the credentials as a runtime input for a service onboarding pipeline.",
    newDoc: true,
    type: [docType.Documentation],
    time: "7min",
    link: "/tutorials/internal-developer-portal/using-secret-as-an-input",   
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
