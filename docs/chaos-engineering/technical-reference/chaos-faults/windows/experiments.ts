import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "VMware Windows CPU Hog",
    description:
      "VMware Windows CPU Hog simulates a CPU hog scenario on Windows OS based VMware VM.",
    tags: ["cpu"],
    category: "windows",
  },
  {
    name: "VMware Windows Memory Hog",
    description:
      "VMware Windows Memory Hog simulates a memory hog scenario on Windows OS based VMware VM.",
    tags: ["memory"],
    category: "windows",
  },
  {
    name: "VMware Windows Blackhole Chaos",
    description:
      "VMware Windows Blackhole Chaos simulates a network blackhole scenario on Windows OS based VMware VM.",
    tags: ["network"],
    category: "windows",
  },
  {
    name: "VMware Windows Network Latency",
    description:
      "VMware Windows Network Latency injects network latency on Windows OS based VMware VM.",
    tags: ["network"],
    category: "windows",
  },
  {
    name: "VMware Windows Network Loss",
    description:
      "VMware Windows Network Loss injects network packet loss on Windows OS based VMware VM.",
    tags: ["network"],
    category: "windows",
  },
  {
    name: "VMware Windows Network Corruption",
    description:
      "VMware Windows Network Corruption corrupts network packets on Windows OS based VMware VM.",
    tags: ["network"],
    category: "windows",
  },
  {
    name: "VMware Windows Network Duplication",
    description:
      "VMware Windows Network Duplication duplicates network packets on Windows OS based VMware VM.",
    tags: ["network"],
    category: "windows",
  },
  {
    name: "VMware Windows Service Stop",
    description:
      "VMware Windows Service Stop stops the target system services running on a Windows OS based VMware VM.",
    tags: ["stop"],
    category: "windows",
  },
  {
    name: "VMware Windows Process Kill",
    description:
      "VMware Windows Process Kill kills the target processes that are running as a part of a Windows OS based VMware VM.",
    tags: ["kill"],
    category: "windows",
  },
  {
    name: "VMware Windows Disk Stress",
    description:
      "VMware Windows Disk Stress fills the disk space on Windows OS based VMware VM.",
    tags: ["disk"],
    category: "windows",
  },
  {
    name: "VMware Windows Time Chaos",
    description:
      "VMware Windows Time Chaos simulates a time skew scenario on Windows OS based VMware VM.",
    tags: ["time"],
    category: "windows",
  },
  {
    name: "Windows EC2 blackhole chaos",
    description:
      "Windows EC2 blackhole chaos results in access loss to the given target hosts or IPs by injecting firewall rules.",
    tags: ["EC2"],
    category: "windows",
  },
  {
    name: "Windows EC2 CPU hog",
    description:
      "EC2 windows CPU hog induces CPU stress on the AWS Windows EC2 instances using Amazon SSM Run command.",
    tags: ["CPU"],
    category: "windows",
  },
  {
    name: "Windows EC2 memory hog",
    description:
      "Windows EC2 memory hog induces memory stress on the target AWS Windows EC2 instance using Amazon SSM Run command.",
    tags: ["memory"],
    category: "windows",
  },
];
