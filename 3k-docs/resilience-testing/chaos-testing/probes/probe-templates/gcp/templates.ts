import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const gcpProbeTemplates: ExperimentDetails[] = [
  {
    name: "GCP SQL Instance Status Check",
    description:
      "Validates if a GCP Cloud SQL instance is in Running state.",
    tags: ["sql", "database", "cloud-sql", "status-check"],
    category: "gcp",
  },
  {
    name: "GCP VM Disk Status Check",
    description:
      "Validates if a GCP Compute Engine persistent disk is in ready to use state.",
    tags: ["disk", "storage", "persistent-disk", "compute-engine"],
    category: "gcp",
  },
  {
    name: "GCP VM Instance Status Check",
    description:
      "Validates if a GCP Compute Engine VM instance is in Running state.",
    tags: ["vm", "instance", "compute-engine", "virtual-machine"],
    category: "gcp",
  },
];
