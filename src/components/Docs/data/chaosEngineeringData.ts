import {
  CardItem,
  CardSections,
  docType,
} from "../../LandingPage/TutorialCard";
import { MODULES } from "../../../constants"

/* Define the cards - start */

// Docs
  export const docsCards: CardSections = [
    {
      name: "Get started",
      description:
        "",
      list: [
        {
          title: "Introduction to Chaos engineering",
          module: MODULES.ce,
          description:
            "Learn the basics of Harness Chaos Engineering.",
          link: "/docs/chaos-engineering/get-started/introduction-to-chaos-module",
        },
        {
          title: "Terminologies",
          module: MODULES.ce,
          description:
            "Familiarize with chaos engineering terminologies.",
          link: "/docs/chaos-engineering/get-started/terminologies",
        },
  ],
},
];

// Feature highlights
  export const featureHighlights: CardSections = [
        {
          title: "AWS Faults",
          module: MODULES.ce,
          description:
            "Execute AWS chaos faults",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/",
        },
        {
          title: "Kubernetes Faults",
          module: MODULES.ce,
          description:
            "Execute Kubernetes chaos faults ",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/",
        },
        {
          title: "Azure Faults",
          module: MODULES.ce,
          description:
            "Execute Azure chaos faults",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/azure/",
        },
        {
          title: "GCP Faults",
          module: MODULES.ce,
          description:
            "Execute GCP chaos faults",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/gcp/",
        },
        {
          title: "VMware Faults",
          module: MODULES.ce,
          description:
            "Execute VMware chaos faults",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/",
        },
        {
          title: "Load Faults",
          module: MODULES.ce,
          description:
            "Execute load chaos faults",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/load/",
        },
        {
          title: "Kube Resilience Faults",
          module: MODULES.ce,
          description:
            "Execute kube-resilience chaos faults",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/kube-resilience/",
        },
];

// Featured Tutorials
export const featuredTutorials: CardItem[] = [
    {
      title: "Run your first chaos experiment on a Kubernetes cluster",
      module: MODULES.ce,
      icon: "img/icon_ce.svg",
      description: "Get started with Harness Chaos Engineering.",
      newDoc: true,
      type: [docType.Documentation],
      time: "10min",
      link: "/tutorials/run-chaos-experiments/first-chaos-engineering",
    },
    {
      title: "Running chaos experiments in GitLab pipelines",
      module: MODULES.ce,
      icon: "img/icon_ce.svg",
      description: "Create Harness chaos experiments and run them in GitLab pipelines.",
      newDoc: true,
      type: [docType.Documentation],
      time: "15min",
      link: "/tutorials/run-chaos-experiments/chaos-experiments-on-gitlab",
    },
    {
      title: "Run your first chaos experiment on a Kubernetes cluster using API",
      module: MODULES.ce,
      icon: "img/icon_ce.svg",
      description: "Get started with Harness Chaos Engineering API.",
      newDoc: true,
      type: [docType.Documentation],
      time: "10min",
      link: "/tutorials/run-chaos-experiments/first-chaos-experiment-via-API",
    },
  ];
  /* Define the cards - end */