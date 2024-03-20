import { iltType, IltCardItem } from "../IltCard";
import { MODULES } from "../../../constants";

export const ilt: IltCardItem[] = [
  {
    title: "Introduction to the Harness Platform",
    module: MODULES.platform,
    iltType: iltType.user,
    description:
      "Self-paced, prerequisite course to all module-specific ILT courses.",
    version: "Enterprise Plan of any module",
    link: "https://university-registration.harness.io/introduction-to-the-harness-platform",
  },
  {
    title: "Continuous Delivery & GitOps",
    module: MODULES.cd,
    iltType: iltType.user,
    description:
      "Deep dive into advanced Continus Delivery concepts using Kubernetes as the deployment infrastructure.",
    version: "Harness CD & GitOps Enterprise Plan",
    link: "https://university-registration.harness.io/ilt-continuous-delivery-gitops",
  },
];
