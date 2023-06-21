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
          link: "/tutorials/cd-pipelines/kubernetes/helm-chart",
        },
        {
          title: "Deploy Kubernetes Manifests",
          module: MODULES.cd,
          description:
            "Deploy a Kubernetes Manifest onto your Kubernetes cluster.",
          link: "/tutorials/cd-pipelines/kubernetes/manifest",
        },
        {
          title: "Deploy using Kustomize",
          module: MODULES.cd,
          description:
            "Deploy to your Kubernetes cluster using Kustomize.",
          link: "/tutorials/cd-pipelines/kubernetes/kustomize",
        },
      ],
    },
  ];
  /* Define the cards - end */