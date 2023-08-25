import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [

  {
    title: "AutoStopping RDS with Proxy",
    module: MODULES.ccm,
    icon: "img/icon_ccm.svg",
    description: (
      <>
        This guide walks you through the steps to reduce RDS costs by using AutoStopping rules.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/cloud-costs/cloud-autostopping/vm-reverse-proxy",
  },

  {
    title: "AutoStopping idle VMs behind a reverse proxy",
    module: MODULES.ccm,
    icon: "img/icon_ccm.svg",
    description: (
      <>
        This guide describes how to autostop idle VMs behind a reverse proxy.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/cloud-costs/cloud-autostopping/vm-reverse-proxy",
  },
];

export const CCMList: CardItem[] = [
  {
    title: "Optimizing Kubernetes Cloud Costs 101",
    module: MODULES.ccm,
    icon: "img/icon_ccm.svg",
    description: (
      <>
        This guide will walk through how start to optimize your Kubernetes Costs
        on a public cloud provider.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/cloud-costs/kubernetes",
  },

  {
    title: "AutoStopping RDS with Proxy",
    module: MODULES.ccm,
    icon: "img/icon_ccm.svg",
    description: (
      <>
        This guide walks you through the steps to reduce RDS costs by using AutoStopping rules.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/cloud-costs/cloud-autostopping/vm-reverse-proxy",
  },

  {
    title: "AutoStopping idle VMs behind a reverse proxy",
    module: MODULES.ccm,
    icon: "img/icon_ccm.svg",
    description: (
      <>
        This guide describes how to autostop idle VMs behind a reverse proxy.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/cloud-costs/cloud-autostopping/vm-reverse-proxy",
  },
];

