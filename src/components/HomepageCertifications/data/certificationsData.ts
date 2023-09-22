

import { MODULES } from "../../../constants";
import  { CardItem } from "../../Certifications/CertCard";
// Define the certs section cards here
export const certifications: CardItem[] = [
  {
    title: "Continuous Delivery & GitOps Certifications",
    module: MODULES.cd,
    description:
      "Continuous Delivery & GitOps focuses on delivery and deployment of application and infrastructure changes in a safe and sustainable way.",
    link: "/certifications/continuous-delivery",
    numberOfCerts: 3,
  },
  {
    title: "Continuous Integrations Certifications",
    module: MODULES.ci,
    description:
      "Continuous Integration focuses on building and testing your code. Your Continuous Integration pipeline should provides a bird's-eye view and analyze the root causes of issues.",
    link: "/certifications/continuous-integration",
    numberOfCerts: 3,
  },
  // {
  //   title: "Feature Flags Certifications",
  //   module: MODULES.ff,
  //   description:
  //     "Drastically reduce rollbacks, deploy faster with less risk,spend more time building and coding, and less time fixing production with Progressive Delivery.",
  //   link: "/certifications/feature-flags",
  //   numberOfCerts: 3,
  // },
  // {
  //   title: "Cloud Cost Management Certifications",
  //   module: MODULES.ccm,
  //   description:
  //     " Save time, reduce effort, and save on your cloud bill with intelligent cloud cost automation.Detect and stop cloud cost anomalies as they occur, to avoid unpleasant billing surprises with a FinOps approach.",
  //   link: "/certifications/cloud-cost-management",
  //   numberOfCerts: 3,
  // },
  // {
  //   title: "Chaos Engineering Certifications",
  //   module: MODULES.ce,
  //   description: "Comming Soon",
  //   link: "/certifications/chao-engineering",
  //   numberOfCerts: 3,
  // },
];