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
          link: "/docs/chaos-engineering/get-started/overview",
        },
        {
          title: "Key concepts",
          module: MODULES.ce,
          description:
            "Familiarize yourself with chaos engineering terminology.",
          link: "/docs/chaos-engineering/architecture-and-security/architecture/components",
        },
        {
          title: "Onboard with HCE",
          module: MODULES.ce,
          description:
            "Onboarding with Harness Chaos Engineering.",
          link: "/docs/chaos-engineering/onboarding/hce-onboarding",
        },
  ],
},
//];
// Feature highlights
  //export const featureHighlights: CardSections = [
{
    name: "Chaos faults",
      description:
        "",
        list: [
        {
          title: "AWS faults",
          module: MODULES.ce,
          description:
            "Execute AWS chaos faults.",
          link: "/docs/chaos-engineering/chaos-faults/aws/",
        },
        {
          title: "Kubernetes faults",
          module: MODULES.ce,
          description:
            "Execute Kubernetes chaos faults. ",
          link: "/docs/chaos-engineering/chaos-faults/kubernetes/",
        },
        {
          title: "Azure faults",
          module: MODULES.ce,
          description:
            "Execute Azure chaos faults.",
          link: "/docs/chaos-engineering/chaos-faults/azure/",
        },
        {
          title: "GCP faults",
          module: MODULES.ce,
          description:
            "Execute GCP chaos faults",
          link: "/docs/chaos-engineering/chaos-faults/gcp/",
        },
        {
          title: "VMware faults",
          module: MODULES.ce,
          description:
            "Execute VMware chaos faults.",
          link: "/docs/chaos-engineering/chaos-faults/vmware/",
        },
        {
          title: "Windows faults",
          module: MODULES.ce,
          description:
            "Execute Windows chaos faults.",
          link: "/docs/chaos-engineering/chaos-faults/windows/",
        },
        {
          title: "Load faults",
          module: MODULES.ce,
          description:
            "Execute load chaos faults.",
          link: "/docs/chaos-engineering/chaos-faults/load/",
        },
        {
          title: "Kube-resilience faults",
          module: MODULES.ce,
          description:
            "Execute kube-resilience chaos faults.",
          link: "/docs/chaos-engineering/chaos-faults/kube-resilience/",
        },
        {
          title: "Bring Your Own Chaos (BYOC) faults",
          module: MODULES.ce,
          description:
            "Bring your own chaos faults and execute them.",
          link: "/docs/chaos-engineering/chaos-faults/byoc/",
        },
        {
          title: "Cloud Foundry chaos faults",
          module: MODULES.ce,
          description:
            "Execute kube-resilience chaos faults.",
          link: "/docs/chaos-engineering/chaos-faults/cloud-foundry/",
        },
        {
          title: "SSH faults",
          module: MODULES.ce,
          description:
            "Execute SSH chaos faults.",
          link: "/docs/chaos-engineering/chaos-faults/ssh/",
        },
        {
          title: "Linux chaos faults",
          module: MODULES.ce,
          description:
            "Execute Linux chaos faults.",
          link: "/docs/chaos-engineering/chaos-faults/linux/",
        },
    ],
  },
//];

{
  name: "Key features",
    description:
      "",
      list: [
      {
        title: "GameDay",
        module: MODULES.ce,
        description:
          "Execute chaos experiments in the application during a specific period..",
        link: "/docs/category/gameday",
      },
      {
        title: "ChaosGuard",
        module: MODULES.ce,
        description:
          "Additional layer of security to minimize blast radius and mitigate potential security threats. ",
        link: "/docs/category/chaosguard",
      },
      {
        title: "Chaos dashboard",
        module: MODULES.ce,
        description:
          "Visualize important metrics and data associated with your experiment runs.",
        link: "/docs/category/chaos-dashboard",
      },
    {
      title: "Resilience Probes",
      module: MODULES.ce,
      description:
        "Monitor your application's health before, during, and after executing a chaos experiment.",
      link: "/docs/category/resilience-probes",
    },
    {
      title: "Service Discovery",
      module: MODULES.ce,
      description:
        "Determine connections made to and from your Kubernetes cluster. ",
      link: "/docs/category/service-discovery",
    },
    {
      title: "Application Maps",
      module: MODULES.ce,
      description:
        "Bind multiple interacting discovered services into a single object.",
      link: "/docs/category/application-maps",
    },
  ],
},

  //export const helpandFAQs: CardSections = [
    {
      name: "Help and FAQs",
      description:
        "",
      list: [
        {
      title: "Troubleshoot HCE",
      module: MODULES.ce,
      description:
        "Troubleshoot HCE.",
      link: "/docs/chaos-engineering/troubleshooting/",
    },
    {
      title: "HCE FAQs",
      module: MODULES.ce,
      description:
        "HCE FAQs.",
      link: "/kb/chaos-engineering/chaos-engineering-faq",
    },
   ],
 },
];

