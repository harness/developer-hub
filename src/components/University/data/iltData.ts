import { iltType, IltCardItem } from "../IltCard";
import { MODULES } from "../../../constants";

export const ilt: IltCardItem[] = [
  {
    title: "Continuous Delivery & GitOps",
    module: MODULES.cd,
    iltType: iltType.user,
    description:
      "Learn how to deploy your applications on Kubernetes and other infrastructure platforms.",
    version: "Harness CD & GitOps Enterprise Plan",
    link: "/university/instructor-led-training/continuous-delivery",
  },
];
