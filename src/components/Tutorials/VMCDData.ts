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
          title: "AWS",
          module: MODULES.cd,
          description:
            "Deploy a traditional application to AWS EC2 VMs.",
          link: "/tutorials/cd-pipelines/vm/aws",
        },
        /*
        {
          title: "Google Cloud Compute Engine",
          module: MODULES.cd,
          description:
            "Deploy a traditional application to Google Cloud Compute Engine VMs.",
          link: "/tutorials/cd-pipelines/vm/gcp",
        },
        */
        {
          title: "Physical Data Center",
          module: MODULES.cd,
          description:
            "Deploy a traditional application to Physical Data Centers.",
          link: "/tutorials/cd-pipelines/vm/pdc",
        },
      
      ],
    },
  ];
  /* Define the cards - end */