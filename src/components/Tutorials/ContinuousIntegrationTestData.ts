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
          title: "Code coverage with CodeCov",
          module: MODULES.ci,
          description:
            "Wse a Run step to include CodeCov code coverage.",
          link: "/tutorials/build-code/test/codecov",
        },
        {
          title: "Publish Allure Report",
          module: MODULES.ci,
          description:
            "Publish an Allure Report.",
          link: "/tutorials/build-code/test/allure-report",
        },
        {
          title: "Run LocalStack",
          module: MODULES.ci,
          description:
            "Run LocalStack as a Background Step.",
          link: "/tutorials/build-code/test/localstack",
        },
        {
          title: "Run Sauce Connect Proxy.",
          module: MODULES.ci,
          description:
            "Run Sauce Connect Proxy as a Background Step",
          link: "/tutorials/build-code/test/saucelabs-proxy",
        },
      ],
    },
  ];
  /* Define the cards - end */