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
          title: "Codebase scans with Semgrep",
          module: MODULES.cd,
          description:
            "Set up a pipeline that can repos in a wide variety of languages.",
          link: "/tutorials/security-tests/quickstarts/sast-scan-semgrep",
        },
        {
          title: "Container image scans with Aqua Trivy",
          module: MODULES.cd,
          description:
            "Set up a pipeline to scan container images.",
          link: "/tutorials/security-tests/quickstarts/container-scan-aqua-trivy",
        },
        {
          title: "Trigger automatic scans based on GitLab merge requests",
          module: MODULES.cd,
          description:
            "Launch pipeline builds and scans automatically based on GitLab merge requests.",
          link: "/tutorials/security-tests/quickstarts/gitlab-ci-integration.md",
        },
      ],
    },
  ];
  /* Define the cards - end */
