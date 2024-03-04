import { MODULES } from "../../../constants";
import { CardItem } from "../../University/CertCard";
// Define the certs section cards here
export const university: CardItem[] = [
  {
    title: "Continuous Delivery & GitOps",
    module: MODULES.cd,
    description:
      "Continuous Delivery & GitOps focuses on delivery and deployment of application and infrastructure changes in a safe and sustainable way.",
    link: "/university/continuous-delivery",
    numberOfCerts: 3,
  },
  {
    title: "Continuous Integrations",
    module: MODULES.ci,
    description:
      "Continuous Integration focuses on building and testing your code. Your Continuous Integration pipeline should provides a bird's-eye view and analyze the root causes of issues.",
    link: "/university/continuous-integration",
    numberOfCerts: 3,
  },

  {
    title: "Feature Flags",
    module: MODULES.ff,
    description:
      "Drastically reduce rollbacks, deploy faster with less risk,spend more time building and coding, and less time fixing production with Progressive Delivery.",
    link: "/university/feature-flags",
    numberOfCerts: 2,
  },
  {
    title: "Cloud Cost Management",
    module: MODULES.ccm,
    description:
      "Save time, reduce effort, and save on your cloud bill with intelligent cloud cost automation.Detect and stop cloud cost anomalies as they occur, to avoid unpleasant billing surprises with a FinOps approach.",
    link: "/university/cloud-cost-management",
    numberOfCerts: 1,
  },
  {
    title: "Security Testing Orchestration",
    module: MODULES.sto,
    description:
      "Seamlessly integrate security scanners and orchestrate tests anywhere across your build pipelines.",
    link: "/university/sto",
    numberOfCerts: 2,
  },
  {
    title: "Chaos Engineering",
    module: MODULES.ce,
    description:
      "Discover how your applications stand up to real-world failure scenarios.",
    link: "/university/chaos-engineering",
    numberOfCerts: 1,
  },
];
