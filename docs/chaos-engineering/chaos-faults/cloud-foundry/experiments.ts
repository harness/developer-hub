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
  {
    name: "CF app container kill",
    description: "CF app container kill causes a Cloud Foundry app instance container to be killed and restarted.",
    tags: ["cf", "cloud-foundry", "app", "container"],
    category: "cloud-foundry",
  },
  {
    name: "CF app network loss",
    description: "CF app network loss injects network loss into a Cloud Foundry app instance.",
    tags: ["cf", "cloud-foundry", "app", "network", "latency"],
    category: "cloud-foundry",
  },
  {
    name: "CF app network latency",
    description: "CF app network latency injects network latency into a Cloud Foundry app instance.",
    tags: ["cf", "cloud-foundry", "app", "network", "latency"],
    category: "cloud-foundry",
  },
  {
    name: "CF app network corruption",
    description: "CF app network corruption injects network corruption into a Cloud Foundry app instance.",
    tags: ["cf", "cloud-foundry", "app", "network", "corruption"],
    category: "cloud-foundry",
  },
  {
    name: "CF app network duplication",
    description: "CF app network duplication injects network duplication into a Cloud Foundry app instance.",
    tags: ["cf", "cloud-foundry", "app", "network", "duplication"],
    category: "cloud-foundry",
  },
];
