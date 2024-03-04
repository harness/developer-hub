import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "CF app stop",
    description: "CF app stop injects app stop chaos for a Cloud Foundry app.",
    tags: ["cf", "cloud-foundry", "app"],
    category: "cloud-foundry",
  },
  {
    name: "CF app route unmap",
    description: "CF app route unmap causes a Cloud Foundry app route to be temporarily un-mapped and later mapped back to the app.",
    tags: ["cf", "cloud-foundry", "app"],
    category: "cloud-foundry",
  },
];
