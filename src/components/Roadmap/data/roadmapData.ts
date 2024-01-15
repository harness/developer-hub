import { MODULES } from "../../../constants";
import { CdData } from "./cdData";
import { CiData } from "./ciData";
import { FfData } from "./ffData";

export interface ModuleData {
  title: string;
  description: string;
  module: string;
  horizon: Horizon;
}

export type Feature = {
  tag?: string[];
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
    title: "Continuous Delivery & GitOps",
    description:
      "The Harness Continuous Delivery (CD) module strategically focuses on streamlining and optimizing the software delivery process. By automating the deployment pipeline, it aims to accelerate the release lifecycle,ensuring faster and more reliable delivery of applications. The module emphasizes efficiency through intelligent orchestration, allowing eamless integration of various tools and technologies. Harness CD strategically leverages advanced deployment strategies, such as canaries and blue-green deployments, to minimize risks and maximize the stability of software releases. Overall, the module is designed to empower organizations with a robust, agile, and scalable approach to continuous delivery.",
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
