import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "CF app stop",
    description:
      "Stop a Cloud Foundry app for a configurable duration and then re-start it, so you can test how the platform and consumers react when the app goes offline.",
    tags: ["cf", "cloud-foundry", "app", "stop"],
    category: "cloud-foundry",
  },
  {
    name: "CF app container kill",
    description:
      "Kill the container of one or more app instances and let Cloud Foundry reschedule them so you can validate platform self-healing and peer absorption.",
    tags: ["cf", "cloud-foundry", "app", "container", "kill"],
    category: "cloud-foundry",
  },
  {
    name: "CF app route unmap",
    description:
      "Temporarily unmap a route from a Cloud Foundry app so you can test how upstream gateways and consumers handle a route that returns 404 from the CF router.",
    tags: ["cf", "cloud-foundry", "app", "route"],
    category: "cloud-foundry",
  },
  {
    name: "CF app JVM CPU stress",
    description:
      "Drive sustained CPU usage inside the JVM of a Java app instance for a configurable duration so you can test the app under CPU saturation.",
    tags: ["cf", "cloud-foundry", "app", "jvm", "cpu"],
    category: "cloud-foundry",
  },
  {
    name: "CF app JVM memory stress",
    description:
      "Drive heap or non-heap memory pressure inside the JVM of a Java app instance so you can test GC behavior and out-of-memory handling.",
    tags: ["cf", "cloud-foundry", "app", "jvm", "memory"],
    category: "cloud-foundry",
  },
  {
    name: "CF app JVM trigger GC",
    description:
      "Force a full garbage-collection cycle inside the JVM of a Java app instance so you can measure pause time and tail-latency impact.",
    tags: ["cf", "cloud-foundry", "app", "jvm", "gc"],
    category: "cloud-foundry",
  },
  {
    name: "CF app JVM method exception",
    description:
      "Force a specific JVM method to throw a configurable exception so you can validate error-handling paths in callers.",
    tags: ["cf", "cloud-foundry", "app", "jvm", "exception"],
    category: "cloud-foundry",
  },
  {
    name: "CF app JVM method latency",
    description:
      "Add artificial latency to every invocation of a specific JVM method so you can simulate a slow downstream call at the method boundary.",
    tags: ["cf", "cloud-foundry", "app", "jvm", "latency"],
    category: "cloud-foundry",
  },
  {
    name: "CF app JVM modify return",
    description:
      "Override the return value of a specific JVM method so you can test defensive checks and fallbacks against unexpected values.",
    tags: ["cf", "cloud-foundry", "app", "jvm", "return"],
    category: "cloud-foundry",
  },
  {
    name: "CF app network latency",
    description:
      "Add latency on the egress traffic of an app instance so you can simulate a slow downstream dependency at the network layer.",
    tags: ["cf", "cloud-foundry", "app", "network", "latency"],
    category: "cloud-foundry",
  },
  {
    name: "CF app network loss",
    description:
      "Drop a configurable percentage of egress packets from an app instance so you can test retransmissions, retries, and circuit-breaker behavior.",
    tags: ["cf", "cloud-foundry", "app", "network", "loss"],
    category: "cloud-foundry",
  },
  {
    name: "CF app network corruption",
    description:
      "Corrupt a configurable percentage of egress packets from an app instance so you can validate TCP retransmissions and protocol parsers.",
    tags: ["cf", "cloud-foundry", "app", "network", "corruption"],
    category: "cloud-foundry",
  },
  {
    name: "CF app network duplication",
    description:
      "Duplicate a configurable percentage of egress packets from an app instance so you can validate idempotency and deduplication logic.",
    tags: ["cf", "cloud-foundry", "app", "network", "duplication"],
    category: "cloud-foundry",
  },
];
