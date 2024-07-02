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
  {
    name: "CF app jvm cpu stress",
    description: "CF app jvm cpu stress injects jvm cpu stress into a Cloud Foundry app instance.",
    tags: ["cf", "cloud-foundry", "app", "jvm", "cpu"],
    category: "cloud-foundry",
  },
  {
    name: "CF app jvm memory stress",
    description: "CF app jvm memory stress injects jvm memory stress into a Cloud Foundry app instance.",
    tags: ["cf", "cloud-foundry", "app", "jvm", "memory"],
    category: "cloud-foundry",
  },
  {
    name: "CF app jvm method exception",
    description: "CF app jvm method exception injects jvm method exception into a Cloud Foundry app instance.",
    tags: ["cf", "cloud-foundry", "app", "jvm", "exception"],
    category: "cloud-foundry",
  },
  {
    name: "CF app jvm method latency",
    description: "CF app jvm method latency injects jvm method latency into a Cloud Foundry app instance.",
    tags: ["cf", "cloud-foundry", "app", "jvm", "latency"],
    category: "cloud-foundry",
  },
  {
    name: "CF app jvm modify return",
    description: "CF app jvm modify return injects jvm modify return into a Cloud Foundry app instance.",
    tags: ["cf", "cloud-foundry", "app", "jvm", "return"],
    category: "cloud-foundry",
  },
  {
    name: "CF app jvm trigger gc",
    description: "CF app jvm trigger gc injects jvm trigger gc into a Cloud Foundry app instance.",
    tags: ["cf", "cloud-foundry", "app", "jvm", "gc"],
    category: "cloud-foundry",
  },
];
