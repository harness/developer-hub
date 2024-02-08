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
          title: "AWS Lambda",
          module: MODULES.cd,
          description:
            "Deploy a AWS Lambda function.",
          link: "/tutorials/cd-pipelines/serverless/aws-lambda",
        },
        {
          title: "Google Cloud Functions",
          module: MODULES.cd,
          description:
            "Deploy a Google Cloud Function.",
          link: "/tutorials/cd-pipelines/serverless/gcp-cloud-func",
        },
      ],
    },
  ];
  /* Define the cards - end */