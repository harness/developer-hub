import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Azure AKS node down",
    description:
      "Deallocate a percentage of AKS worker VMs (selected by node pool and zone) for a configurable duration, then start them again.",
    tags: ["AKS", "node down", "kubernetes"],
    category: "azure",
  },
  {
    name: "Azure disk loss",
    description:
      "Detach one or more managed data disks from their attached VMs for a configurable duration, then reattach them on the same LUN.",
    tags: ["disk loss"],
    category: "azure",
  },
  {
    name: "Azure instance CPU hog",
    description:
      "Drive CPU utilization to a configurable target on one or more Azure VMs for a configurable duration via the VM run-command extension.",
    tags: ["CPU hog"],
    category: "azure",
  },
  {
    name: "Azure instance IO stress",
    description:
      "Drive sustained disk read/write IO on one or more Azure VMs for a configurable duration via the VM run-command extension.",
    tags: ["I/O stress"],
    category: "azure",
  },
  {
    name: "Azure instance memory hog",
    description:
      "Consume a configurable amount of memory on one or more Azure VMs for a configurable duration via the VM run-command extension.",
    tags: ["memory hog"],
    category: "azure",
  },
  {
    name: "Azure instance stop",
    description:
      "Stop one or more Azure VMs (or VMSS instances) for a configurable duration, then start them again.",
    tags: ["azure"],
    category: "azure",
  },
  {
    name: "Azure Service Bus queue state change",
    description:
      "Change the operational status of one or more Service Bus queues (Disabled, SendDisabled, ReceiveDisabled) for a configurable duration, then restore Active.",
    tags: ["service bus", "messaging"],
    category: "azure",
  },
  {
    name: "Azure web app access restrict",
    description:
      "Add an Access Restriction rule to one or more App Service web apps for a configurable duration so callers in the blocked range receive 403 Forbidden.",
    tags: ["restrict access"],
    category: "azure",
  },
  {
    name: "Azure web app stop",
    description:
      "Stop one or more App Service web apps for a configurable duration, then start them again.",
    tags: ["stop"],
    category: "azure",
  },
];
