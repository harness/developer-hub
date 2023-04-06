import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "Install Delegate",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: <>Install a Docker or Kubernetes Delegate.</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/install-delegate",
  },
];

export const PlatformList: CardItem[] = [
  {
    title: "Install CD Community Edition",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>Install the free CD Community Edition.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/install-cd-community-edition",
  },
  {
    title: "Install Delegate",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>Install a Kubernetes or Docker Delegate on your infrastructure.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/install-delegate",
  },
  {
    title: "Customize the Delegate to Run Your Favorite Third-Party Tools",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>
        Customize the Delegate to run any of your favorite tools Such as Helm,
        Terraform, AWS CLI, etc.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/platform/customize-delegate",
  },
  {
    title: "Onboard with Terraform",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>
        Automate lifecycle management of orgs, projects, services, environments,
        connectors and pipelines using the Harness Terraform Provider.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/onboard-terraform-provider",
  },
  {
    title: "Install Harness Delegate on GKE with Workload Identity",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>
        Deploy Harness Delegate onto Workload Identity-enabled GKE.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/platform/gke-workload-identity",
  },
];
