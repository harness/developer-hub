import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "GCP VM disk loss by label",
    description:
      "It disrupts the state of GCP persistent disk volume filtered using a label by detaching the disk volume from its VM instance for a specific duration.",
    tags: ["disk loss"],
    category: "gcp",
  },
  {
    name: "GCP VM disk loss",
    description:
      "It disrupts the state of GCP persistent disk volume by detaching the disk volume from its VM instance using the disk name for a specific duration.",
    tags: ["disk loss"],
    category: "gcp",
  },
  {
    name: "GCP VM instance stop by label",
    description:
      "It powers off a GCP VM instances (that are filtered by a label) for a specific duration.",
    tags: ["instance stop"],
    category: "gcp",
  },
  {
    name: "GCP VM instance stop",
    description:
      "It powers off a GCP VM instance based on the instance name (or list of instance names) for a specific duration.",
    tags: ["instance stop"],
    category: "gcp",
  },
];
