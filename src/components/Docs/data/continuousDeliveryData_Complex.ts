import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants"

/* Define the cards - start */
// Featured Tutorials
export const featuredTutorials: CardItem[] = [
    {
      title: "Deploy a Helm Chart using Harness GitOps for Argo CD",
      module: MODULES.cd,
      icon: "img/icon_cd.svg",
      description: "Get started with Harness GitOps for Argo CD.",
      newDoc: true,
      type: [docType.Documentation],
      time: "8min",
      link: "/tutorials/cd-pipelines/kubernetes/helm-chart",
    },
    {
      title: "Deploy a Helm Chart using CD Community Edition",
      module: MODULES.cd,
      icon: "img/icon_cd.svg",
      description: "Use the 100% free, source-available, self-managed Harness CD Community Edition to automate Helm Chart deployments.",
      newDoc: true,
      type: [docType.Documentation],
      time: "10min",
      link: "/tutorials/cd-pipelines/kubernetes/helm-chart",
    },
  ];
  
  // Docs
  export const docsCards: CardSections = [
    {
      name: "Onboard with Continuous Delivery",
      description:
        "This topic covers CD Pipeline basics to get you ready to start building Pipelines easily.",
      list: [
        {
          title: "CD overview and key concepts",
          module: MODULES.cd,
          description:
            "This topic covers CD Pipeline basics to get you ready to start building Pipelines easily.",
          link: "/docs/continuous-delivery/onboard-cd/cd-concepts/cd-pipeline-basics",
        },
        {
          title: "CD pipeline modeling overview",
          module: MODULES.cd,
          description:
            "This topic describes how you use the Harness Continuous Delivery Abstraction Model.",
          link: "/docs/continuous-delivery/onboard-cd/cd-concepts/cd-pipeline-modeling-overview",
        },
        {
          title: "Services and environments overview",
          module: MODULES.cd,
          description:
            "This topic describes Harness Continuous Delivery (CD) services and environments.",
          link: "/docs/continuous-delivery/onboard-cd/cd-concepts/services-and-environments-overview",
        },
      ],
    },
    {
      name: "Services",
      list: [
        {
          title: "Add Inline Service Files Using File Store",
          module: MODULES.cd,
          description:
            "You can use Kubernetes manifests and other configuration files in Git repos or in the Harness File Store.",
          link: "/docs/continuous-delivery/cd-services/cd-services-general/add-inline-manifests-using-file-store",
        },
        {
          title: "Propagate CD services",
          module: MODULES.cd,
          description:
            "This topic describes how to propagate CD services between stages.",
          link: "/docs/continuous-delivery/cd-services/cd-services-general/propagate-and-override-cd-services",
        },
      ],
    },
    {
      name: "Infrastructure",
      list: [
        {
          title:
            "Provision Target Deployment Infra Dynamically with CloudFormation",
          module: MODULES.cd,
          description:
            "This topic describes how to provision a CD stage's deployment infrastructure resources using the CloudFormation Create Stack, Delete Stack, and Rollback Stack steps.",
          link: "/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/provision-target-deployment-infra-dynamically-with-cloud-formation",
        },
      ],
    },
    {
      name: "Execution",
      list: [
        {
          title: "Using HTTP Requests in CD Pipelines",
          module: MODULES.cd,
          description:
            "You can use the HTTP step to run HTTP methods containing URLs, methods, headers, assertions, and variables. It helps you avoid having script cURL commands for simple REST calls.",
          link: "/docs/continuous-delivery/cd-execution/cd-general-steps/using-http-requests-in-cd-pipelines",
        },
      ],
    },
    {
      name: "Deployments",
      list: [
        {
          title: "Deployment concepts and strategies",
          module: MODULES.cd,
          description:
            "You have likely heard terms like blue/green and canary when it comes to deploying code and applications into production. ",
          link: "/docs/continuous-delivery/cd-deployments-category/deployment-concepts",
        },
      ],
    },
    {
      name: "GitOps",
      list: [
        {
          title: "Harness GitOps Basics",
          module: MODULES.cd,
          description:
            "This topic describes the basic concepts of Harness GitOps.",
          link: "/docs/continuous-delivery/cd-gitops/harness-git-ops-basics",
        },
      ],
    },
    {
      name: "Advanced CD",
      list: [
        {
          title: "Kubernetes Deployments Basics",
          module: MODULES.cd,
          description:
            "This topic describes the concept of a Harness Kubernetes deployment by describing the high-level steps involved.",
          link: "/docs/continuous-delivery/cd-advanced/cd-kubernetes-category/kubernetes-deployments-overview",
        },
      ],
    },
    {
      name: "CD Dashboards",
      list: [
        {
          title: "Monitor Deployments and Services in CD Dashboards",
          module: MODULES.cd,
          description:
            "This topic describes how you can use DORA and other advanced metrics for deployments and services in CD Dashboards.",
          link: "/docs/continuous-delivery/cd-dashboards/monitor-cd-deployments",
        },
      ],
    },
    {
      name: "CD Tech Reference",
      list: [
        {
          title: "HTTP Step Reference",
          module: MODULES.cd,
          description: "This topic describes the settings for the HTTP step.",
          link: "/docs/continuous-delivery/cd-technical-reference/cd-gen-ref-category/http-step",
        },
      ],
    },
  ];
  /* Define the cards - end */