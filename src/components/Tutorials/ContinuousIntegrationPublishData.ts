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
          title: "Publish to Amazon ECR",
          module: MODULES.ci,
          description:
            "Publish an Image to an Amazon Elastic Container Registry.",
          link: "/tutorials/ci-pipelines/publish/amazon-ecr",
        },
        {
          title: "Publish to Google GAR",
          module: MODULES.ci,
          description:
            "Publish an Image to a Google Artifact Registry.",
          link: "/tutorials/ci-pipelines/publish/google-gar",
        },
        {
          title: "Publish to the Artifacts tab",
          module: MODULES.ci,
          description:
            "Publish any URL to the Artifacts tab.",
          link: "/tutorials/ci-pipelines/publish/artifacts-tab",
        },
      ],
    },
  ];
  /* Define the cards - end */