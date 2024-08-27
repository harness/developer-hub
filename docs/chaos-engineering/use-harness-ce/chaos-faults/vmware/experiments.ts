import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "VMware CPU hog",
    description:
      "VMware CPU hog applies stress on the CPU resources on Linux OS based VMware VM.",
    tags: ["CPU", "stress"],
    category: "vmware",
  },
  {
    name: "VMware disk loss",
    description:
      "VMware disk loss detaches the disks that are attached to a Linux OS based VMware VM.",
    tags: ["disk", "loss"],
    category: "vmware",
  },
  {
    name: "VMware DNS chaos",
    description:
      "VMware DNS chaos causes DNS errors in the VMware VMs for a specific duration.",
    tags: ["DNS", "stress"],
    category: "vmware",
  },
  {
    name: "VMware host reboot",
    description:
      "VMware host reboot reboots a VMware host that is attached to the Vcenter.",
    tags: ["reboot"],
    category: "vmware",
  },
  {
    name: "VMware HTTP latency",
    description:
      "VMware HTTP latency injects HTTP response latency into the service. This is achieved by starting the proxy server and redirecting the traffic through the proxy server.",
    tags: ["http", "latency"],
    category: "vmware",
  },
  {
    name: "VMware HTTP modify response",
    description:
      "VMware HTTP modify response injects HTTP chaos by modifying the status code, body or the headers, which affects the request (or response).",
    tags: ["http", "modify", "response"],
    category: "vmware",
  },
  {
    name: "VMware HTTP reset peer",
    description:
      "VMware HTTP reset peer injects HTTP reset chaos that stops the outgoing HTTP requests by resetting the TCP connection for the requests.",
    tags: ["http", "reset", '"peer'],
    category: "vmware",
  },
  {
    name: "VMware IO stress",
    description:
      "VMware IO stress causes disk stress on the target VMware VMs. It aims to verify the resilience of applications that share this disk resource with the VM.",
    tags: ["io", "stress"],
    category: "vmware",
  },
  {
    name: "VMware memory hog",
    description:
      "VMware memory hog fault consumes excessive memory resources on Linux OS based VMware VMs.",
    tags: ["memory", "stress"],
    category: "vmware",
  },
  {
    name: "VMware network latency",
    description:
      "VMware network latency injects network packet latency from the VMware VM(s) into the application (or service).",
    tags: ["network", "latency"],
    category: "vmware",
  },
  {
    name: "VMware network loss",
    description:
      "VMware network loss injects network packet loss from the VMware VM(s) into the application (or service).",
    tags: ["network", "loss"],
    category: "vmware",
  },
  {
    name: "VMware network rate limit",
    description:
      "VMware network rate limit fault injects network rate limit from the VMware VM(s) into the application (or service).",
    tags: ["network", "rate", "limit"],
    category: "vmware",
  },
  {
    name: "VMware process kill",
    description:
      "VMware process kill kills the target processes that are running as a part of a Linux OS based VMware VM.",
    tags: ["kill", "process"],
    category: "vmware",
  },
  {
    name: "VMware service stop",
    description:
      "VMware service stop stops the target system services running on a Linux OS based VMware VM.",
    tags: ["stop", "service"],
    category: "vmware",
  },
  {
    name: "VMware VM power off",
    description:
      "VMware VM power off stops (or powers off) the VMware VMs for a specific duration.",
    tags: ["power", "off"],
    category: "vmware",
  },
  {
    name: "VMware Windows blackhole chaos",
    description:
      "VMware Windows blackhole chaos simulates a network blackhole scenario on Windows OS based VMware VM.",
    tags: ["blackhole", "network"],
    category: "vmware",
  },
  {
    name: "VMware Windows CPU hog",
    description:
      "VMware Windows CPU hog simulates a CPU hog scenario on Windows OS based VMware VM.",
    tags: ["cpu", "windows", "stress"],
    category: "vmware",
  },
  {
    name: "VMware Windows disk stress",
    description:
      "VMware Windows disk stress fills the disk space on Windows OS based VMware VM.",
    tags: ["disk", "windows", "stress"],
    category: "vmware",
  },
  {
    name: "VMware Windows memory hog",
    description:
      "VMware Windows memory hog simulates a memory hog scenario on Windows OS based VMware VM.",
    tags: ["memory", "windows", "stress"],
    category: "vmware",
  },
  {
    name: "VMware Windows network corruption",
    description:
      "VMware Windows network corruption corrupts network packets on Windows OS based VMware VM.",
    tags: ["network", "windows", "corruption"],
    category: "vmware",
  },
  {
    name: "VMware Windows network duplication",
    description:
      "VMware Windows network duplication duplicates network packets on Windows OS based VMware VM.",
    tags: ["network", "windows", "duplication"],
    category: "vmware",
  },
  {
    name: "VMware Windows network latency",
    description:
      "VMware Windows network latency injects network latency on Windows OS based VMware VM.",
    tags: ["network", "windows", "latency"],
    category: "vmware",
  },
  {
    name: "VMware Windows network loss",
    description:
      "VMware Windows network loss injects network packet loss on Windows OS based VMware VM.",
    tags: ["network", "loss", "windows"],
    category: "vmware",
  },
  {
    name: "VMware Windows process kill",
    description:
      "VMware Windows process kill kills the target processes that are running as a part of a Windows OS based VMware VM.",
    tags: ["kill", "windows", "process"],
    category: "vmware",
  },
  {
    name: "VMware Windows service stop",
    description:
      "VMware Windows service stop stops the target system services running on a Windows OS based VMware VM.",
    tags: ["stop", "service", "windows"],
    category: "vmware",
  },
  {
    name: "VMware Windows time chaos",
    description:
      "VMware Windows time chaos simulates a time skew scenario on Windows OS based VMware VM.",
    tags: ["time", "windows"],
    category: "vmware",
  },
];
