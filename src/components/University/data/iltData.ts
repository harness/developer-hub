import { type, IltCardItem, tileType, cardType } from "../Card";
import { MODULES } from "../../../constants";

export const ilt: IltCardItem[] = [
  {
    title: "Introduction to the Harness Platform",
    module: MODULES.platform,
    type: type.user,
    description:
      "Self-paced hands-on, prerequisite course to all module-specific ILT courses.",
    version: "Enterprise Plan of any module",
    link: "https://university-registration.harness.io/introduction-to-the-harness-platform",
    tileType: tileType.preReq,
    cardType: cardType.ILT,
  },
  {
    title: "Continuous Delivery & GitOps",
    module: MODULES.cd,
    type: type.user,
    description:
      "Deep dive into advanced Continus Delivery concepts using Kubernetes as the deployment infrastructure.",
    version: "Harness CD & GitOps Enterprise Plan",
    link: "https://university-registration.harness.io/ilt-continuous-delivery-gitops",
    tileType: tileType.normal,
    cardType: cardType.ILT,
  },
  {
    title: "Continuous Integration",
    module: MODULES.ci,
    type: type.user,
    description:
      "Deep dive into advanced Continus Integration concepts focused on containerization.",
    version: "Harness CI Enterprise Plan",
    link: "https://university-registration.harness.io/ilt-continuous-integration",
    tileType: tileType.normal,
    cardType: cardType.ILT,
  },
  {
    title: "Security Testing Orchestration",
    module: MODULES.sto,
    type: type.user,
    description:
      "Deep dive into advanced Security Testing Ochestration concepts using multiple scanning technologies.",
    version: "Harness STO Enterprise Plan",
    link: "https://university-registration.harness.io/ilt-security-testing-orchestration",
    tileType: tileType.normal,
    cardType: cardType.ILT,
  },
  {
    title: "Software Engineering Insights",
    module: MODULES.sei,
    type: type.user,
    description:
      "Deep dive into advanced Software Engineering Insights concepts across the SDLC.",
    version: "Harness SEI Enterprise Plan",
    link: "https://university-registration.harness.io/ilt-software-engineering-insights",
    tileType: tileType.normal,
    cardType: cardType.ILT,
  },
];
