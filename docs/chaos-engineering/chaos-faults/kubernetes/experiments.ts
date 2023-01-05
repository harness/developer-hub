import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Pod memory hog",
    description: "This is a description of pod memory hog",
    tags: ["tag1", "pod"],
    category: "kubernetes",
  },
  {
    name: "Pod CPU hog",
    description: "This is a description of experiment 1",
    tags: ["tag1", "pod"],
    category: "kubernetes",
  },
  {
    name: "Pod memory hog exec",
    description:
      "This is a description of experiment 2. This is a description of experiment 2. This is a description of experiment 2. This is a description of experiment 2",
    tags: ["node", "tag2"],
    category: "kubernetes",
  },
  {
    name: "Pod CPU hog exec",
    description: "This is a description of experiment 2",
    tags: ["tag3", "pod"],
    category: "kubernetes",
  },
  {
    name: "Pod network latency",
    description: "This is a description of experiment 1",
    tags: ["tag1", "pod"],
    category: "kubernetes",
  },
  {
    name: "Pod network loss",
    description:
      "This is a description of experiment 2. This is a description of experiment 2. This is a description of experiment 2. This is a description of experiment 2",
    tags: ["node", "tag2"],
    category: "kubernetes",
  },
  {
    name: "Pod DNS error",
    description: "This is a description of experiment 2",
    tags: ["tag3", "pod"],
    category: "kubernetes",
  },
  {
    name: "Pod network duplication",
    description: "This is a description of experiment 1",
    tags: ["tag1", "pod"],
    category: "kubernetes",
  },
  {
    name: "Pod network corruption",
    description:
      "This is a description of experiment 2. This is a description of experiment 2. This is a description of experiment 2. This is a description of experiment 2",
    tags: ["node", "tag2"],
    category: "kubernetes",
  },
  {
    name: "Pod DNS spoof",
    description:
      "This is a description of experiment 2. This is a description of experiment 2. This is a description of experiment 2. This is a description of experiment 2",
    tags: ["node", "tag2"],
    category: "kubernetes",
  },
  {
    name: "Pod autoscaler",
    description: "This is a description of experiment 2",
    tags: ["tag3", "pod"],
    category: "kubernetes",
  },
];
