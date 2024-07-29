import { MODULES } from "../../../constants";
import { CardItem } from "../../University/CertCard";
// Define the certs section cards here



// CardItem = {
//   title: string;
//   module: MODULES;
//   type?: certType;
//   description: JSX.Element | string;
//   version?: string;
//   link?: string;
//   thumb?: boolean;
//   numberOfCerts?: number;
//   ILT_available?: boolean;
//   SPT_available?: boolean;
// };

export const university: CardItem[] = [
  {
    title: "Continuous Delivery & GitOps",
    module: MODULES.cd,
    description:
      "Continuous Delivery & GitOps focuses on delivery and deployment of application and infrastructure changes in a safe and sustainable way.",
    link: "/university/continuous-delivery",
    numberOfCerts: 3,
    ILT_available: true,
    SPT_available: true,
  },
  {
    title: "Continuous Integrations",
    module: MODULES.ci,
    description:
      "Continuous Integration focuses on building and testing your code. Your Continuous Integration pipeline should provides a bird's-eye view and analyze the root causes of issues.",
    link: "/university/continuous-integration",
    numberOfCerts: 3,
    ILT_available: true,
    SPT_available: true,
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
    numberOfCerts: 2,
    SPT_available: true,
  },
  {
    title: "Security Testing Orchestration",
    module: MODULES.sto,
    description:
      "Seamlessly integrate security scanners and orchestrate tests anywhere across your build pipelines.",
    link: "/university/sto",
    numberOfCerts: 2,
    ILT_available: true,
    SPT_available: true,
  },
  {
    title: "Chaos Engineering",
    module: MODULES.ce,
    description:
      "Discover how your applications stand up to real-world failure scenarios.",
    link: "/university/chaos-engineering",
    numberOfCerts: 1,
  },
  {
    title: "Software Engineering Insights",
    module: MODULES.sei,
    description:
      "Discover SDLC bottlenecks, assess team productivity, and improve developer experience.",
    link: "/university/sei",
    SPT_available: true,
    ILT_available: true,
  },
  {
    title: "Internal Developer Portal",
    module: MODULES.idp,
    description:
      "Eliminate cognitive overload by letting developers self-service their flows like new service onboarding.",
    link: "/university/idp",
    numberOfCerts: 1,
  },
  
];
