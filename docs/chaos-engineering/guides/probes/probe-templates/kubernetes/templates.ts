import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const kubernetesProbeTemplates: ExperimentDetails[] = [
  {
    name: "Container Restart Check",
    description:
      "Container restart check validates the restart count of a container.",
    tags: ["container", "restart", "pod", "health-check"],
    category: "kubernetes",
  },
  {
    name: "Node Status Check",
    description:
      "Node status check validates the current state of Kubernetes nodes.",
    tags: ["node", "status", "cluster", "health-check"],
    category: "kubernetes",
  },
  {
    name: "Pod Replica Count Check",
    description:
      "Pod replica count check validates the current replica count of Kubernetes pods.",
    tags: ["pod", "replica", "deployment", "availability"],
    category: "kubernetes",
  },
  {
    name: "Pod Resource Utilisation Check",
    description:
      "Pod resource utilisation check validates the current resource utilisation metrics of Kubernetes pods.",
    tags: ["pod", "resource", "cpu", "memory"],
    category: "kubernetes",
  },
  {
    name: "Pod Startup Time Check",
    description:
      "Pod startup time check validates the startup time of Kubernetes pods.",
    tags: ["pod", "startup", "performance", "timing"],
    category: "kubernetes",
  },
  {
    name: "Pod Status Check",
    description:
      "Pod status check validates the current state of Kubernetes pods.",
    tags: ["pod", "status", "health", "running"],
    category: "kubernetes",
  },
  {
    name: "Pod Warnings Check",
    description:
      "Pod warnings check checks for warnings in the pod events.",
    tags: ["pod", "warnings", "events", "monitoring"],
    category: "kubernetes",
  },
];
