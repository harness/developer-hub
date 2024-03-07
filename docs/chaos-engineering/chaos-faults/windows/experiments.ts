import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Windows CPU stress",
    description:
      "Windows CPU stress simulates a CPU stress scenario on Windows OS based VM.",
    tags: ["cpu"],
    category: "windows",
  },
  {
    name: "Windows Memory stress",
    description:
      "Windows memory stress simulates a memory stress scenario on Windows OS based VM.",
    tags: ["memory"],
    category: "windows",
  },
  {
    name: "Windows Blackhole Chaos",
    description:
      "Windows blackhole chaos simulates a network blackhole scenario on Windows OS based VM.",
    tags: ["network"],
    category: "windows",
  },
];
