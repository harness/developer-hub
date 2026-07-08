import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Kubelet density",
    description:
      "Create a configurable number of pods on a target Kubernetes node so you can test how the node, kubelet, and workload behave during a sudden pod-storm.",
    tags: ["kubelet", "density"],
    category: "kube-resilience",
  },
];
