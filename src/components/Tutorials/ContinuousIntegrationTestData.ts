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
            "Use a Run step to include CodeCov code coverage.",
          link: "/tutorials/ci-pipelines/test/codecov",
        },
        {
          title: "Run LocalStack",
          module: MODULES.ci,
          description:
            "Run LocalStack as a Background step.",
          link: "/tutorials/ci-pipelines/test/localstack",
        },
        {
          title: "Run Sauce Connect Proxy",
          module: MODULES.ci,
          description:
            "Run Sauce Connect Proxy as a Background step.",
          link: "/tutorials/ci-pipelines/test/saucelabs-proxy",
        },
        {
          title: "Test a FastAPI project",
          module: MODULES.ci,
          description:
            "Use Harness CI to run tests on a FastAPI project.",
          link: "/tutorials/ci-pipelines/test/fastapi",
        },
      ],
    },
  ];
  /* Define the cards - end */