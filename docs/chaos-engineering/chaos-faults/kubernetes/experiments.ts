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

{
    name: "Container kill",
    description:"Container kill is a Kubernetes pod-level chaos fault that causes container failure on specific (or random) replicas of an application resource.",
    tags: ["pod"],
    category: "kubernetes",
  },
  {
    name: "Disk fill",
    description:"Disk fill is a Kubernetes pod-level chaos fault that applies disk stress by filling the pod's ephemeral storage on a node.",
    tags: ["pod"],
    category: "kubernetes",
  },
  {
    name: "Pod autoscaler",
    description:"Pod autoscaler is a Kubernetes pod-level chaos fault that determines whether nodes can accomodate multiple replicas of a given application pod.",
    tags: ["pod"],
    category: "kubernetes",
  },
  {
    name: "Pod CPU hog exec",
    description:"Pod CPU hog exec is a Kubernetes pod-level chaos fault that consumes excess CPU resources of the application container.",
    tags: ["pod"],
    category: "kubernetes",
  },
  {
    name: "Pod CPU hog",
    description:"Pod CPU hog exec is a Kubernetes pod-level chaos fault that consumes excess CPU resources of the application container.",
    tags: ["pod"],
    category: "kubernetes",
  },
  {
    name: "Pod delete",
    description:"Pod delete is a Kubernetes pod-level chaos fault that causes specific (or random) replicas of an application resource to fail forcibly (or gracefully).",
    tags: ["pod"],
    category: "kubernetes",
  },
  {
    name: "Pod DNS error",
    description:"Pod DNS error is a Kubernetes pod-level chaos fault that injects chaos to disrupt DNS resolution in pods.",
    tags: ["pod"],
    category: "kubernetes",
  },
  {
    name: "Pod DNS spoof",
    description:"Pod DNS spoof is a Kubernetes pod-level chaos fault that injects chaos into pods to mimic DNS resolution.",
    tags: ["pod"],
    category: "kubernetes",
  },
  {
    name: "Pod HTTP latency",
    description:"Pod HTTP latency is a Kubernetes pod-level chaos fault that injects HTTP response latency by starting proxy server and redirecting the traffic through it.",
    tags: ["pod"],
    category: "kubernetes",
  },
  {
    name: "Pod HTTP modify body",
    description:"Pod HTTP modify body is a Kubernetes pod-level chaos fault that injects chaos on the service whose port is provided using the `TARGET_SERVICE_PORT` environment variable. ",
    tags: ["pod"],
    category: "kubernetes",
  },
  {
    name: "Pod HTTP modify header",
    description:"Pod HTTP modify header is a Kubernetes pod-level chaos fault that injects chaos on the service whose port is provided using the `TARGET_SERVICE_PORT` environment variable.",
    tags: ["pod"],
    category: "kubernetes",
  },
  {
    name: "Pod HTTP reset peer",
    description:" ",
    tags: ["pod"],
    category: "kubernetes",
  },
  {
    name: "Pod HTTP status code",
    description:" ",
    tags: ["pod"],
    category: "kubernetes",
  },
];
