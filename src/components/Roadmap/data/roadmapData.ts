import { MODULES } from "../../../constants";
import { CdData } from "./cdData";
import { CiData } from "./ciData";
import { FfData } from "./ffData";
import { platformData } from "./platformData";

export interface ModuleData {
  title: string;
  description: string;
  module: string;
  horizon: Horizon;
}

export type tag = {
  color?: string;
  textColor?: string;
  value: string;
};

export type Feature = {
  tag?: tag[];
  title: string;
  description: string;
};
export interface Horizon {
  [key: string]: {
    description: string;
    feature: Feature[];
  };
}

const ModuleData: ModuleData[] = [
  {
    title: "Platform",
    description:
      "One that powers it all. Robust, scalable and intelligent platform that supports the development, deployment, and operation of software applications.",
    module: MODULES.platform,
    horizon: platformData,
  },
  {
    title: "Continuous Delivery & GitOps",
    description: "World’s Most Advanced CD Platform.",
    module: MODULES.cd,
    horizon: CdData,
  },
  {
    title: "Continuous Integration",
    description: "World’s Fastest CI Platform.",
    module: MODULES.ci,
    horizon: CiData,
  },
  {
    title: "Feature Flags",
    description: "Smart Feature Flags. Release confidently with pipelines.",
    module: MODULES.ff,
    horizon: FfData,
  },
  // {
  //   title: "Cloud Cost Management",
  //   description: "Allowing for String List in a Repeat Startegy",
  //   module: MODULES.ccm,
  //   // horizon: "ROADMAP.threemonths",
  // },
  // {
  //   title: "Security Testing Orchestration",
  //   description: "Allowing for String List in a Repeat Startegy",
  //   module: MODULES.sto,
  //   // horizon: "ROADMAP.threemonths",
  // },
  // {
  //   title: "Chaos Engineering ",
  //   description: "Allowing for String List in a Repeat Startegy",
  //   module: MODULES.ce,
  //   // horizon: "ROADMAP.threemonths",
  // },
];

export default ModuleData;
