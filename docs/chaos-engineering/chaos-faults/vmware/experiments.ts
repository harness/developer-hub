import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "VMware CPU hog",
    description: "VMware CPU hog applies stress on the CPU resources on Linux OS based VMware VM.",
    tags: ["vmware", "CPU"],
    category: "vmware",
  },
  {
    name: "VMware disk loss",
    description: "VMware disk loss detaches the disks that are attached to a Linux OS based VMware VM.",
    tags: ["vmware", "disk-loss"],
    category: "vmware",
  },
  {
    name: "VMware DNS chaos",
    description: "VMware DNS chaos causes DNS errors in the VMware VMs for a specific duration.",
    tags: ["vmware", "DNS"],
    category: "vmware",
  },
  {
    name: "VMware host reboot",
    description: "VMware host reboot reboots a VMware host that is attached to the Vcenter.",
    tags: ["vmware", "reboot"],
    category: "vmware",
  },
  {
    name: "VMware HTTP latency",
    description: "This is a description of experiment 1",
    tags: ["vmware", "http", "latency"],
    category: "vmware",
  },
  {
    name: "VMware HTTP modify response",
    description: "This is a description of experiment 1",
    tags: ["vmware", "http"],
    category: "vmware",
  },
  {
    name: "VMware HTTP reset peer",
    description: "This is a description of experiment 1",
    tags: ["vmware","http" ],
    category: "vmware",
  },
  {
    name: "VMware IO stress",
    description: "This is a description of experiment 1",
    tags: ["vmware", "io-stress"],
    category: "vmware",
  },
  {
    name: "VMware memory hog",
    description: "This is a description of experiment 1",
    tags: ["vmware", "memory"],
    category: "vmware",
  },
  {
    name: "VMware network latency",
    description: "This is a description of experiment 1",
    tags: ["vmware", "network"],
    category: "vmware",
  },
  {
    name: "VMware network loss",
    description: "This is a description of experiment 1",
    tags: ["vmware", "network"],
    category: "vmware",
  },
  {
    name: "VMware process kill",
    description: "This is a description of experiment 1",
    tags: ["vmware", "kill" ],
    category: "vmware",
  },
  {
    name: "VMware service stop",
    description: "This is a description of experiment 1",
    tags: ["vmware", "stop"],
    category: "vmware",
  },
  {
    name: "VMware VM poweroff",
    description: "This is a description of experiment 1",
    tags: ["vmware", ],
    category: "vmware",
  },
];
