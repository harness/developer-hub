import {
  CardItem,
  docType,
} from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants"

/* Define the cards - start */
// Featured Tutorials
export const featuredTutorials: CardItem[] = [
    {
      title: "Add feature flags to JavaScript app",
      module: MODULES.ff,
      icon: "img/icon_ff.svg",
      description: "It takes two things to build software; teamwork and iteration.",
      newDoc: true,
      type: [docType.Documentation],
      time: "8min",
      link: "/tutorials/manage-feature-flags/typescript-react-first-feature-flag",
    },
  ];
  /* Define the cards - end */