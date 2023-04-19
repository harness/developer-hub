import {
  CardItem,
  CardSections,
  docType,
} from "../../LandingPage/TutorialCard";

/* Define the cards - start */
// Featured Tutorials
export const featuredTutorials: CardItem[] = [
    {
      title: "Deploy a Helm Chart using Harness GitOps for Argo CD",
      module: "cd",
      icon: "img/icon_cd.svg",
      description: "Get started with Harness GitOps for Argo CD.",
      newDoc: true,
      type: [docType.Documentation],
      time: "8min",
      link: "/tutorials/deploy-services/helm-argocd-gitops-k8s",
    },
    {
      title: "Deploy a Helm Chart using CD Community Edition",
      module: "cd",
      icon: "img/icon_cd.svg",
      description: "Use the 100% free, source-available, self-managed Harness CD Community Edition to automate Helm Chart deployments.",
      newDoc: true,
      type: [docType.Documentation],
      time: "10min",
      link: "/tutorials/deploy-services/cdce-helm-k8s",
    },
  ];
  
  // Docs
  export const docsCards: CardSections = [
    /*{
      name: "Documentation Topics",
      description:
        "",
      list: [
        {
          title: "Get started with Continuous Delivery",
          module: "cd",
          description:
            "Learn the basics of Harness Continuous Delivery.",
          link: "/docs/category/get-started",
        },
        {
          title: "Integrations",
          module: "cd",
          description:
            "See the tools and platforms you can use to deploy your apps.",
          link: "/docs/continuous-delivery/integrations/cd-integrations",
        },
        {
          title: "Provision infrastructure",
          module: "cd",
          description:
            "Provision infrastructures for your deployments.",
          link: "/docs/category/provision-infrastructure",
        },
        {
          title: "Deploy services on different platforms",
          module: "cd",
          description:
            "Platform-specific deployment types.",
          link: "/docs/category/deploy-services-on-different-platforms",
        },
        {
          title: "Cross-platform CD features",
          module: "cd",
          description:
            "Features common to all deployment types.",
          link: "/docs/category/cross-platform-cd-features",
        },
        {
          title: "Verify deployments",
          module: "cd",
          description:
            "Use Harness Continuous Verification (CV) to verify your deployments.",
          link: "/docs/category/verify-deployments",
        },
        {
          title: "Manage deployments",
          module: "cd",
          description:
            "Control deployment resources and schedules.",
          link: "/docs/continuous-delivery",
        },
        {
          title: "Monitor deployments",
          module: "cd",
          description:
            "Use DORA and other advanced metrics for deployments.",
          link: "/docs/category/monitor-deployments",
        },
        {
          title: "GitOps",
          module: "cd",
          description:
            "Perform GitOps deployments in Harness.",
          link: "/docs/category/gitops",
        },
      ],
    },*/
    {
      name: "Get started with CD",
      description:
        "",
      list: [
        {
          title: "Get started",
          module: "cd",
          description:
            "Learn the basics of Harness Continuous Delivery",
          link: "/docs/category/get-started",
        },
        {
          title: "Upgrade to CD NextGen",
          module: "cd",
          description:
            "Upgrade from CD FirstGen to NextGen.",
          link: "/docs/category/upgrading-cd",
        },
        {
          title: "Integrations",
          module: "cd",
          description:
            "See the tools and platforms you can use to deploy your apps.",
          link: "/docs/continuous-delivery/integrations/cd-integrations",
        },
        {
          title: "Cross-platform CD features",
          module: "cd",
          description:
            "Learn about the CD features that are common to all deployment types.",
          link: "/docs/category/cross-platform-cd-features",
        },
      ],
    },
    {
      name: "Infrastructure provisioning",
      description:
        "",
      list: [
        {
          title: "Terraform",
          module: "cd",
          description:
            "Use Terraform to provision infrastructure as part of your deployment process.",
          link: "/docs/category/terraform",
        },
        {
          title: "CloudFormation",
          module: "cd",
          description:
            "Use CloudFormation to provision infrastructure as part of your deployment process.",
          link: "/docs/category/cloudformation",
        },
        {
          title: "Terragrunt",
          module: "cd",
          description:
            "Use Terragrunt to provision infrastructure as part of your deployment process.",
          link: "/docs/continuous-delivery/cd-infrastructure/terragrunt/terragrunt-howtos",
        },
      ],
    },
    {
      name: "Deploy services on different platforms",
      description:
        "",
      list: [
        {
          title: "Community Edition",
          module: "cd",
          description:
            "Set up Harness CD Community Edition locally and create a CD pipeline that deploys a publicly available Kubernetes artifact and manifest to a local cluster.",
          link: "/docs/category/community-edition",
        },
        {
          title: "Kubernetes",
          module: "cd",
          description:
            "Deploy a publicly available Kubernetes artifact and manifest into your Kubernetes cluster using Harness.",
          link: "/docs/category/kubernetes",
        },
        {
          title: "Helm",
          module: "cd",
          description:
            "Deploy a publicly available Docker image to your Kubernetes cluster using Helm charts using Harness.",
          link: "/docs/category/helm",
        },
        {
          title: "Native Helm",
          module: "cd",
          description:
            "Perform Native Helm deployments using Harness.",
          link: "/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm/native-helm-quickstart",
        },
        {
          title: "Kustomize",
          module: "cd",
          description:
            "Customize Kubernetes deployments using Kustomize in Harness.",
          link: "/docs/category/kustomize",
        },
        {
          title: "Microsoft Azure",
          module: "cd",
          description:
            "Deploy containerized or non-containerized artifacts using Microsoft Azure using Harness.",
          link: "/docs/category/azure",
        },
        {
          title: "Amazon Web Services (AWS)",
          module: "cd",
          description:
            "Deploy AWS Auto Scale Groups (ASG) and instances to Amazon Elastic Compute Cloud (EC2), and images to your Amazon Elastic Container Service (ECS) using Harness.",
          link: "/docs/category/aws",
        },
        {
          title: "Google Cloud",
          module: "cd",
          description:
            "Deploy new Cloud Functions to Google Cloud using Harness.",
          link: "/docs/continuous-delivery/deploy-srv-diff-platforms/google/google-functions",
        },
        {
          title: "Serverless Framework",
          module: "cd",
          description:
            "Deploy a Serverless Lambda application to AWS Lambda using Harness.",
          link: "/docs/continuous-delivery/deploy-srv-diff-platforms/serverless-framework/serverless-lambda-cd-quickstart",
        },
        {
          title: "Tanzu Application Services (TAS)",
          module: "cd",
          description:
            "Deploy a publicly available application to your TAS space using Harness.",
          link: "/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart",
        },
        {
          title: "Traditional deployments",
          module: "cd",
          description:
            "Deploy to any platform using SSH or WinRM using Harness.",
          link: "/docs/category/traditional-deployments",
        },
        {
          title: "Custom deployments",
          module: "cd",
          description:
            "Deploy non-native applications using custom Deployment Templates in Harness.",
          link: "/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployments/custom-deployment-tutorial",
        },
      ],
    }, 
    {
      name: "Featured contents",
      description:
        "",
      list: [
        {
          title: "Verify deployments",
          module: "cd",
          description:
            "Use Harness Continuous Verification (CV) to verify your deployments.",
          link: "/docs/category/verify-deployments",
        },
        {
          title: "Manage deployments",
          module: "cd",
          description:
            "Control deployment resources and schedules.",
          link: "/docs/category/manage-deployments",
        },
        {
          title: "Monitor deployments",
          module: "cd",
          description:
            "Use DORA and other advanced metrics for deployments.",
          link: "/docs/category/monitor-deployments",
        },
        {
          title: "GitOps",
          module: "cd",
          description:
            "Perform GitOps deployments in Harness.",
          link: "/docs/category/gitops",
        },
      ],
    },
  ];
  /* Define the cards - end */