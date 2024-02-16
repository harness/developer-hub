import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the FeaturedList cards here */
/* Module Card lists are defined in the data file for each module */
export const FeaturedList: CardItem[] = [
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