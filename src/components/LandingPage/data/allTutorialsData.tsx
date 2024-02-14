import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the FeaturedList cards here */
/* Module Card lists are defined in the data file for each module */
export const FeaturedList: CardItem[] = [
  {
    title: "GAR GKE CI/CD Pipeline.",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Build and push to GAR and deploy to GKE.</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "30 min",
    link: "/tutorials/cd-pipelines/unified-cicd/gar-gke-pipeline",
  },
  {
    title: "Deploy a Kubernetes Helm Chart",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy a Helm Chart onto your Kubernetes cluster.</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "8 min",
    link: "/tutorials/cd-pipelines/kubernetes/helm-chart",
  },
  {
    title: "Get started with the fastest CI on the planet",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Get started with Harness CI and explore some of the features that make
        it four times faster than the leading competitor.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10 min",
    link: "/docs/continuous-integration/get-started/tutorials",
  },
  {
    title: "Publish to the Artifacts tab",
    module: MODULES.ci,
    description:
      "Publish any URL to the Artifacts tab.",
    link: "/docs/continuous-integration/use-ci/build-and-upload-artifacts/artifacts-tab",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg"
  },
];