import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "GCP VM disk loss by label",
    description:
      "GCP VM disk loss by label disrupts the state of GCP persistent disk volume filtered using a label by detaching it from its VM instance for a specific duration.",
    tags: ["disk loss"],
    category: "gcp",
  },
  {
    name: "GCP VM disk loss",
    description:
      "GCP VM disk loss disrupts the state of GCP persistent disk volume using the disk name by detaching the disk volume from its VM instance for a specific duration.",
    tags: ["disk loss"],
    category: "gcp",
  },
  {
    name: "GCP VM instance stop by label",
    description:
      "GCP VM instance stop by label powers off from the GCP VM instances (filtered by a label before) for a specific duration.",
    tags: ["instance stop"],
    category: "gcp",
  },
  {
    name: "GCP VM instance stop",
    description:
      "GCP VM instance stop powers off from a GCP VM instance using the instance name (or a list of instance names) before for a specific duration. This fault checks the performance of the application (or process) running on the VM instance.",
    tags: ["instance stop"],
    category: "gcp",
  },
];
