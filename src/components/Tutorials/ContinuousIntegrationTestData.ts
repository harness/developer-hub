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
          title: "Publish Allure Report",
          module: MODULES.ci,
          description:
            "Publish an Allure Report",
          link: "/tutorials/build-code/Test/ci-publish-allure-report",
        },
        {
          title: "Run LocalStack",
          module: MODULES.ci,
          description:
            "Run LocalStack as a Background Step",
          link: "/tutorials/build-code/Test/ci-localstack-background-step",
        },
        {
          title: "Run Sauce Connect Proxy",
          module: MODULES.ci,
          description:
            "Run Sauce Connect Proxy as a Background Step",
          link: "/build-code/Test/ci-saucelabs-background-step",
        },
      ],
    },
  ];
  /* Define the cards - end */