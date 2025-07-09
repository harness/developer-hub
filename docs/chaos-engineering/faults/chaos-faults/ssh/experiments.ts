import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "SSH chaos",
    description:
      "SSH chaos injects chaos on the target host using SSH connections by passing custom chaos logic through a configmap.",
    tags: ["ssh"],
    category: "ssh",
  },
];
