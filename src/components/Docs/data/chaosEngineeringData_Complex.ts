import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants"

/* Define the cards - start */
  
  // Feature highlights
  export const featureHighlights: CardSections = [
    {
      name: "Chaos faults",
      description:
        "",
      list: [
        {
          title: "AWS faults",
          module: MODULES.ce,
          description:
            "Execute AWS chaos faults",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/aws/",
        },
        {
          title: "Kubernetes faults",
          module: MODULES.ce,
          description:
            "Execute Kubernetes chaos faults ",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/",
        },
        {
          title: "Azure faults",
          module: MODULES.ce,
          description:
            "Execute Azure chaos faults",
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
            "Execute VMware chaos faults",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/vmware/",
        },
        {
          title: "Windows faults",
          module: MODULES.ce,
          description:
            "Execute Windows chaos faults",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/windows/",
        },
        {
          title: "SSH faults",
          module: MODULES.ce,
          description:
            "Execute SSH chaos faults",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/ssh/",
        },
        {
          title: "Load faults",
          module: MODULES.ce,
          description:
            "Execute load chaos faults",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/load/",
        },
        {
          title: "Kube-resilience faults",
          module: MODULES.ce,
          description:
            "Execute kube-resilience chaos faults",
          link: "/docs/chaos-engineering/technical-reference/chaos-faults/kube-resilience/",
        },
  ],
},
];

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
          link: "/docs/chaos-engineering/get-started/overview",
        },
      ],
    },

    {
      name: "Key concepts",
      list: [
        {
          title: "Familiarize with chaos engineering concepts",
          module: MODULES.ce,
          description:
            "Familiarize with chaos engineering concepts.",
          link: "/docs/chaos-engineering/get-started/key-concepts",
        },
      ],
    }, 
      ];
  /* Define the cards - end */