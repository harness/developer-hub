import {
  CardItem,
  CardSections,
  docType,
} from "../LandingPage/TutorialCard";
import { MODULES } from "../../constants";

/* Define the cards - start */

  // Docs
  export const docsCards: CardSections = [
    {
      name: "",
      description:
        "",
      list: [
        {
          title: "Deploy a Helm Chart",
          module: MODULES.cd,
          description:
            "Deploy a Helm Chart onto your Kubernetes cluster.",
          link: "/tutorials/deploy-services/kubernetes/helm-chart",
        },
        {
          title: "Deploy a Kubernetes Manifest",
          module: MODULES.cd,
          description:
            "Deploy a Kubernetes Manifest onto your Kubernetes cluster.",
          link: "/tutorials/deploy-services/kubernetes/manifest",
        },
      ],
    },
  ];
  /* Define the cards - end */