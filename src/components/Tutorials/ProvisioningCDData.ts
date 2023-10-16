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
          title: "CloudFormation",
          module: MODULES.cd,
          description:
            "Provision deployment infrastructure using CF",
          link: "/tutorials/cd-pipelines/infra-provisioning/cloudformation",
        },
        // {
        //   title: "Google Cloud Functions",
        //   module: MODULES.cd,
        //   description:
        //     "Deploy a Google Cloud Function.",
        //   link: "/tutorials/cd-pipelines/serverless/gcp-cloud-func",
        // },
      ],
    },
  ];
  /* Define the cards - end */