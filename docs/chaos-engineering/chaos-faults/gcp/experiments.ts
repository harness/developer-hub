import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "GCP VM disk loss by label",
    description: "This is a description of experiment 1",
    tags: ["gcp", "disk loss", "label"],
    category: "gcp",
  },
  {
    name: "GCP VM disk loss",
    description: "This is a description of experiment 1",
    tags: ["gcp", "disk loss"],
    category: "gcp",
  },
  {
    name: "GCP VM instance stop by label",
    description: "This is a description of experiment 1",
    tags: ["gcp", "instance stop", "label"],
    category: "gcp",
  },
  {
    name: "GCP VM instance stop",
    description: "This is a description of experiment 1",
    tags: ["gcp", "instance stop"],
    category: "gcp",
  },
];
