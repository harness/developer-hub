import { certType, CardItem } from "../CertCard";
import { MODULES } from "../../../constants";

export const certifications: CardItem[] = [
    {
      title: "Continuous Delivery & GitOps - Developer",
      module: MODULES.cd,
      type: certType.developer,
      description:
        "Continuous Delivery & GitOps focuses on delivery and deployment of application and infrastructure changes in a safe and sustainable way. Your Continuous Delivery pipeline should automate all of the steps necessary to get your changes into production.",
      version: "Harness CD & GitOps Free/Team Plans",
      link: "/certifications/continuous-delivery?lvl=developer",
      // numberOfCerts: 1,
    },
    {
      title: "Continuous Delivery & GitOps - Administrator",
      module: MODULES.cd,
      type: certType.administrator,
      description:
        "CD Administrator focuses on delivery and deployment of application and infrastructure changes in a safe and sustainable way. Your Continuous Delivery pipeline should automate all of the steps necessary to get your changes into production.",
      version: "Harness CD & GitOps Enterprise Plan",
      link: "/certifications/continuous-delivery?lvl=administrator",
      // numberOfCerts: 1,
    },
    {
      title: "Continuous Delivery & GitOps - Architect (BETA COMING SOON)",
      module: MODULES.cd,
      type: certType.architect,
      description:
        "CD Architect focuses on delivery and deployment of application and infrastructure changes in a safe and sustainable way. Your Continuous Delivery pipeline should automate all of the steps necessary to get your changes into production.",
      version: "Harness CD & GitOps Enterprise Plan",
      link: "/certifications/continuous-delivery?lvl=architect",
      // numberOfCerts: 1,
    },
    {
      title: "Continuous Integration - Developer",
      module: MODULES.ci,
      type: certType.developer,
      description:
        "Continuous Integration focuses on building and testing your code. Your Continuous Integration pipeline should provides a bird's-eye view of all your builds and drill down into specific builds to troubleshoot and analyze the root causes of issues.",
      version: "Harness CI Free/Team Plans",
      link: "/certifications/continuous-integration?lvl=developer",
      // numberOfCerts: 1,
    },
    {
      title: "Continuous Integration - Administrator",
      module: MODULES.ci,
      type: certType.administrator,
      description:
        "CI Administrator focuses on building and testing your code at scale. Your Continuous Integration pipeline should automate all of the steps necessary to build and test your artifacts at scale.",
      version: "Harness CI Enterprise Plan",
      link: "/certifications/continuous-integration?lvl=administrator",
      // numberOfCerts: 1,
    },
  ];
