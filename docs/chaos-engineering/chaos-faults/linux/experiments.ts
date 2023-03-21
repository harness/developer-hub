import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Linux CPU Stress",
    description:
      "Linux CPU Stress fault stresses the CPU of the target Linux machines for a certain duration.",
    tags: ["linux","cpu","stress"],
    category: "linux",
  },
  {
    name: "Linux Memory Stress",
    description:
      "Linux Memory Stress fault causes memory consumption of the target Linux machines for a certain duration.",
    tags: ["linux","memory","stress"],
    category: "linux",
  },
  {
    name: "Linux Disk IO Stress",
    description:
      "Linux Disk IO Stress fault stresses the disk of the target Linux machines over IO operations for a certain duration.",
    tags: ["linux","diskio","stress"],
    category: "linux",
  },
  {
    name: "Linux Process Kill",
    description:
      "Linux Process Kill fault kills the target processes running on Linux machines.",
    tags: ["linux","process"],
    category: "linux",
  },
];