---
title: Deployments Overview
description: Links to deployment guides for all supported platforms and scenarios.
sidebar_position: 10
helpdocs_topic_id: i3n6qr8p5i
helpdocs_category_id: cwefyz0jos
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/article/cqgeblt4uh).The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.

### Deployment Guides

Always start with the [Quickstarts](https://docs.harness.io/category/f6rh2cdvx9-first-gen-quickstarts). These will take you from novice to advanced Harness user in a matter of minutes.

The following topics will walk you through how Harness implements common deployments according to platforms and scenarios:

- [​AMI (Amazon Machine Image)](../../aws-deployments/ami-deployments/ami-deployment.md)
- [​AWS Elastic Container Service (ECS)](../../aws-deployments/ecs-deployment/ecs-deployments-overview.md)
- [AWS Lambda](/docs/category/aws-lambda-deployments)
- [​Azure](/docs/category/azure-deployments-and-provisioning)
- [CI/CD: Artifact Build and Deploy Pipelines](/docs/category/cicd-artifact-build-and-deploy-pipelines)
- [Google Cloud](/docs/category/google-cloud)
- [Native Helm](/docs/category/native-helm-deployments)
- [​IIS (.NET)](../../dotnet-deployments/iis-net-deployment.md)
- [​Kubernetes](/docs/category/kubernetes-deployments) (includes Helm, OpenShift, etc)
- [Pivotal Cloud Foundry](../../pcf-deployments/pcf-tutorial-overview.md)
- [​Traditional Deployments](../../traditional-deployments/traditional-deployments-overview.md)
- [Custom Deployments](/docs/category/custom-deployments)

Also, other key platforms that help you make your CD powerful and efficient:

- [Terraform](/docs/category/terraform)
- [CloudFormation](/docs/category/aws-cloudformation)
- [Configuration as Code](https://docs.harness.io/category/2ea2y01kgz-config-as-code) (work exclusively in YAML and sync with your Git repos)
- [Harness GitOps](https://docs.harness.io/category/goyudf2aoh-harness-gitops)

For topics on general CD modeling in Harness, see [Model Your CD Pipeline](https://docs.harness.io/category/ywqzeje187-setup).

### Kubernetes or Native Helm?

Harness includes both Kubernetes and Helm deployments, and you can use Helm charts in both. Here's the difference:

- Harness [Kubernetes Deployments](../../kubernetes-deployments/kubernetes-deployments-overview.md) allow you to use your own Kubernetes manifests or a Helm chart (remote or local), and Harness executes the Kubernetes API calls to build everything without Helm and Tiller needing to be installed in the target cluster.  
  Harness Kubernetes deployments also support all deployment strategies (Canary, Blue/Green, Rolling, etc).
- For Harness [Native Helm Deployments](../../helm-deployment/helm-deployments-overview.md), you must always have Helm and Tiller (for Helm v2) running on one pod in your target cluster. Tiller makes the API calls to Kubernetes in these cases. You can perform a Basic or Rolling deployment strategy only (no Canary or Blue Green). For Harness Native Helm v3 deployments, you no longer need Tiller, but you are still limited to Basic or Rolling deployments.
  - **Versioning:** Harness Kubernetes deployments version all objects, such as ConfigMaps and Secrets. Native Helm does not.
  - **Rollback:** Harness Kubernetes deployments will roll back to the last successful version. Native Helm will not. If you did 2 bad Native Helm deployments, the 2nd one will just rollback to the 1st. Harness will roll back to the last successful version.

### Harness Videos

Check out [Harness Youtube channel](https://www.youtube.com/c/Harnessio/videos) for the latest videos.

### Deployment Logging Limitations

There is a hard limit of 25MB for logs produced by 1 Workflow step. Logs beyond this limit will be skipped and not available for download as well.
