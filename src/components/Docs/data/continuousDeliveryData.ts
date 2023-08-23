import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants"

/* Define the cards - start */
export const featuredTutorials: CardItem[] = []
/* Uncomment if you want to show the Featured Tutorials section -->
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
  */
  
  // Docs
  export const docsCards: CardSections = [
    {
      name: "Get started with CD",
      description:
        "",
      list: [
        {
          title: "CD tutorials",
          module: MODULES.cd,
          description:
            "Learn how to set up CD pipelines to automate service deployments on your infrastructure.",
          link: "/tutorials/cd-pipelines",
        },
        {
          title: "Get started",
          module: MODULES.cd,
          description:
            "Learn the basics of Harness Continuous Delivery (CD).",
          link: "/docs/category/get-started",
          // @Roshni: sample code for the sub categories -->
          /*children: [
            {
              title: "CD pipeline basics",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/get-started/cd-pipeline-basics",
            },
            {
              title: "CD pipeline modelling overview",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/get-started/cd-pipeline-modeling-overview",
            },
            {
              title: "Create your first CD pipeline",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/get-started/create-first-pipeline",
            },
            {
              title: "Integrate CD with other Harness modules",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/get-started/integrating-CD-other-modules",
            },
            {
              title: "Server based licensing and usage",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/get-started/service-licensing-for-cd",
            },
            {
              title: "CD ecosystem",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/cd-integrations",
            },
          ]*/
          // <-- sample code end
        },
        {
          title: "Upgrade to CD NextGen",
          module: MODULES.cd,
          description:
            "Upgrade from CD FirstGen to NextGen.",
          link: "/docs/category/upgrading-cd",
          /*children: [
            {
              title: "Upgrade to NextGen",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/get-started/upgrading/upgrade-nextgen-cd",
            },
            {
              title: "Upgrade to service and environment V2",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/get-started/upgrading/upgrade-cd-v2",
            },
            {
              title: "FirstGen and NextGen parity matrix",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/get-started/upgrading/feature-parity-matrix",
            },

            {
              title: "Upgrade FAQs",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/get-started/upgrading/cdng-upgrade-faq",
            },
          ]*/
        },
        {
          title: "Supported CD features and integrations",
          module: MODULES.cd,
          description:
            "See the list of tools and platforms you can use in Harness for deploying your applications.",
          link: "/docs/continuous-delivery/cd-integrations",
        },
      ],
    },
    {
      name: "Key features",
      description:
        "",
      list: [ 
        {
          title: "Common CD features across platforms",
          module: MODULES.cd,
          description:
            "Learn about the CD features that are common to all deployment types.",
          link: "/docs/category/cross-platform-cd-features",
          /*children: [
            {
              title: "Services",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/category/services",
            },
            {
              title: "Environments",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/category/environments",
            },
            {
              title: "Executions",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/category/executions",
            },

            {
              title: "Steps",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/category/steps",
            },
            {
              title: "Templates",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/category/templates",
            },
            {
              title: "Advanced CD use cases",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/category/advanced-cd-use-cases",
            },
          ]*/
        },
        {
          title: "Deploy services on different platforms",
          module: MODULES.cd,
          description:
            "Create CD pipelines that deploy applications on different platforms using Harness.",
          link: "/docs/category/deploy-services-on-different-platforms",
          /*children: [
            {
              title: "Kubernetes",
              module: MODULES.cd,
              description:
                "Deploy a publicly available Kubernetes artifact and manifest into your Kubernetes cluster using Harness.",
              link: "/docs/category/kubernetes",
            },
            {
              title: "Helm",
              module: MODULES.cd,
              description:
                "Deploy a publicly available Docker image to your Kubernetes cluster using Helm charts using Harness.",
              link: "/docs/category/helm",
            },
            {
              title: "Native Helm",
              module: MODULES.cd,
              description:
                "Perform Native Helm deployments using Harness.",
              link: "/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm/native-helm-quickstart",
            },
            {
              title: "Kustomize",
              module: MODULES.cd,
              description:
                "Customize Kubernetes deployments using Kustomize in Harness.",
              link: "/docs/category/kustomize",
            },
            {
              title: "Microsoft Azure",
              module: MODULES.cd,
              description:
                "Deploy containerized or non-containerized artifacts using Microsoft Azure using Harness.",
              link: "/docs/category/azure",
            },
            {
              title: "Amazon Web Services (AWS)",
              module: MODULES.cd,
              description:
                "Deploy AWS Auto Scale Groups (ASG) and instances to Amazon Elastic Compute Cloud (EC2), and images to your Amazon Elastic Container Service (ECS) using Harness.",
              link: "/docs/category/aws",
            },
            {
              title: "Google Cloud",
              module: MODULES.cd,
              description:
                "Deploy new Cloud Functions to Google Cloud using Harness.",
              link: "/docs/continuous-delivery/deploy-srv-diff-platforms/google/google-functions",
            },
            {
              title: "Serverless Framework",
              module: MODULES.cd,
              description:
                "Deploy a Serverless Lambda application to AWS Lambda using Harness.",
              link: "/docs/continuous-delivery/deploy-srv-diff-platforms/serverless-framework/serverless-lambda-cd-quickstart",
            },
            {
              title: "Tanzu Application Services (TAS)",
              module: MODULES.cd,
              description:
                "Deploy a publicly available application to your TAS space using Harness.",
              link: "/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart",
            },
            {
              title: "Traditional deployments",
              module: MODULES.cd,
              description:
                "Deploy to any platform using SSH or WinRM using Harness.",
              link: "/docs/category/traditional-deployments",
            },
            {
              title: "Custom deployments",
              module: MODULES.cd,
              description:
                "Deploy non-native applications using custom Deployment Templates in Harness.",
              link: "/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployments/custom-deployment-tutorial",
            },
          ]*/  
        }, 
        {
          title: "Manage deployments",
          module: MODULES.cd,
          description:
            "Control deployment resources and schedules.",
          link: "/docs/category/manage-deployments",
          /*children: [
            {
              title: "Concepts and strategies",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/manage-deployments/deployment-concepts",
            },
            {
              title: "Pipeline resource constraints",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/manage-deployments/deployment-resource-constraints",
            },
            {
              title: "Control resource usage with Barriers, Resource Constraints, and Queue Steps",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/manage-deployments/controlling-deployments-with-barriers-resource-constraints-and-queue-steps",
            },
            {
              title: "Control resource usage with Queue Steps",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/manage-deployments/control-resource-usage-with-queue-steps",
            },
            {
              title: "Synchronize parallel stages and step groups using Barriers",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/manage-deployments/synchronize-deployments-using-barriers",
            },
            {
              title: "Deployment logs and limitations",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations",
            },
            {
              title: "Freeze deployments",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/manage-deployments/deployment-freeze",
            },
          ]*/  
        },
        {
          title: "Monitor deployments",
          module: MODULES.cd,
          description:
            "Use DORA and other advanced metrics for deployments.",
          link: "/docs/category/monitor-deployments",
          /*children: [
            {
              title: "CD dashboard",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments",
            },
            {
              title: "DORA metrics dashboard",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/monitor-deployments/dora-metrics-dashboard",
            },
            {
              title: "Deployment dashboard (FirstGen)",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/monitor-deployments/view-deployments-current-gen-dashboard",
            },
            {
              title: "Service dashboard (FirstGen)",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/monitor-deployments/view-services-current-gen-dashboard",
            },
          ]*/  
        },
        {
          title: "Provision infrastructure",
          module: MODULES.cd,
          description:
            "Provision infrastructure as part of your deployment process.",
          link: "/docs/category/provision-infrastructure",
          /*children: [
            {
              title: "Terraform",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/category/terraform",
            },
            {
              title: "CloudFormation",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/category/cloudformation",
            },
            {
              title: "Terragrunt",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/cd-infrastructure/terragrunt/terragrunt-howtos",
            },
          ]*/  
        },
        {
          title: "Deploy services using GitOps",
          module: MODULES.cd,
          description:
            "Perform GitOps deployments in Harness.",
          link: "/docs/category/gitops",
          /*children: [
            {
              title: "Overview",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/gitops/harness-git-ops-basics",
            },
            {
              title: "Install Harness GitOps Agent",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/gitops/install-a-harness-git-ops-agent",
            },
            {
              title: "Add Harness GitOps repository",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/gitops/add-a-harness-git-ops-repository",
            },
            {
              title: "Add Harness GitOps repository credentials template",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/gitops/add-harness-git-ops-repository-credentials-template",
            },
            {
              title: "Harness hosted GitOps IP addresses",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/gitops/gitops-allowlist",
            },
            {
              title: "Deploy services using Harness GitOps",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/gitops/harness-cd-git-ops-quickstart",
            },
            {
              title: "Map Argo projects to Harness GitOps projects",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/gitops/multiple-argo-to-single-harness",
            },
            {
              title: "Create GitOps ApplicationSet and PR pipeline using Harness GitOps",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/gitops/harness-git-ops-application-set-tutorial",
            },
          ]*/
        },
        {
          title: "Verify deployments",
          module: MODULES.cd,
          description:
            "Use Harness Continuous Verification (CV) to verify your deployments.",
          link: "/docs/category/verify-deployments",  
          /*children: [
            {
              title: "Verify step",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step",
            },
            {
              title: "Prometheus",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/verify/verify-deployment-with-prometheus",
            },
            {
              title: "AppDynamics",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/verify/verify-deployments-with-app-dynamics",
            },
            {
              title: "CloudWatch",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/verify/verify-deployments-with-cloudwatch",
            },
            {
              title: "Custom Health Source",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/verify/verify-deployments-with-custom-health-metrics",
            },
            {
              title: "Datadog",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/verify/verify-deployments-with-datadog",
            },
            {
              title: "Dynatrace",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/verify/verify-deployments-with-dynatrace",
            },
            {
              title: "Elasticsearch",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/verify/verify-deployments-with-elastic-search",
            },
            {
              title: "Google Cloud Operations",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/verify/verify-deployments-with-google-cloud-operations",
            },
            {
              title: "New Relic",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/verify/verify-deployments-with-new-relic",
            },
            {
              title: "Splunk",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/verify/verify-deployments-with-splunk",
            },
            {
              title: "Sumo Logic",
              module: MODULES.cd,
              description:
                "",
              link: "/docs/continuous-delivery/verify/verify-deployments-with-sumologic",
            },
          ]*/ 
        },
      ],
    },
    {
      name: "Help and FAQs",
      description:
        "",
      list: [
        {
          title: "Troubleshoot CD",
          module: MODULES.cd,
          description:
            "",
          link: "/docs/troubleshooting/troubleshooting-nextgen#continuous-delivery",
        },
        {
          title: "CD FAQs",
          module: MODULES.cd,
          description:
            "",
          link: "/docs/frequently-asked-questions/harness-faqs/continuous-delivery-faqs",
        },
      ],
    },
  ];
  /* Define the cards - end */