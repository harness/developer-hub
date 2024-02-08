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
          title: "Docker Hub Kubernetes CI/CD Pipeline",
          module: MODULES.cd,
          description:
            "Execute a GitOps-driven CI/CD pipeline.",
          link: "/tutorials/cd-pipelines/unified-cicd/e2e-pipeline",
        },
        {
          title: "GAR GKE CI/CD Pipeline",
          module: MODULES.cd,
          description:
            "Build and push to GAR and deploy to GKE.",
          link: "/tutorials/cd-pipelines/unified-cicd/gar-gke-pipeline",
        },
      ],
    },
  ];
  /* Define the cards - end */