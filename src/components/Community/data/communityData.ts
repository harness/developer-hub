import { MODULES } from "../../../constants";

export type CardItem = {
  title: string;
  /*
  MODULES.ci | MODULES.cd | MODULES.ff | MODULES.ccm |
  MODULES.sto | MODULES.srm | MODULES.ce | MODULES.platform
  */
  module: MODULES;
  description?: JSX.Element | string;
  date?: string;
  link?: string;
};

export const communityList: CardItem[] = [
  {
    title: "CI Community Guide",
    module: MODULES.ci,
    date: "May 12, 2023",
    link: "/community/continuous-integration/community-guide",
  },
  {
    title: "CD Community Guide",
    module: MODULES.cd,
    date: "May 12, 2023",
    link: "/community/continuius-delivery/community-guide",
  },
  {
    title: "FF Community Guide",
    module: MODULES.ff,
    date: "May 12, 2023",
    link: "/community/feature-flags/community-guide",
  },
  {
    title: "CCM Community Guide",
    module: MODULES.ccm,
    date: "May 12, 2023",
    link: "/community/cloud-cost-management/community-guide",
  },
  {
    title: "SRM Community Guide",
    module: MODULES.srm,
    date: "May 12, 2023",
    link: "/community/service-reliability-management/community-guide",
  },
];