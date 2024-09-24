import { type, IltCardItem, tileType, cardType } from "../Card";
import { MODULES } from "../../../constants";

export const spt: IltCardItem[] = [
   {
    title: "Harness Platform Fundamentals",
    module: MODULES.platform,
     type: type.user,
     description:
       "Self-paced video course introducing the Harness Platform.",
     version: "Free/Teams Plans of any module",
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
     version: "Harness CD & GitOps Free/Team Plans",
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
     version: "Harness CI Free/Team Plans",
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
     version: "Harness STO Enterprise Plan",
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
     version: "Harness SEI Enterprise Plan",
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
     version: "Harness CCM Free/Team Plans",
     link: "https://university-registration.harness.io/self-paced-training-harness-cloud-cost-management",
     tileType: tileType.normal,
     cardType: cardType.SPT,
   },
];
