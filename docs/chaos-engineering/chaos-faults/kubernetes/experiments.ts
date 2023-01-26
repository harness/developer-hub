import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
{
    name: "Docker service kill",
    description: "Docker service kill makes the application unreachable on the account of the node turning unschedulable (NotReady).",
    tags: [ "node"],
    category: "kubernetes",
  },
  {
    name: "Kubelet Service Kill",
    description:"Kubelet service kill makes the application unreachable on the account of the node turning unschedulable (NotReady).",
    tags: ["node"],
    category: "kubernetes",
  },
{
    name: "Node CPU hog",
    description:"Node CPU hog exhausts the CPU resources on a Kubernetes node.",
    tags: ["node"],
    category: "kubernetes",
  },
  {
    name: "Node drain",
    description:"Node drain drains the node of all its resources running on it.",
    tags: ["node"],
    category: "kubernetes",
  },
  {
    name: "Node IO stress",
    description:"Node IO stress causes I/O stress on the Kubernetes node. ",
    tags: ["node"],
    category: "kubernetes",
  },
  {
    name: "Node memory hog",
    description:"Node memory hog causes memory resource exhaustion on the Kubernetes node. ",
    tags: ["node"],
    category: "kubernetes",
  },
  {
    name: "Node restart",
    description:"Node restart disrupts the state of the node by restarting it.",
    tags: ["node"],
    category: "kubernetes",
  },
  {
    name: "Node taint",
    description:"Node taint taints (contaminates) the node by applying the desired effect. ",
    tags: ["node"],
    category: "kubernetes",
  },

];
