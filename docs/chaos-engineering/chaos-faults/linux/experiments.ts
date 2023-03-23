import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Linux CPU stress",
    description:
      "Linux CPU Stress fault stresses the CPU of the target Linux machines for a certain duration.",
    tags: ["linux","cpu","stress"],
    category: "linux",
  },
  {
    name: "Linux memory stress",
    description:
      "Linux Memory Stress fault causes memory consumption of the target Linux machines for a certain duration.",
    tags: ["linux","memory","stress"],
    category: "linux",
  },
  {
    name: "Linux disk IO stress",
    description:
      "Linux Disk IO Stress fault stresses the disk of the target Linux machines over IO operations for a certain duration.",
    tags: ["linux","diskio","stress"],
    category: "linux",
  },
  {
    name: "Linux process kill",
    description:
      "Linux Process Kill fault kills the target processes running on Linux machines.",
    tags: ["linux","process"],
    category: "linux",
  },
  {
    name: "Linux service restart",
    description:
      "Linux Service Restart stops the target system services running in a Linux machine.",
    tags: ["linux","service"],
    category: "linux",
  },
  {
    name: "Linux DNS error",
    description:
      "Linux DNS Error injects chaos to disrupt DNS resolution in Linux machine.",
    tags: ["linux","dns"],
    category: "linux",
  },
  {
    name: "Linux DNS spoof",
    description:
      "Linux DNS Spoof injects chaos to mimic DNS resolution in linux machine.",
    tags: ["linux","dns"],
    category: "linux",
  },
  {
    name: "Linux time chaos",
    description:
      "Linux Time Chaos injects chaos to change the time of the Linux machine.",
    tags: ["linux","time"],
    category: "linux",
  },
];