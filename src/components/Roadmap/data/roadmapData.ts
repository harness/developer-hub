import { MODULES } from "../../../constants";
import { CdData } from "./cdData";
import { CiData } from "./ciData";
import { FfData } from "./ffData";
import { CcmData } from "./ccmData";
import { StoData } from "./stoData";
import { SscaData } from "./sscaData";
import { CeData } from "./ceData";
import { SrmData } from "./srmData";
import { IdpData } from "./idpData";
import { SeiData } from "./seiData";
import { IacmData } from "./iacmData";
import { platformData } from "./platformData";
import { aidaData } from "./aidaData";
import { codeData } from "./codeData";


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
  {
    title: "Cloud Cost Management",
    description: "Control Cloud costs with Intelligent Automation.",
    module: MODULES.ccm,
    horizon: CcmData,
  },
  {
    title: "Security Testing Orchestration",
    description: "Secure your applications at the speed of development.",
    module: MODULES.sto,
    horizon: StoData,
  },
  {
    title: "Software Supply Chain Assurance",
    description: "Ensure Artifact Integrity and Open Source Governance",
    module: MODULES.ssca,
    horizon: SscaData,
  },
  {
    title: "Chaos Engineering",
    description: "Discover how your applications stand up to real-world failure scenarios.",
    module: MODULES.ce,
    horizon: CeData,
  },
  {
    title: "Service Reliability Management",
    description: "Automated SLO Management.",
    module: MODULES.srm,
    horizon: SrmData,
  },
  {
    title: "Internal Developer Portal",
    description: "Built for Developers, Crafted by Platform Engineers.",
    module: MODULES.idp,
    horizon: IdpData,
  },
  {
    title: "Software Engineering Insights",
    description: "Discover SDLC bottlenecks, assess team productivity, and improve developer experience guided by data and insights.",
    module: MODULES.sei,
    horizon: SeiData,
  },
  {
    title: "Infrastructure as Code Management",
    description: "Covering all your Infrastructure as Code Management needs.",
    module: MODULES.iacm,
    horizon: IacmData,
  },
  {
    title: "Code Repository",
    description: "Securely host private Git repositories and collaborate on Code with advanced access controls and governance.",
    module: MODULES.code,
    horizon: codeData,
  },
  {
    title: "AI Development Assistant",
    description: "Unlock the power of AI infused software delivery.",
    module: MODULES.aida,
    horizon: aidaData,
  },
 
];

export default ModuleData;
