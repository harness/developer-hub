import { Horizon } from "./roadmapData";

export const SeiData: Horizon = {
  Now: {
    description: "What is being delivered now",
    feature: [
      {
        tag: [{ value: "K8s" }, { value: "Security" }],
        title: "Feature Now",
        description: "Description Now",
      },
    ],
  },
  Next: {
    description: "What is being developed next",
    feature: [
      {
        tag: [{ value: "K8s" }, { value: "Security" }],
        title: "Feature Next",
        description: "Description Next",
      },
    ],
  },
  Later: {
    description: "What is being developed later",
    feature: [
      {
        tag: [{ value: "K8s" }, { value: "Security" }],
        title: "Feature Later",
        description: "Description Later",
      },
    ],
  },
};
