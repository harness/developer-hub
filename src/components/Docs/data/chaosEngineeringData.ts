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
    name: "Key features",
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
            "Execute kube-resilience chaos faults.",
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

