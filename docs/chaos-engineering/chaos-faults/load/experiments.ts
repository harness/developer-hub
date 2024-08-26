import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Locust loadgen",
    description:
      "Locust loadgen fault simulates load generation on the target hosts for a specific duration.",
    tags: ["load","locust","loadgen"],
    category: "load",
  },
  {
    name: "K6 loadgen",
    description:
        "K6 loadgen fault simulates load generation on the target hosts for a specific duration.",
    tags: ["load","k6","loadgen"],
    category: "load",
  },
];
