import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "CF app stop",
    description: "CF app stop injects app stop chaos for a Cloud Foundry app.",
    tags: ["cf", "cloud-foundry", "app"],
    category: "cloud-foundry",
  },
];
