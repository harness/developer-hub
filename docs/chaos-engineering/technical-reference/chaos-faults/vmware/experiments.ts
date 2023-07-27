import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "VMware CPU hog",
    description:
      "VMware CPU hog applies stress on the CPU resources on Linux OS based VMware VM.",
    tags: ["CPU"],
    category: "vmware",
  },
  {
    name: "VMware disk loss",
    description:
      "VMware disk loss detaches the disks that are attached to a Linux OS based VMware VM.",
    tags: ["disk-loss"],
    category: "vmware",
  },
  {
    name: "VMware DNS chaos",
    description:
      "VMware DNS chaos causes DNS errors in the VMware VMs for a specific duration.",
    tags: ["DNS"],
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
    tags: ["http"],
    category: "vmware",
  },
  {
    name: "VMware HTTP reset peer",
    description:
      "VMware HTTP reset peer injects HTTP reset chaos that stops the outgoing HTTP requests by resetting the TCP connection for the requests.",
    tags: ["http"],
    category: "vmware",
  },
  {
    name: "VMware IO stress",
    description:
      "VMware IO stress causes disk stress on the target VMware VMs. It aims to verify the resilience of applications that share this disk resource with the VM.",
    tags: ["io-stress"],
    category: "vmware",
  },
  {
    name: "VMware memory hog",
    description:
      "VMware memory hog fault consumes excessive memory resources on Linux OS based VMware VMs.",
    tags: ["memory"],
    category: "vmware",
  },
  {
    name: "VMware network latency",
    description:
      "VMware network latency injects network packet latency from the VMware VM(s) into the application (or service).",
    tags: ["network"],
    category: "vmware",
  },
  {
    name: "VMware network loss",
    description:
      "VMware network loss injects network packet loss from the VMware VM(s) into the application (or service).",
    tags: ["network"],
    category: "vmware",
  },
  {
    name: "VMware process kill",
    description:
      "VMware process kill kills the target processes that are running as a part of a Linux OS based VMware VM.",
    tags: ["kill"],
    category: "vmware",
  },
  {
    name: "VMware service stop",
    description:
      "VMware service stop stops the target system services running on a Linux OS based VMware VM.",
    tags: ["stop"],
    category: "vmware",
  },
  {
    name: "VMware VM power off",
    description:
      "VMware VM poweroff stops (or powers off) the VMware VMs for a specific duration.",
    tags: [],
    category: "vmware",
  },
  {
    name: "VMware Windows CPU Hog",
    description:
      "VMware Windows CPU Hog simulates a CPU hog scenario on Windows OS based VMware VM.",
    tags: ["cpu"],
    category: "vmware",
  },
  {
    name: "VMware Windows Memory Hog",
    description:
      "VMware Windows Memory Hog simulates a memory hog scenario on Windows OS based VMware VM.",
    tags: ["memory"],
    category: "vmware",
  },
  {
    name: "VMware Windows Blackhole Chaos",
    description:
      "VMware Windows Blackhole Chaos simulates a network blackhole scenario on Windows OS based VMware VM.",
    tags: ["network"],
    category: "vmware",
  },
  {
    name: "VMware Windows Network Latency",
    description:
      "VMware Windows Network Latency injects network latency on Windows OS based VMware VM.",
    tags: ["network"],
    category: "vmware",
  },
  {
    name: "VMware Windows Network Loss",
    description:
      "VMware Windows Network Loss injects network packet loss on Windows OS based VMware VM.",
    tags: ["network"],
    category: "vmware",
  },
  {
    name: "VMware Windows Network Corruption",
    description:
      "VMware Windows Network Corruption corrupts network packets on Windows OS based VMware VM.",
    tags: ["network"],
    category: "vmware",
  },
  {
    name: "VMware Windows Network Duplication",
    description:
      "VMware Windows Network Duplication duplicates network packets on Windows OS based VMware VM.",
    tags: ["network"],
    category: "vmware",
  },
  {
    name: "VMware Windows Service Stop",
    description:
      "VMware Windows Service Stop stops the target system services running on a Windows OS based VMware VM.",
    tags: ["stop"],
    category: "vmware",
  },
  {
    name: "VMware Windows Process Kill",
    description:
      "VMware Windows Process Kill kills the target processes that are running as a part of a Windows OS based VMware VM.",
    tags: ["kill"],
    category: "vmware",
  },
  {
    name: "VMware Windows Disk Fill",
    description:
      "VMware Windows Disk Fill fills the disk space on Windows OS based VMware VM.",
    tags: ["disk"],
    category: "vmware",
  },
  {
    name: "VMware Windows Time Chaos",
    description:
      "VMware Windows Time Chaos simulates a time skew scenario on Windows OS based VMware VM.",
    tags: ["time"],
    category: "vmware",
  },
];
