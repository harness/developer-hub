import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "VMware CPU hog",
    description:
      "Drive CPU utilization to a configurable percentage across a configurable number of cores on a Linux VMware VM for a configurable duration.",
    tags: ["CPU", "stress"],
    category: "vmware",
  },
  {
    name: "VMware memory hog",
    description:
      "Consume a configurable amount of RAM on a Linux VMware VM for a configurable duration so you can test how the workload behaves when memory headroom shrinks.",
    tags: ["memory", "stress"],
    category: "vmware",
  },
  {
    name: "VMware IO stress",
    description:
      "Drive disk IO load on a Linux VMware VM for a configurable duration so you can test how the workload behaves when storage throughput is saturated.",
    tags: ["io", "stress"],
    category: "vmware",
  },
  {
    name: "VMware network latency",
    description:
      "Add latency to egress traffic from a Linux VMware VM for a configurable duration. Scope by destination IP, hostname, or port.",
    tags: ["network", "latency"],
    category: "vmware",
  },
  {
    name: "VMware network loss",
    description:
      "Drop a configurable percentage of egress packets from a Linux VMware VM for a configurable duration.",
    tags: ["network", "loss"],
    category: "vmware",
  },
  {
    name: "VMware network rate limit",
    description:
      "Cap egress bandwidth on a Linux VMware VM for a configurable duration.",
    tags: ["network", "rate", "limit"],
    category: "vmware",
  },
  {
    name: "VMware DNS chaos",
    description:
      "Force DNS resolution failures for specific hostnames on a Linux VMware VM for a configurable duration.",
    tags: ["DNS", "stress"],
    category: "vmware",
  },
  {
    name: "VMware HTTP latency",
    description:
      "Inject HTTP response latency at a target service running inside a Linux VMware VM for a configurable duration.",
    tags: ["http", "latency"],
    category: "vmware",
  },
  {
    name: "VMware HTTP reset peer",
    description:
      "Reset TCP connections to an HTTP service running inside a Linux VMware VM for a configurable duration.",
    tags: ["http", "reset", "peer"],
    category: "vmware",
  },
  {
    name: "VMware HTTP response modify",
    description:
      "Rewrite HTTP responses (status code, body, headers) from a service running inside a Linux VMware VM for a configurable duration.",
    tags: ["http", "modify", "response"],
    category: "vmware",
  },
  {
    name: "VMware process kill",
    description:
      "Terminate one or more processes by PID inside a Linux VMware VM for a configurable duration.",
    tags: ["kill", "process"],
    category: "vmware",
  },
  {
    name: "VMware service stop",
    description:
      "Stop one or more systemd services inside a Linux VMware VM for a configurable duration.",
    tags: ["stop", "service"],
    category: "vmware",
  },
  {
    name: "VMware VM poweroff",
    description:
      "Power off one or more VMware VMs (identified by Managed Object ID) for a configurable duration, then power them back on.",
    tags: ["power", "off", "moid"],
    category: "vmware",
  },
  {
    name: "VMware VM poweroff by name",
    description:
      "Power off one or more VMware VMs (identified by name) for a configurable duration, then power them back on.",
    tags: ["power", "off", "name"],
    category: "vmware",
  },
];
