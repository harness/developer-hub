import { type, IltCardItem, tileType, cardType } from "../Card";
import { MODULES } from "../../../constants";

export const spt: IltCardItem[] = [
   {
    title: "Harness Platform Fundamentals",
    module: MODULES.platform,
     type: type.user,
     description:
       "Self-paced video course introducing the Harness Platform.",
     version: "Free Plans of any module",
     link: "https://university-registration.harness.io/self-paced-training-platform-fundamentals",
     tileType: tileType.preReq,
     cardType: cardType.SPT,
   },
   {
    title: "Continuous Delivery & GitOps",
    module: MODULES.cd,
     type: type.user,
     description:
       "Self-paced video course introducing Harness Continuous Delivery & GitOps.",
     version: "Harness CD & GitOps Free Plans",
     link: "https://university-registration.harness.io/self-paced-training-harness-continuous-delivery-gitops",
     tileType: tileType.normal,
     cardType: cardType.SPT,
   },
   {
    title: "Continuous Integration",
    module: MODULES.ci,
     type: type.user,
     description:
       "Self-paced video course introducing Harness Continuous Integration.",
     version: "Harness CI Free Plans",
     link: "https://university-registration.harness.io/self-paced-training-harness-continuous-integration",
     tileType: tileType.normal,
     cardType: cardType.SPT,
   },
   {
    title: "Security Testing Orchestration",
    module: MODULES.sto,
     type: type.user,
     description:
       "Self-paced video course introducing Harness Security Testing Orchestration.",
     version: "Harness STO Paid Plans",
     link: "https://university-registration.harness.io/self-paced-training-harness-security-testing-orchestration",
     tileType: tileType.normal,
     cardType: cardType.SPT,
   },
   {
    title: "Software Engineering Insights",
    module: MODULES.sei,
     type: type.user,
     description:
       "Self-paced video course introducing Harness Software Engineering Insights.",
     version: "Harness SEI Paid Plans",
     link: "https://university-registration.harness.io/self-paced-training-harness-software-engineering-insights",
     tileType: tileType.normal,
     cardType: cardType.SPT,
   },
   {
    title: "Cloud Cost Management",
    module: MODULES.ccm,
     type: type.user,
     description:
       "Self-paced video course introducing Harness Cloud Cost Management.",
     version: "Harness CCM Free Plans",
     link: "https://university-registration.harness.io/self-paced-training-harness-cloud-cost-management",
     tileType: tileType.normal,
     cardType: cardType.SPT,
   },
   {
    title: "Infrastructure as Code Management",
    module: MODULES.iacm,
     type: type.user,
     description:
       "Self-paced video course introducing Harness Infrastructure as Code Management.",
     version: "Harness IaCM Free Plans",
     link: "https://university-registration.harness.io/self-paced-training-harness-infrastructure-as-code-management",
     tileType: tileType.normal,
     cardType: cardType.SPT,
   },
   {
    title: "Internal Developer Portal",
    module: MODULES.idp,
     type: type.user,
     description:
       "Self-paced video course introducing Harness Internal Developer Portal.",
     version: "Harness IDP Paid Plans",
     link: "https://university-registration.harness.io/self-paced-training-harness-internal-developer-portal",
     tileType: tileType.normal,
     cardType: cardType.SPT,
   },
   {
    title: "Chaos Engineering",
    module: MODULES.ce,
     type: type.user,
     description:
       "Self-paced video course introducing Harness Chaos Engineering.",
     version: "Harness CE Free Plans",
     link: "https://university-registration.harness.io/self-paced-training-harness-chaos-engineering",
     tileType: tileType.normal,
     cardType: cardType.SPT,
   },
   {
    title: "Supply Chain Security",
    module: MODULES.ssca,
     type: type.user,
     description:
       "Self-paced video course introducing Harness Supply Chain Security.",
     version: "Harness SCS Paid Plans",
     link: "https://university-registration.harness.io/self-paced-training-harness-supply-chain-security",
     tileType: tileType.normal,
     cardType: cardType.SPT,
   },
     {
    title: "Code Repository",
    module: MODULES.code,
     type: type.user,
     description:
       "Self-paced video course introducing Harness Code Repository.",
     version: "Harness Paid Plans",
     link: "https://university-registration.harness.io/self-paced-training-harness-code-repository",
     tileType: tileType.normal,
     cardType: cardType.SPT,
   },
];
