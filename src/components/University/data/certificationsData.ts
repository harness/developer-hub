import { certType, CardItem } from "../CertCard";
import { MODULES } from "../../../constants";

export const university: CardItem[] = [
  {
    title: "Continuous Delivery & GitOps - Developer",
    module: MODULES.cd,
    type: certType.developer,
    description:
      "CD & GitOps Developer focuses on the fundamental skills to deploy your applications with CD & GitOps projects.",
    version: "Harness CD & GitOps Free Plan",
    link: "/university/continuous-delivery?lvl=developer",
    // numberOfCerts: 1,
  },
  {
    title: "Continuous Delivery & GitOps - Administrator",
    module: MODULES.cd,
    type: certType.administrator,
    description:
      "CD & GitOps Administrator focuses the fundamental skills to deploy and maintain CD & GitOps projects and the overall Harness Platform. This exam builds upon the CD & GitOps Developer Certification.",
    version: "Harness CD & GitOps Enterprise Plan",
    link: "/university/continuous-delivery?lvl=administrator",
    // numberOfCerts: 1,
  },
  {
    title: "Continuous Delivery & GitOps - Architect",
    module: MODULES.cd,
    type: certType.architect,
    description:
      "CD & GitOps Architect focuses on key technical job functions and advanced skills in design, implementation and management of CD & GitOps. This exam builds upon the CD & GitOps Administrator Certification.",
    version: "Harness CD & GitOps Enterprise Plan",
    link: "/university/continuous-delivery?lvl=architect",
    // numberOfCerts: 1,
  },
  {
    title: "Continuous Integration - Developer",
    module: MODULES.ci,
    type: certType.developer,
    description:
      "CI Developer focuses focuses on the fundamental skills of building your code with CI projects.",
    version: "Harness CI Free Plan",
    link: "/university/continuous-integration?lvl=developer",
    // numberOfCerts: 1,
  },
  {
    title: "Continuous Integration - Administrator",
    module: MODULES.ci,
    type: certType.administrator,
    description:
      "CI Administrator focuses on the fundamental skills to deploy and maintain CI projects and the overall Harness Platform. This exam builds upon the CI Developer Certification.",
    version: "Harness CI Enterprise Plan",
    link: "/university/continuous-integration?lvl=administrator",
    // numberOfCerts: 1,
  },
  {
    title: "Continuous Integration - Architect",
    module: MODULES.ci,
    type: certType.architect,
    description:
      "CI Architect focuses focuses on key technical job functions and advanced skills in design, implementation and management of CI. This exam builds upon the CI Administrator Certification",
    version: "Harness CI Enterprise Plan",
    link: "/university/continuous-integration?lvl=architect",
    // numberOfCerts: 1,
  },
  {
    title: "Feature Flags - Developer",
    module: MODULES.ff,
    type: certType.developer,
    description:
      "FF Developer focuses on the fundamental skills to progressivly deploy/toggle your applications with FF projects.",
    version: "Harness FF Free Plan",
    link: "/university/feature-flags?lvl=developer",
    // numberOfCerts: 1,
  },
  {
    title: "Cloud Cost Management - Developer",
    module: MODULES.ccm,
    type: certType.developer,
    description:
      "CCM Developer focuses on the fundamental skills to detect and stop cloud cost anomalies as they occur.",
    version: "Harness CCM Free Plan",
    link: "/university/cloud-cost-management?lvl=developer",
    // numberOfCerts: 1,
  },
  {
    title: "Feature Flags - Administrator",
    module: MODULES.ff,
    type: certType.administrator,
    description:
      "Feature Flag Administrator focuses the fundamental skills to deploy, maintain, and customize feature flags in the Harness platform. This exam builds upon the FF Developer Certification.",
    version: "Harness FF Enterprise Plan",
    link: "/university/feature-flags?lvl=administrator",
    // numberOfCerts: 1,
  },
  {
    title: "Security Testing Orchestration  - Developer",
    module: MODULES.sto,
    type: certType.developer,
    description:
      "STO Developer focuses on the fundamental skills to shift security left in your pipelines.",
    version: "Harness STO Free Plan",
    link: "/university/sto?lvl=developer",
    // numberOfCerts: 1,
  },
  {
    title: "Security Testing Orchestration  - Administrator",
    module: MODULES.sto,
    type: certType.administrator,
    description:
      "STO Administrator focuses on configuring and managing security testing processes within the Harness platform.",
    version: "Harness STO Enterprise Plans",
    link: "/university/sto?lvl=administrator",
    // numberOfCerts: 1,
  },
  {
    title: "Cloud Cost Management  - Administrator",
    module: MODULES.ccm,
    type: certType.administrator,
    description:
      "CCM Administrator focuses on the advanced skills in design, implementation, and management of cloud cost savings.",
    version: "Harness CCM Enterprise Plan",
    link: "/university/cloud-cost-management?lvl=administrator",
    // numberOfCerts: 1,
  },
  {
    title: "Chaos Engineering  - Developer",
    module: MODULES.ce,
    type: certType.developer,
    description:
      "Chaos Developer focuses on the fundamental skills to inject failure into your applications to build resilience.",
    version: "Harness Chaos Free Plan",
    link: "/university/chaos-engineering?lvl=developer",
    // numberOfCerts: 1,
  },
  {
    title: "Internal Developer Portal  - Developer",
    module: MODULES.idp,
    type: certType.developer,
    description:
      "IDP Developer focuses on the fundamental skills to enable developer self-servicing and reducing cognitive overload.",
    version: "Harness IDP Enterprise Plan",
    link: "/university/idp?lvl=developer",
    // numberOfCerts: 1,
  },
  {
    title: "Software Engineering Insights  - Developer",
    module: MODULES.sei,
    type: certType.developer,
    description:
      "SEI Developer focuses on the fundamental skills to discover SDLC bottlenecks and improve developer experience with data.",
    version: "Harness SEI Enterprise Plan",
    link: "/university/sei?lvl=developer",
    // numberOfCerts: 1,
  },
  {
    title: "Infrastructure as Code Management  - Developer",
    module: MODULES.iacm,
    type: certType.developer,
    description:
      "IaCM Developer focuses on the fundamental skills to scale your Terraform / OpenTofu Infrastructure as Code.",
    version: "Harness IaCM Free Plan",
    link: "/university/iacm?lvl=developer",
    // numberOfCerts: 1,
  },
];
