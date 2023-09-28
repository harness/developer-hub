import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants"

/* Define the cards - start */

// Docs
  export const docsCards: CardSections = [
    {
      name: "Get started",
      description:
        "",
      list: [
        {
          title: "Build resilient applications with chaos engineering",
          module: MODULES.ce,
          description:
            "Learn the basics of Harness Chaos Engineering.",
          link: "/docs/chaos-engineering/get-started/introduction-to-chaos-module",
        },
        {
          title: "Terminology",
          module: MODULES.ce,
          description:
            "Familiarize yourself with chaos engineering terminology.",
          link: "/docs/chaos-engineering/get-started/terminologies",
        },
  ],
},
];

// Feature highlights
  export const featureHighlights: CardSections = [
        {
          title: "AWS faults",
          module: MODULES.ce,
          description:
            "Execute AWS chaos faults.",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/",
        },
        {
          title: "Kubernetes faults",
          module: MODULES.ce,
          description:
            "Execute Kubernetes chaos faults. ",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/",
        },
        {
          title: "Azure faults",
          module: MODULES.ce,
          description:
            "Execute Azure chaos faults.",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/azure/",
        },
        {
          title: "GCP faults",
          module: MODULES.ce,
          description:
            "Execute GCP chaos faults",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/gcp/",
        },
        {
          title: "VMware faults",
          module: MODULES.ce,
          description:
            "Execute VMware chaos faults.",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/",
        },
        {
          title: "Load faults",
          module: MODULES.ce,
          description:
            "Execute load chaos faults.",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/load/",
        },
        {
          title: "Kube-resilience faults",
          module: MODULES.ce,
          description:
            "Execute kube-resilience chaos faults.",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/kube-resilience/",
        },
        {
          title: "Security chaos faults",
          module: MODULES.ce,
          description:
            "Execute security chaos faults.",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/security-chaos/",
        },
        {
          title: "Linux chaos faults",
          module: MODULES.ce,
          description:
            "Execute Linux chaos faults.",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/linux/",
        },
];

// Featured Tutorials
export const featuredTutorials: CardItem[] = [
    {
      title: "Run your first chaos experiment on a Kubernetes cluster",
      module: MODULES.ce,
      icon: "img/icon_ce.svg",
      description: "Execute your first chaos experiment on a Kubernetes cluster.",
      newDoc: true,
      type: [docType.Documentation],
      time: "10min",
      link: "/tutorials/chaos-experiments/first-chaos-engineering",
    },
    {
      title: "Running chaos experiments in GitLab pipelines",
      module: MODULES.ce,
      icon: "img/icon_ce.svg",
      description: "Create Harness chaos experiments and run them in GitLab pipelines.",
      newDoc: true,
      type: [docType.Documentation],
      time: "15min",
      link: "/tutorials/chaos-experiments/chaos-experiments-on-gitlab",
    },
    {
      title: "Run your first chaos experiment on a Kubernetes cluster using API",
      module: MODULES.ce,
      icon: "img/icon_ce.svg",
      description: "Get started with Harness Chaos Engineering API.",
      newDoc: true,
      type: [docType.Documentation],
      time: "10min",
      link: "/tutorials/chaos-experiments/first-chaos-experiment-via-API",
    },
  ];
  /* Define the cards - end */