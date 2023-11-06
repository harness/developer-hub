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
        {
          title: "Deploy Your Own Microservice Application",
          module: MODULES.cd,
          description:
            "Deploy your microservice application onto a Kubernetes cluster.",
          link: "/tutorials/cd-pipelines/kubernetes/ownapp",
        },
        {
          title: "Secure Container Image Signing with Cosign and OPA",
          module: MODULES.cd,
          description:
            "Secure container image signing with Cosign and OPA before Kubernetes deployment.",
          link: "/tutorials/cd-pipelines/kubernetes/cosign-opa",
        },
      ],
    },
  ];
  /* Define the cards - end */
