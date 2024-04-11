import { iltType, IltCardItem, tileType } from "../IltCard";
import { MODULES } from "../../../constants";

//card will displayed on the basis of thier priority , If cards have same propirty then they will be displayed on the basis of thier order in ILT array

export const ilt: IltCardItem[] = [
  {
    title: "Introduction to the Harness Platform",
    module: MODULES.platform,
    iltType: iltType.user,
    description:
      "Self-paced, prerequisite course to all module-specific ILT courses.",
    version: "Enterprise Plan of any module",
    link: "https://university-registration.harness.io/introduction-to-the-harness-platform",
    tileType: tileType.preReq,
  },
  {
    title: "Continuous Delivery & GitOps",
    module: MODULES.cd,
    iltType: iltType.user,
    description:
      "Deep dive into advanced Continus Delivery concepts using Kubernetes as the deployment infrastructure.",
    version: "Harness CD & GitOps Enterprise Plan",
    link: "https://university-registration.harness.io/ilt-continuous-delivery-gitops",
    tileType: tileType.normal,
  },
  {
    title: "Continuous Integration",
    module: MODULES.ci,
    iltType: iltType.user,
    description: "Deep dive into advanced Continus Integration concepts focused on containerization.",
    version: "Harness CI Enterprise Plan",
    link: "https://university-registration.harness.io/ilt-continuous-integration",
    tileType: tileType.normal,
  },
];
