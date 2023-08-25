import { certType, CardItem } from "../CertCard";
import { MODULES } from "../../../constants";

export const certifications: CardItem[] = [
    {
      title: "Continuous Delivery & GitOps - Developer",
      module: MODULES.cd,
      type: certType.developer,
      description:
      "CD & GitOps Developer focuses on the fundamental skills to deploy your applications with CD & GitOps projects.",
      version: "Harness CD & GitOps Free/Team Plans",
      link: "/certifications/continuous-delivery?lvl=developer",
      // numberOfCerts: 1,
    },
    {
      title: "Continuous Delivery & GitOps - Administrator",
      module: MODULES.cd,
      type: certType.administrator,
      description:
        "CD & GitOps Administrator focuses the fundamental skills to deploy and maintain CD & GitOps projects and the overall Harness Platform. This exam builds upon the CD & GitOps Developer Certification.",
      version: "Harness CD & GitOps Enterprise Plan",
      link: "/certifications/continuous-delivery?lvl=administrator",
      // numberOfCerts: 1,
    },
    {
      title: "Continuous Delivery & GitOps - Architect",
      module: MODULES.cd,
      type: certType.architect,
      description:
      "CD & GitOps Architect focuses on key technical job functions and advanced skills in design, implementation and management of CD & GitOps. This exam builds upon the CD & GitOps Administrator Certification.",
      version: "Harness CD & GitOps Enterprise Plan",
      link: "/certifications/continuous-delivery?lvl=architect",
      // numberOfCerts: 1,
    },
    {
      title: "Continuous Integration - Developer",
      module: MODULES.ci,
      type: certType.developer,
      description:
        "CI Developer focuses focuses on the fundamental skills of building your code with CI projects.",
      version: "Harness CI Free/Team Plans",
      link: "/certifications/continuous-integration?lvl=developer",
      // numberOfCerts: 1,
    },
    {
      title: "Continuous Integration - Administrator",
      module: MODULES.ci,
      type: certType.administrator,
      description:
        "CI Administrator focuses on the fundamental skills to deploy and maintain CI projects and the overall Harness Platform. This exam builds upon the CI Developer Certification.",
      version: "Harness CI Enterprise Plan",
      link: "/certifications/continuous-integration?lvl=administrator",
      // numberOfCerts: 1,
    },
    {
      title: "Continuous Integration - Architect (BETA COMING SOON)",
      module: MODULES.ci,
      type: certType.architect,
      description:
        "CI Architect focuses focuses on key technical job functions and advanced skills in design, implementation and management of CI. This exam builds upon the CI Administrator Certification",
      version: "Harness CI Enterprise Plan",
      link: "/certifications/continuous-integration?lvl=architect",
      // numberOfCerts: 1,
    },
  ];
