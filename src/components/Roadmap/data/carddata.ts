import { Props as CardItems } from "../Card/Card";
import { MODULES } from "../../../constants";
import { CdData } from "./cdData";
import { CiData } from "./ciData";

export const CardData: CardItems[] = [
  {
    title: "Continuous Delivery & GitOps",
    description: "Allowing for String List in a Repeat Startegy",
    module: MODULES.cd,
    horizon: CdData,
  },
  {
    title: "Continuous Integration",
    description: "Allowing for String List in a Repeat Startegy",
    module: MODULES.ci,
    horizon: CiData,
  },
  {
    title: "Feature Flags",
    description: "Allowing for String List in a Repeat Startegy",
    module: MODULES.ff,
    // horizon: "ROADMAP.threemonths",
  },
  {
    title: "Cloud Cost Management",
    description: "Allowing for String List in a Repeat Startegy",
    module: MODULES.ccm,
    // horizon: "ROADMAP.threemonths",
  },
  {
    title: "Security Testing Orchestration",
    description: "Allowing for String List in a Repeat Startegy",
    module: MODULES.sto,
    // horizon: "ROADMAP.threemonths",
  },
  {
    title: "Chaos Engineering ",
    description: "Allowing for String List in a Repeat Startegy",
    module: MODULES.ce,
    // horizon: "ROADMAP.threemonths",
  },
];
