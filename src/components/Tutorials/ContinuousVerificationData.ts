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
          title: "Verify Kubernetes Deployment with Prometheus ",
          module: MODULES.cd,
          description:
            "Verify a Spring Boot based Kubernetes Deployment with Prometheus Metrics.",
          link: "/tutorials/cd-pipelines/continuous-verification/prometheus",
        },
      ],
    },
  ];
  /* Define the cards - end */