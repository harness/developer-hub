import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Kube security CIS",
    description:
      "Kube security CIS runs the CIS benchmark on the Kubernetes cluster and checks for the compliance of the cluster with the CIS benchmark",
    tags: ["kube security","security"],
    category: "security-chaos",
  },
];
