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
          title: "Secret and Secret Manager",
          module: MODULES.cd,
          description:
            "Secret and Secret Manager.",
          link: "/tutorials/cd-pipelines/secret-and-secret-managers/secret-secretmanager",
        },
      ],
    },
  ];
  /* Define the cards - end */