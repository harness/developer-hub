import { Horizon } from "./roadmapData";

export const FfData: Horizon = {
  Now: {
    description: "What is being delivered now",
    feature: [
      {
        tag: [{ value: "Lifecycle Management" }],
        title: "Custom Configuration for Stale Flag Cleanup",
        description:
          "Ability to choose custom criteria such as age of flag to determine stale flag definition.",
      },
    ],
  },
  Next: {
    description: "What is being developed next",
    feature: [
      {
        tag: [{ value: "Experimentation" }],
        title: "A/B Testing",
        description:
          "Improved A/B testing framework for segmenting tests between targets.",
      },
    ],
  },
  Later: {
    description: "What is being developed later",
    feature: [
      {
        tag: [{ value: "SDKs" }],
        title: "SDK Troubleshooting with AIDA",
        description:
          "Use AIDA to help you diagnose SDK issues and improvements in your code.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Lifecycle Management" }],
        title: "Automated Stale Flag Removal",
        description:
          "Ability to automatically identify stale flags and remove directly from your code base.",
        // link: "/release-notes/feature-flags#java-sdk-1",
      },
    ],
  },
};
