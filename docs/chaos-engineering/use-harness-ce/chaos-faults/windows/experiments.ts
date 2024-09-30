import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Windows CPU stress",
    description:
      "Windows CPU stress applies stress on the CPU resources of Windows OS VM.",
    tags: ["cpu"],
    category: "windows",
  },
  {
    name: "Windows Memory stress",
    description:
      "Windows memory stress applies stress on the memory resources of a Windows OS based VM.",
    tags: ["memory"],
    category: "windows",
  },
  {
    name: "Windows Network Blackhole Chaos",
    description:
      "Windows network blackhole chaos simulates a network blackhole scenario on Windows OS based VM.",
    tags: ["network"],
    category: "windows",
  },
];
