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
          title: "Amazon ECR",
          module: MODULES.ci,
          description:
            "Publish an Image to an Amazon ECR Registry.",
          link: "/tutorials/build-code/publish/amazon-ecr",
        },
        {
          title: "Google GAR",
          module: MODULES.ci,
          description:
            "Publish an Image to a Google GAR Registry.",
          link: "/tutorials/build-code/publish/google-gar",
        },
      ],
    },
  ];
  /* Define the cards - end */