---
title: Deployments Overview
description: Links to deployment guides for all supported platforms and scenarios.
# sidebar_position: 2
helpdocs_topic_id: i3n6qr8p5i
helpdocs_category_id: cwefyz0jos
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](/article/1fjmm4by22). Switch to [NextGen](/article/cqgeblt4uh).The deployment guides walk you through setting up a specific deployment using Harness, such as ECS, Kubernetes, and Helm. They are written to provide you with everything you need to learn how to model your CD process in Harness.

### Deployment Guides

Always start with the [Quickstarts](/category/f6rh2cdvx9-first-gen-quickstarts). These will take you from novice to advanced Harness user in a matter of minutes.

The following topics will walk you through how Harness implements common deployments according to platforms and scenarios:

* [​AMI (Amazon Machine Image)](/article/rd6ghl00va-ami-deployment)
* [​AWS Elastic Container Service (ECS)](/article/08whoizbps-ecs-deployments-overview)
* [AWS Lambda](/category/3pyb3kmkbs-lambda-deployments)
* [​Azure](https://docs.harness.io/category/gk062j3isk-azure-deployments)
* [CI/CD: Artifact Build and Deploy Pipelines](/category/j1q21aler1-build-deploy)
* [Google Cloud](/category/btqlctlqsj-google-cloud)
* [Native Helm](/category/7gqn6m2t46-helm-deployment)
* [​IIS (.NET)](/article/d485c2vy7e-iis-net-deployment)
* [​Kubernetes](/category/n03qfofd5w-kubernetes-deployments) (includes Helm, OpenShift, etc)
* [Pivotal Cloud Foundry](/article/6m7w43yw4u-pcf-tutorial-overview)
* [​Traditional Deployments](/article/6pwni5f9el-traditional-deployments-overview)
* [Custom Deployments](/category/29o4taom9v-custom-deployments)

Also, other key platforms that help you make your CD powerful and efficient:

* [Terraform](/category/gkm7rtubpk-terraform-category)
* [CloudFormation](/category/hupik7gwhc-cloudformation-category)
* [Configuration as Code](/category/2ea2y01kgz-config-as-code) (work exclusively in YAML and sync with your Git repos)
* [Harness GitOps](/category/goyudf2aoh-harness-gitops)

For topics on general CD modeling in Harness, see [Model Your CD Pipeline](/category/ywqzeje187-setup).

### Kubernetes or Native Helm?

Harness includes both Kubernetes and Helm deployments, and you can use Helm charts in both. Here's the difference:

* Harness [Kubernetes Deployments](/article/pc6qglyp5h-kubernetes-deployments-overview) allow you to use your own Kubernetes manifests or a Helm chart (remote or local), and Harness executes the Kubernetes API calls to build everything without Helm and Tiller needing to be installed in the target cluster.  
Harness Kubernetes deployments also support all deployment strategies (Canary, Blue/Green, Rolling, etc).
* For Harness [Native Helm Deployments](/article/ii558ppikj-helm-deployments-overview), you must always have Helm and Tiller (for Helm v2) running on one pod in your target cluster. Tiller makes the API calls to Kubernetes in these cases. You can perform a Basic or Rolling deployment strategy only (no Canary or Blue Green). For Harness Native Helm v3 deployments, you no longer need Tiller, but you are still limited to Basic or Rolling deployments.
	+ **Versioning:** Harness Kubernetes deployments version all objects, such as ConfigMaps and Secrets. Native Helm does not.
	+ **Rollback:** Harness Kubernetes deployments will roll back to the last successful version. Native Helm will not. If you did 2 bad Native Helm deployments, the 2nd one will just rollback to the 1st. Harness will roll back to the last successful version.

### Harness Videos

Check out [Harness Youtube channel](https://www.youtube.com/c/Harnessio/videos) for the latest videos.

### Deployment Logging Limitations

There is a hard limit of 25MB for logs produced by 1 Workflow step. Logs beyond this limit will be skipped and not available for download as well.

