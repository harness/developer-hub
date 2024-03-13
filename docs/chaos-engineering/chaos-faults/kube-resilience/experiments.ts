import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Kubelet density",
    description:
      "Kubelet density determines the resilience of the kubelet by creating pods on a specific node.",
    tags: ["kubelet", "density"],
    category: "kube-resilience",
  },
];
