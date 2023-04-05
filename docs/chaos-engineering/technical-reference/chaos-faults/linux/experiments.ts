import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Linux CPU stress",
    description:
      "Linux CPU stress stresses the CPU of the target Linux machines for a specific duration.",
    tags: ["linux","cpu","stress"],
    category: "linux",
  },
  {
    name: "Linux memory stress",
    description:
      "Linux memory stress causes memory consumption of the target Linux machines for a specific duration.",
    tags: ["linux","memory","stress"],
    category: "linux",
  },
  {
    name: "Linux disk IO stress",
    description:
      "Linux disk I/O Stress fault stresses the disk of the target Linux machines over IO operations for a certain duration.",
    tags: ["linux","diskio","stress"],
    category: "linux",
  },
  {
    name: "Linux network loss",
    description:
      "Linux network loss injects chaos to disrupt network connectivity on Linux machine by blocking the network requests.",
    tags: ["linux","network","loss"],
    category: "linux",
  },
  {
    name: "Linux network latency",
    description:
      "Linux network latency injects chaos to disrupt network connectivity on the Linux machine by adding delay to the network requests.",
    tags: ["linux","network","latency"],
    category: "linux",
  },
  {
    name: "Linux network corruption",
    description:
      "Linux network corruption injects chaos to disrupt network connectivity on Linux machine by corrupting the network requests.",
    tags: ["linux","network","corruption"],
    category: "linux",
  },
  {
    name: "Linux network duplication",
    description:
      "Linux network duplication injects chaos to disrupt network connectivity on Linux machine by duplicating network packets.",
    tags: ["linux","network","duplication"],
    category: "linux",
  },
  {
    name: "Linux process kill",
    description:
      "Linux process kill fault kills the target processes running on Linux machines.",
    tags: ["linux","process"],
    category: "linux",
  },
  {
    name: "Linux service restart",
    description:
      "Linux service restart stops the target system services running on a Linux machine.",
    tags: ["linux","service"],
    category: "linux",
  },
  {
    name: "Linux DNS error",
    description:
      "Linux DNS error injects chaos to disrupt DNS resolution on the Linux machine.",
    tags: ["linux","dns"],
    category: "linux",
  },
  {
    name: "Linux DNS spoof",
    description:
      "Linux DNS spoof injects chaos to mimic DNS resolution on the Linux machine.",
    tags: ["linux","dns"],
    category: "linux",
  },
  {
    name: "Linux time chaos",
    description:
      "Linux time chaos injects chaos to change the time on the Linux machine.",
    tags: ["linux","time"],
    category: "linux",
  },
];
