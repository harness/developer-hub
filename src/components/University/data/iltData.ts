import { iltType, IltCardItem } from "../IltCard";
import { MODULES } from "../../../constants";

export const ilt: IltCardItem[] = [
  {
    title: "Continuous Delivery & GitOps",
    module: MODULES.cd,
    iltType: iltType.user,
    description:
      "Deep dive into advanced Continus Delivery concepts focusing on Kubernetes.",
    version: "Harness CD & GitOps Enterprise Plan",
    link: "https://university-registration.harness.io/ilt-continuous-delivery-gitops",
  },
  {
    title: "Introduction to the Harness Platform",
    module: MODULES.platform,
    iltType: iltType.user,
    description:
      "Self-paced, asynchronous course as a recomended prerequisite to ILT offerings.",
    version: "Harness Enterprise Plan",
    link: "https://university-registration.harness.io/introduction-to-the-harness-platform",
  },
];
