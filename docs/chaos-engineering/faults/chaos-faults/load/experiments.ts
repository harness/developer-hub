import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "k6 loadgen",
    description:
      "Run a Grafana k6 script against a target HTTP endpoint for a configurable duration so you can test how the workload behaves under scripted load.",
    tags: ["load", "k6", "loadgen"],
    category: "load",
  },
  {
    name: "Locust loadgen",
    description:
      "Run a Locust script against a target HTTP endpoint for a configurable duration so you can test how the workload behaves under Python-defined load.",
    tags: ["load", "locust", "loadgen"],
    category: "load",
  },
];
