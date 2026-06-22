import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Windows CPU stress",
    description:
      "Drive CPU utilization to a configurable percentage across a configurable number of cores on a Windows VM for a configurable duration.",
    tags: ["cpu"],
    category: "windows",
  },
  {
    name: "Windows memory stress",
    description:
      "Consume a configurable amount of memory on a Windows VM for a configurable duration so you can test how the workload behaves when memory headroom shrinks.",
    tags: ["memory"],
    category: "windows",
  },
  {
    name: "Windows disk stress",
    description:
      "Drive disk IO load on a Windows VM for a configurable duration so you can test how the workload behaves when storage throughput is saturated.",
    tags: ["disk"],
    category: "windows",
  },
  {
    name: "Windows process kill",
    description:
      "Terminate one or more processes (by PID or name) on a Windows VM for a configurable duration.",
    tags: ["process", "kill"],
    category: "windows",
  },
  {
    name: "Windows blackhole chaos",
    description:
      "Block all network traffic to selected destination hosts or IP addresses from a Windows VM for a configurable duration.",
    tags: ["network", "blackhole"],
    category: "windows",
  },
  {
    name: "Windows network latency",
    description:
      "Add latency to egress traffic from a Windows VM for a configurable duration. Scope by destination IP, hostname, port, or protocol.",
    tags: ["network", "latency"],
    category: "windows",
  },
  {
    name: "Windows network loss",
    description:
      "Drop a configurable percentage of egress packets from a Windows VM for a configurable duration.",
    tags: ["network", "loss"],
    category: "windows",
  },
  {
    name: "Windows network corruption",
    description:
      "Corrupt a configurable percentage of egress packets from a Windows VM for a configurable duration.",
    tags: ["network", "corruption"],
    category: "windows",
  },
  {
    name: "Windows network duplication",
    description:
      "Duplicate a configurable percentage of egress packets from a Windows VM for a configurable duration.",
    tags: ["network", "duplication"],
    category: "windows",
  },
];
