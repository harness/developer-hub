import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const datadogProbeTemplates: ExperimentDetails[] = [
  {
    name: "Datadog CPU Check",
    description:
      "Validates the CPU utilisation of a service using Datadog container metrics.",
    tags: ["datadog", "cpu", "metrics", "kubernetes"],
    category: "datadog",
    link: "/docs/resilience-testing/chaos-testing/probes/probe-templates/datadog/datadog-cpu-check",
  },
  {
    name: "Datadog Memory Check",
    description:
      "Validates the memory utilisation of a service using Datadog container metrics.",
    tags: ["datadog", "memory", "metrics", "kubernetes"],
    category: "datadog",
    link: "/docs/resilience-testing/chaos-testing/probes/probe-templates/datadog/datadog-memory-check",
  },
  {
    name: "Datadog P95 Latency Check",
    description:
      "Validates the p95 latency of a service using Datadog APM metrics.",
    tags: ["datadog", "apm", "latency", "p95"],
    category: "datadog",
    link: "/docs/resilience-testing/chaos-testing/probes/probe-templates/datadog/datadog-p95-latency-check",
  },
  {
    name: "Datadog P99 Latency Check",
    description:
      "Validates the p99 latency of a service using Datadog APM metrics.",
    tags: ["datadog", "apm", "latency", "p99"],
    category: "datadog",
    link: "/docs/resilience-testing/chaos-testing/probes/probe-templates/datadog/datadog-p99-latency-check",
  },
  {
    name: "Datadog Avg Latency Check",
    description:
      "Validates the average latency of a service using Datadog APM metrics.",
    tags: ["datadog", "apm", "latency", "avg"],
    category: "datadog",
    link: "/docs/resilience-testing/chaos-testing/probes/probe-templates/datadog/datadog-avg-latency-check",
  },
  {
    name: "Datadog Error Rate Check",
    description:
      "Validates the error rate of a service using Datadog APM metrics.",
    tags: ["datadog", "apm", "error-rate"],
    category: "datadog",
    link: "/docs/resilience-testing/chaos-testing/probes/probe-templates/datadog/datadog-error-rate-check",
  },
];
