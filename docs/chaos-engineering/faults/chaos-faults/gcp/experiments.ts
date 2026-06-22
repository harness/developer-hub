import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "GCP SQL instance failover",
    description:
      "Trigger a failover on a high-availability Cloud SQL instance so you can test how the application behaves when the primary node fails over to its standby.",
    tags: ["instance", "failover"],
    category: "gcp",
  },
  {
    name: "GCP VM disk loss by label",
    description:
      "Detach a percentage of non-boot persistent disks selected by label from GCP VM instances for a configurable duration, then reattach them.",
    tags: ["disk loss"],
    category: "gcp",
  },
  {
    name: "GCP VM disk loss",
    description:
      "Detach one or more named non-boot persistent disks from GCP VM instances for a configurable duration, then reattach them.",
    tags: ["disk loss"],
    category: "gcp",
  },
  {
    name: "GCP VM instance stop by label",
    description:
      "Stop a percentage of Compute Engine VMs selected by label for a configurable duration, then start them again (or rely on the MIG auto-healer).",
    tags: ["instance stop"],
    category: "gcp",
  },
  {
    name: "GCP VM instance stop",
    description:
      "Stop one or more named Compute Engine VMs for a configurable duration, then start them again (or rely on the MIG auto-healer).",
    tags: ["instance stop"],
    category: "gcp",
  },
];
