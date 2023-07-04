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
    title: "Harness Open Source - World Without Feature Flags",
    module: MODULES.ff,
    date: "May 12, 2023",
    link: "https://harness-community.github.io/blog/world-without-featureflags",
  },
];