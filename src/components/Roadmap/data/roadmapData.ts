import { MODULES } from "../../../constants";
import type { ModuleTheme } from "./roadmapPalette";
import { CdData, cdModuleTheme } from "./cdData";
import { CiData, ciModuleTheme } from "./ciData";
import { FmeData, fmeModuleTheme } from "./fmeData";
import { CcmData, ccmModuleTheme } from "./ccmData";
import { StoData, stoModuleTheme } from "./stoData";
import { SscaData, sscaModuleTheme } from "./sscaData";
import { CeData, ceModuleTheme } from "./ceData";
import { IdpData, idpModuleTheme } from "./idpData";
import { SeiData, seiModuleTheme } from "./seiData";
import { IacmData, iacmModuleTheme } from "./iacmData";
import { platformData, platformModuleTheme } from "./platformData";
import { aidaData, aidaModuleTheme } from "./aidaData";
import { codeData, codeModuleTheme } from "./codeData";
// CDE hidden from navigation (HDH-542)
// import { CdeData, cdeModuleTheme } from "./cdeData";
import { DbdevopsData, dbdevopsModuleTheme } from "./dbdevopsData";
import { AtaData, ataModuleTheme } from "./ataData";
import { arData, arModuleTheme } from "./arData";
import { QwietaiData, qwietaiModuleTheme } from "./qwietaidata";
import { AiSreData, aisreModuleTheme } from "./aiSreData";

export interface ModuleData {
  title: string;
  description: string;
  module: string;
  horizon: Horizon;
  moduleTheme: ModuleTheme;
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
  link?: string;
  backgroundColor?: string;
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
      "SaaS release status: GA, SMP release status: GA",
    module: MODULES.platform,
    horizon: platformData,
    moduleTheme: platformModuleTheme,
  },
  {
    title: "Continuous Delivery & GitOps",
    description: "SaaS release status: GA, SMP release status: GA",
    module: MODULES.cd,
    horizon: CdData,
    moduleTheme: cdModuleTheme,
  },
  {
    title: "Database DevOps",
    description: "SaaS release status: GA, SMP release status: GA",
    module: MODULES.dbdevops,
    horizon: DbdevopsData,
    moduleTheme: dbdevopsModuleTheme,
  },
  {
    title: "AI Test Automation",
    description: "SaaS release status: GA, SMP release status: Not yet planned",
    module: MODULES.ata,
    horizon: AtaData,
    moduleTheme: ataModuleTheme,
  },
  {
    title: "Continuous Integration",
    description: "SaaS release status: GA, SMP release status: GA",
    module: MODULES.ci,
    horizon: CiData,
    moduleTheme: ciModuleTheme,
  },
  {
    title: "Feature Management & Experimentation",
    description: "SaaS release status: GA, SMP release status: Not yet planned",
    module: MODULES.fme,
    horizon: FmeData,
    moduleTheme: fmeModuleTheme,
  },
  {
    title: "Cloud Cost Management",
    description: "SaaS release status: GA, SMP release status: Beta",
    module: MODULES.ccm,
    horizon: CcmData,
    moduleTheme: ccmModuleTheme,
  },
  {
    title: "Security Testing Orchestration",
    description: "SaaS release status: GA, SMP release status: GA",
    module: MODULES.sto,
    horizon: StoData,
    moduleTheme: stoModuleTheme,
  },
  {
    title: "Supply Chain Security",
    description: "SaaS release status: GA, SMP release status: GA",
    module: MODULES.ssca,
    horizon: SscaData,
    moduleTheme: sscaModuleTheme,
  },
  {
    title: "SAST & SCA",
    description: "SaaS release status: GA, SMP release status: GA",
    module: MODULES.qwietai,
    horizon: QwietaiData,
    moduleTheme: qwietaiModuleTheme,
  },
  {
    title: "Resilience Testing",
    description:
      "SaaS release status: GA, SMP release status: Limited GA",
    module: MODULES.ce,
    horizon: CeData,
    moduleTheme: ceModuleTheme,
  },
  {
    title: "Internal Developer Portal",
    description: "SaaS release status: GA, SMP release status: On Roadmap",
    module: MODULES.idp,
    horizon: IdpData,
    moduleTheme: idpModuleTheme,
  },
  {
    title: "Software Engineering Insights",
    description:
      "SaaS release status: GA, SMP release status: Not yet planned",
    module: MODULES.sei,
    horizon: SeiData,
    moduleTheme: seiModuleTheme,
  },
  {
    title: "Infrastructure as Code Management",
    description: "SaaS release status: GA, SMP release status: On Roadmap",
    module: MODULES.iacm,
    horizon: IacmData,
    moduleTheme: iacmModuleTheme,
  },
  {
    title: "Code Repository",
    description: "SaaS release status: GA, SMP release status: GA",
    module: MODULES.code,
    horizon: codeData,
    moduleTheme: codeModuleTheme,
  },
  {
    title: "Harness AI",
    description: "SaaS release status: GA, SMP release status: Not yet planned",
    module: MODULES.aida,
    horizon: aidaData,
    moduleTheme: aidaModuleTheme,
  },
  // Cloud Development Environments hidden from navigation (HDH-542)
  // {
  //   title: "Cloud Development Environments",
  //   description: "SaaS release status: GA, SMP release status: On Roadmap",
  //   module: MODULES.cde,
  //   horizon: CdeData,
  //   moduleTheme: cdeModuleTheme,
  // },
  {
    title: "Artifact Registry",
    description: "SaaS release status: GA",
    module: MODULES.ar,
    horizon: arData,
    moduleTheme: arModuleTheme,
  },
  {
    title: "AI SRE",
    description: "SaaS release status: GA",
    module: MODULES.aisre,
    horizon: AiSreData,
    moduleTheme: aisreModuleTheme,
  },
];

export default ModuleData;
