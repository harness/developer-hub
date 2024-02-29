import { Horizon } from "./roadmapData";

export const SrmData: Horizon = {
  Now: {
    description: "Q1 2024, Feb-Apr 2024",
    feature: [
      {
        tag: [{ value: "K8s" }, { value: "Security" }],
        title: "Feature Now",
        description: "Description Now",
      },
    ],
  },
  Next: {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [{ value: "K8s" }, { value: "Security" }],
        title: "Feature Next",
        description: "Description Next",
      },
    ],
  },
  Later: {
    description: "Q3 2024+, Aug 2024 & beyond",
    feature: [
      {
        tag: [{ value: "K8s" }, { value: "Security" }],
        title: "Feature Later",
        description: "Description Later",
      },
    ],
  },
};
