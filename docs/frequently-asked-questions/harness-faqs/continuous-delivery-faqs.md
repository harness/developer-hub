---
title: Continuous Delivery (CD) FAQs
description: Frequently asked questions about Harness Continuous Delivery (CD).
# sidebar_position: 2
helpdocs_topic_id: dhlon9vd17
helpdocs_category_id: y7j7dl46ua
helpdocs_is_private: false
helpdocs_is_published: true
---

This article addresses some frequently asked questions about Harness Continuous Delivery (CD).

In this topic:

* [General](continuous-delivery-faqs.md#general)
* [Kubernetes](continuous-delivery-faqs.md#kubernetes)
* [Terraform](continuous-delivery-faqs.md#terraform)
* [Harness Configure as Code](continuous-delivery-faqs.md#harness-configure-as-code)
* [Harness Git Experience](continuous-delivery-faqs.md#harness-git-experience)
* [Uncommon deployment platforms](continuous-delivery-faqs.md#uncommon-deployment-platforms)
* [Harness entities](continuous-delivery-faqs.md#harness-entities)
* [Secrets management](continuous-delivery-faqs.md#secrets-management)
* [Harness variables expressions](continuous-delivery-faqs.md#harness-variables-expressions)

### General

For an overview of Harness' support for platforms, methodologies, and related technologies, see [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### What CD platforms and tools does Harness support?

Harness [supports all of the most common platforms](../../getting-started/supported-platforms-and-technologies.md) and deployment use cases.

Here's a summary of Harness CD support for popular platforms and tools.

import PartialExample from '/docs/continuous-delivery/shared/cd-integrations-supported.md';

<PartialExample name="integrations" />

#### What is a service instance in Harness?

A service is an independent unit of software you deploy through Harness CD pipelines.

This will typically map to a service in Kubernetes apps, or to an artifact you deploy in traditional VM-based apps.

Service instances represent the dynamic instantiation of a service you deploy with Harness.

For example, for a service representing a Docker image, service instances are the number of pods running the Docker image.

![](./static/continuous-delivery-faqs-00.png)

Notes:

* For services with more than 20 service instances - active pods or VMs for that service - additional service licenses will be counted for each 20 service instances. This typically happens when you have large monolith services.
* See the **Pricing FAQ** at [Harness pricing](https://harness.io/pricing/).

#### How does Harness calculate pricing for CD?

See [Service-based licensing and usage for CD](../../continuous-delivery/get-started/service-licensing-for-cd.md).

#### My definition of a service differs from the above standard definition. How will pricing work in my case?

Harness allows deployment of various custom technologies such as Terraform scripts, background jobs, and other non-specified deployments. These require custom evaluation to assess the correct Licensing model. Please contact the Harness Sales team to discuss your specific technologies and deployment use cases.

See the **Pricing FAQ** at [Harness pricing](https://harness.io/pricing/).

#### Are there other mechanisms to license Harness CD beyond services?

See the **Pricing FAQ** at [Harness pricing](https://harness.io/pricing/).

Yes, we are happy to have Harness Sales team work with you and understand the specifics of what you are trying to achieve and propose a custom licensing/pricing structure.

#### Do unused/stale services consume a license?

See the **Pricing FAQ** at [Harness pricing](https://harness.io/pricing/).

Harness CD actively tracks and provides visibility into all active services that consume a license.

An active service is defined as a service that has been deployed at least once in the last 30 days. A service deemed inactive (no deployments in the last 30 days), does not consume a license.

#### How will I know if I am exceeding my licensed service usage?

See the **Pricing FAQ** at [Harness pricing](https://harness.io/pricing/).

Harness CD has built-in license tracking and management dashboards that provide you real-time visibility into your license allocation and usage.

If you notice that you are nearing or exceeding your licensed services, please get in touch with Harness Sales team to plan ahead and ensure continued usage and compliance of the product.

#### How many users can I onboard onto Harness CD? Is there a separate pricing for Users?

Harness CD has been designed to empower your entire Engineering and DevOps organization to deploy software with agility and reliability. We do not charge for users who onboard Harness CD and manage various aspects of the deployment process, including looking through deployment summaries, reports, and dashboards. We empower users with control and visibility while pricing only for the actual ‘services’ you deploy as a team.

#### If I procure a certain number of service licenses on an annual contract, and realize that more licenses need to be added, am I able to procure more licenses mid-year through my current contract?

See the **Pricing FAQ** at [Harness pricing](https://harness.io/pricing/).

Yes, Harness Sales team is happy to work with you and help fulfill any Harness-related needs, including mid-year plan upgrades and expansions.

#### If I procure a certain number of service licenses on an annual contract, and realize that I may no longer need as many, am I able to reduce my licenses mid-year through my current contract?

See the **Pricing FAQ** at [Harness pricing](https://harness.io/pricing/).

While an annual contract can not be lowered mid-year through the contract, please contact us and we will be very happy to work with you. In case you are uncertain at the beginning of the contract of how many licenses should be procured - you can buy what you use today to start and expand mid-year as you use more. You can also start with a monthly contract and convert to an annual subscription.

#### What if I am building an open source project?

We love Open Source and are committed to supporting our Community! 

Contact us and we will be happy to provide you with a no restriction Plan!

Harness CD includes a [Community Edition](/docs/continuous-delivery/deploy-srv-diff-platforms/community-ed/harness-community-edition-overview) so you can run CD locally on your computer.

#### What if I add more service instance infrastructure outside of Harness?

See the **Pricing FAQ** at [Harness pricing](https://harness.io/pricing/).

If you increase the Harness-deployed service instance infrastructure outside of Harness, Harness considers this increase part of the service instance infrastructure and licensing is applied.

#### When is a service instance removed?

If Harness cannot find the service instance infrastructure it deployed, it removes it from the Services dashboard.

If Harness cannot connect to the service instance infrastructure, it will retry until it determines if the service instance infrastructure is still there.

#### If the instance/pod is in a failed state does it still count towards the service instance count?

Harness performs a steady state check during deployment and requires that each instance/pod reach a healthy state.

A Kubernetes liveness probe failing later would mean the pod is restarted. Harness continues to count it as a service instance.

A Kubernetes readiness probe failing later would mean traffic is no longer routed to the pods. Harness continues to count pods in that state.

Harness does not count an instance/pod if it no longer exists. For example, if the replica count is reduced.

#### What deployment strategies can I use?

Harness supports all deployment strategies, such as blue/green, rolling, and canary.

See [Deployment concepts and strategies](../../continuous-delivery/manage-deployments/deployment-concepts.md).

#### How do I filter deployments on the Deployments page?

You can filter deployments on the the Deployments page according to multiple criteria, and save these filters as a quick way to filter deployments in the future.

#### How do I know which Harness Delegates were used in a deployment?

Harness displays which Delegates performed each task in the Details of each step.

![](./static/continuous-delivery-faqs-01.png)

#### Can I restrict deployments to specific User Groups?

Yes, you can enable the Role permission Pipeline Execute and then apply that Role to specific User Groups.

![](./static/continuous-delivery-faqs-02.png)

See [Manage roles](../../platform/role-based-access-control/add-manage-roles).

#### Can I deploy a service to multiple infrastructures at the same time?

Each stage has a service and target Infrastructure. If your Pipeline has multiple stages, you can deploy the same service to multiple infrastructures.

See [Define your Kubernetes target infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure.md).

#### Can I re-run a failed deployment?

Yes, select **Re-run Pipeline**.

![](./static/continuous-delivery-faqs-03.png)

### Kubernetes

For an overview of Harness' support for platforms, methodologies, and related technologies, see [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### What is a Harness Kubernetes deployment?

Harness takes the artifacts and Kubernetes manifests you provide and deploys them to the target Kubernetes cluster. You can simply deploy Kubernetes objects via manifests and you can provide manifests using remote sources and Helm charts.

See the [Kubernetes deployment tutorial](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart.md) and [Kubernetes deployments overview](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview.md).

For detailed instructions on using Kubernetes in Harness, see the [Kubernetes how-tos](/docs/category/kubernetes).

#### What workloads can Harness deploy in a Kubernetes cluster?

See [What can I deploy in Kubernetes?](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes.md).

#### Does Harness support everything in Kubernetes?

Yes. Any standard Kubernetes features in your Kubernetes manifests will be deployed.

Harness tracks deployment status to ensure pods reach steady state before considering the deployment successful, but other, even unrelated Kubernetes features, are supported. For example, liveness, readiness, and startup probes are supported.

#### For Kubernetes, does Harness count only pods as a service instance (SI)? What about a ConfigMap or a Secret?

Only pods. Only pods will consume SI licenses. ConfigMaps and Secrets do not consume SI licenses.

#### How is Harness sure that a pod is a service instance?

Harness tracks the workloads it deploys. Harness checks every 10 minutes using the Kubernetes API to see how many pods are currently running for the given workload.

#### If I create a pod using Harness and keep managing it, is it still counted as a service instance?

Yes. Sidecar containers within pods (log proxy, service mesh proxy) do not consume SI licenses. Harness licenses by pod, not the number of containers in a pod.

#### Does Harness support OpenShift?

Yes. Harness supports [DeploymentConfig](https://docs.openshift.com/container-platform/4.1/applications/deployments/what-deployments-are.html), [Route](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/routes.html), and [ImageStream](https://docs.openshift.com/enterprise/3.2/architecture/core_concepts/builds_and_image_streams.html#image-streams) across Canary, Blue Green, and Rolling deployment strategies. Please use `apiVersion: apps.openshift.io/v1` and not `apiVersion: v1`.

You can leverage Kubernetes list objects as needed without modifying your YAML for Harness.

When you deploy, Harness will render the lists and show all the templated and rendered values in the log.

Harness supports:

* List
* NamespaceList
* ServiceList
* For Kubernetes deployments, these objects are supported for all deployment strategies (canary, rolling, blue/green).

If you run `kubectl api-resources` you should see a list of resources, and `kubectl explain` will work with any of these.

#### Can I use Helm?

Yes. Harness Kubernetes deployments support Helm v2 and v3.

Harness supports Helm charts in its Kubernetes implementation.

Harness Kubernetes deployments allow you to use your own Kubernetes manifests or a Helm chart, and Harness executes the Kubernetes API calls to build everything without Helm and Tiller needing to be installed in the target cluster.

Harness Kubernetes deployments also support all deployment strategies (canary, blue/green, rolling, and so on).

#### Should I use Kubernetes or Native Helm?

Harness includes both Kubernetes and Helm deployments, and you can use Helm charts in both. Here's the difference:

* Harness [Kubernetes deployments](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart.md) allow you to use your own Kubernetes manifests or a Helm chart (remote or local), and Harness executes the Kubernetes API calls to build everything without Helm and Tiller needing to be installed in the target cluster.  
Harness Kubernetes deployments also support all deployment strategies (canary, blue/green, rolling, and so on).
* For Harness [Native Helm deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm-quickstart.md), you must always have Helm and Tiller (for Helm v2) running on one pod in your target cluster. Tiller makes the API calls to Kubernetes in these cases. You can perform a Rolling deployment strategy only (no canary or blue/green). For Harness Native Helm v3 deployments, you no longer need Tiller, but you are still limited to the Rolling deployment strategy.
	+ **Versioning:** Harness Kubernetes deployments version all objects, such as ConfigMaps and secrets. Native Helm does not.
	+ **Rollback:** Harness Kubernetes deployments will roll back to the last successful version. Native Helm will not. If you did two bad Native Helm deployments, the second one will roll back to the first. Harness will roll back to the last successful version.

#### Can I deploy Helm charts without adding an artifact source to Harness?

Yes.

Harness Kubernetes deployments using Helm charts can involve adding your artifact (image) to Harness in addition to your chart. The chart refers to the artifact you added to Harness (through its values.yaml file). During deployment, Harness deploys the artifact you added to Harness and uses the chart to manage it.

In addition to this method, you can also deploy the Helm chart without adding your artifact to Harness. Instead, the Helm chart identifies the artifact. Harness installs the chart, gets the artifact from the repo, and then installs the artifact. We call this a *Helm chart deployment*.

See [Deploy helm charts](../../continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts.md).

#### Can I run Kubernetes jobs?

Yes. In Harness Kubernetes deployments, you define jobs in the Harness Service **Manifests**. Next you add the Apply step to your Harness workflow to execute the job.

See [Run Kubernetes jobs](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/run-kubernetes-jobs.md).

#### Can I deploy a Kubernetes resources using CRDs?

Yes. Harness supports all Kubernetes default resources, such as pods, deployments, StatefulSets, DaemonSets, etc. For these resources, Harness supports steady state checking, versioning, displays instances on Harness dashboards, performs rollback, and other enterprise features.

In addition, Harness provides many of the same features for Kubernetes [custom resource](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/) deployments using Custom Resource Definitions (CRDs). CRDs are resources you create that extend the Kubernetes API to support your application.

:::note 
Harness supports CRDs for both Kubernetes and OpenShift. There is no difference in their custom resource implementation.
:::

#### Can I deploy resources outside of the main Kubernetes workload?

Yes. By default, the Harness Kubernetes workflow will deploy all of the resources you have set up in the Service **Manifests** section.

In some cases, you might have resources that you do not want to deploy as part of the main workflow deployment, but want to apply as another step in the workflow. For example, you might want to deploy an additional resource only after Harness has verified the deployment of the main resources in the Service **Manifests** section.

workflows include an **Apply** step that allows you to deploy any resource you have set up in the Service **Manifests** section.

See [Deploy manifests separately using the Apply step](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step.md).

#### Can I ignore a manifest during deployment?

You might have manifest files for resources that you do not want to deploy as part of the main deployment.

Instead, you tell Harness to ignore these files and then apply them separately using the Harness [Kubernetes Apply step](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step.md).

Or you can simply ignore them until you wish to deploy them as part of the main deployment.

See [Ignore a manifest file during deployment](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/ignore-a-manifest-file-during-deployment.md).

#### Can I pull an image from a private registry?

Typically, If the Docker artifact source is in a private registry, Harness has access to that registry using the credentials set up in the Harness [Artifact connector](/docs/platform/Connectors/Artifact-Repositories/connect-to-an-artifact-repo).

If some cases, your Kubernetes cluster might not have the permissions needed to access a private Docker registry. For these cases, the values.yaml file added in the Service **Manifests** section must contain `dockercfg: <+artifact.imagePullSecret>` . This key will import the credentials from the Docker credentials file in the artifact.

See [Pull an image from a private registry for Kubernetes](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/pull-an-image-from-a-private-registry-for-kubernetes.md).

#### Can I use remote sources for my manifests?

You can use your Git repo for the configuration files in **Manifests** and Harness uses them at runtime. You have the following options for remote files:

* **Kubernetes Specs in YAML format** - These files are simply the YAML manifest files stored on a remote Git repo. See [Add Kubernetes manifests](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/define-kubernetes-manifests.md).
* **Helm Chart from Helm Repository** - Helm charts files stored in standard Helm syntax in YAML on a remote Helm repo. See [Helm chart deployment tutorial](../../continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart.md).
* **Kustomization Configuration** — kustomization.yaml files stored on a remote Git repo. See [Kustomize deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/kustomize/kustomize-quickstart.md).
* **OpenShift Template** — OpenShift params file from a Git repo.

:::note 
Remote files can also use Go templating.
:::

#### Do you support Go templating for Kubernetes manifests?

Yes. you can use [Go templating](https://godoc.org/text/template) and Harness built-in variables in combination in your **Manifests** files.

See [Example Kubernetes manifests using Go templating](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/example-kubernetes-manifests-using-go-templating.md).

#### Can I provision Kubernetes infrastructure?

Yes, you can use:

- [Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness)
- [Terragrunt](/docs/continuous-delivery/cd-infrastructure/terragrunt-howtos)
- Azure ARM and Blueprint
- [AWS CloudFormation](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/cloud-formation-how-tos)
- Shell script (custom)

#### What deployment strategies can I use with Kubernetes?

You can use canary, rolling, and blue/green. See:

* [Create a Kubernetes canary deployment](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-canary-deployment.md)
* [Create a Kubernetes rolling deployment](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment.md)
* [Create a Kubernetes blue/green deployment](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment.md)

#### Can I select namespaces during deployment?

Yes. You can select namespaces on the fly using Harness variables that are evaluated at runtime.

#### Do you support Kustomize?

Yes. Harness supports [Kustomize](https://kustomize.io/) kustomizations in your Kubernetes deployments. You can use overlays, multibase, plugins, sealed secrets, and so on, just as you would in any native kustomization.

See [Kustomize deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/kustomize/kustomize-quickstart.md).

#### Can I use Ingress traffic routing?

Yes. You can route traffic using the Ingress rules defined in your Harness Kubernetes manifests.

#### Can I scale my pods up and down?

Yes. When you deploy a Kubernetes workload using Harness, you set the number of pods you want in your manifests and in the deployment steps.

With the Scale step, you can scale this number of running pods up or down, by count or percentage.

See [Scale Kubernetes pods](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/scale-kubernetes-replicas.md).


#### Can I prune resources?

Yes. You can manually delete Kubernetes resources using the [Delete](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/delete-kubernetes-resources) step, but you can also set Harness to perform resource pruning during deployment using the **Enable Kubernetes Pruning** setting in the **Rolling Deployment** and **Stage Deployment** (used in blue green deployments) steps.



#### How do I delete Kubernetes resources?

Harness includes a Delegate step to remove any deployed Kubernetes resources.

See [Delete Kubernetes resources](../../continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/delete-kubernetes-resources.md).

#### Can I use Helm 3 with Kubernetes?

Yes. You can use Helm 3 charts.

You can select Helm 3 when you create the service, or upgrade Helm 2 to Helm 3.

![](./static/continuous-delivery-faqs-04.png)

See [Deploy Helm charts](../../continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts.md).

#### Can I use Helm Chart Hooks in Kubernetes deployments?

Yes. You can use [Helm chart hooks](https://helm.sh/docs/topics/charts_hooks/) in your Kubernetes deployments to intervene at specific points in a release cycle.

You use a Harness Kubernetes Canary or Blue Green deployment and apply the hooks flexibly with the Apply step.

A Harness Kubernetes deployment runs `kubectl apply` for manifest files. There is no Tiller involved in this process because Harness is not running any Helm commands.

### Terraform

For an overview of Harness' support for platforms, methodologies, and related technologies, see [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### How does Harness support Terraform?

Harness lets you use Terraform to provision infrastructure as part of your deployment process. Harness can provision any resource that is supported by a Terraform [provider or plugin](https://www.terraform.io/docs/configuration/providers.html).

For an overview of the process see [Terraform provisioning with Harness](../../continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness.md). 

#### Do I need to deploy an application to use Terraform?

No. You do not need to deploy artifacts through Harness services to use Terraform provisioning in a workflow. You can use Terraform to provision infrastructure without deploying any artifact.

#### Are Harness service instances counted with Terraform provisioning?

Harness service instances (SIs) are not consumed and no additional licensing is required when a Harness pipeline uses Terraform to provision resources. When Harness deploys artifacts through Harness services to the provisioned infrastructure in the same pipeline, SI licensing is consumed.

#### What deployment strategies can I use Terraform with?

You can use Terraform with all strategies.

#### Can I perform a Terraform dry run?

Yes. The Terraform Plan and Terraform Apply steps can be executed as a dry run, just like running the [terraform plan](https://www.terraform.io/docs/commands/plan.html) command.

First, you add the Terraform Plan step and define the Terraform script for it to use.

Next, you add the Terraform Apply step, select **Inherit from Plan** in **Configuration Type**, and reference the Terraform Plan step using the same **Provisioner Identifier.**

![](./static/continuous-delivery-faqs-05.png)

#### Can I remove resources provisioned with Terraform?

Yes. You can add a **Terraform Destroy** step to remove any provisioned infrastructure, just like running the `terraform destroy` command. See [destroy](https://www.terraform.io/docs/commands/destroy.html) from Terraform.

See [Remove provisioned infrastructure with the Terraform Destroy step](../../continuous-delivery/cd-infrastructure/terraform-infra/remove-provisioned-infra-with-terraform-destroy.md).

### Harness Configure as Code

For an overview of Harness' support for platforms, methodologies, and related technologies, see [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### Can I create my deployments using YAML?

Yes. Harness allows you to configure settings such as pipelines, triggers, connectors, environments, and services in Harness by using YAML. You can use YAML to achieve any configuration for which you would use the Harness platform GUI.

![](./static/continuous-delivery-faqs-06.png)

See [Harness YAML quickstart](../../platform/8_Pipelines/harness-yaml-quickstart.md).

### Harness Git Experience

For an overview of Harness' support for platforms, methodologies, and related technologies, see [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### Can I sync my Harness project with my repo?

Yes. You can sync your Harness project with a Git repo. The Harness project can be synced with one repo and the connectors used in the project can be synced in the same repo or separately with other repos or branches.

See [Harness Git Experience Quickstart](../../platform/10_Git-Experience/configure-git-experience-for-harness-entities.md).

### Community Edition

For an overview of Harness' support for platforms, methodologies, and related technologies, go to [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### Do you have a free version of Harness CD?

Yes. Harness CD Community Edition is a lightweight version of Harness that you can download and run on your laptop or any VM.

Harness CD Community Edition is intended to get devs started with Harness quickly without having to sign up for a Harness SaaS account.

#### What can I do with Harness CD Community Edition?

- Today, Harness CD Community Edition can perform Kubernetes deployments only. This means pulling remote manifests and artifacts and deploying them to a local or remote Kubernetes cluster.
- You can also use Harness CD features such as automated rolling, canary and blue green deployments, automated infrastructure provisioning, integrated approvals and notifications, full YAML-based development, and Harness Git Experience.
- In the near future, Amazon Web Services (AWS) (Elastic Container Service (ECS), Auto Scale Groups (ASG), CloudFormation, Lambda, etc), Microsoft Azure (Virtual Machine Scale Sets (VMSS), WebApps, Azure Kubernetes Service (AKS), Azure Container Registry (ACR), Azure Resource Manager (ARM), Blueprint), .NET, Google Cloud Build, VM, Tanzu Application Services (TAS), Serverless, and traditional (Tomcat, etc) deployments will be supported.

#### Can I upgrade to a paid plan from Harness CD Community Edition?

Yes, you can upgrade from within Harness in **Account Settings** > **Subscriptions** or by contacting [Harness Sales](mailto:sales@harness.io).

#### What data does Community Edition collect?

By default, Harness CD Community Edition shares minor usage details with Harness. These details help us understand and improve how the system behaves in real-world scenarios.

When you install an instance of Harness CD Community Edition, Harness collects the email address used to sign up in Harness, the number of users added to your Harness CD Community Edition, and the number of builds, deployments, and pipelines, and the information described above.

Harness uses this information for sales, support, product updates, security updates, policy updates, and license compliance.

The use of this information is governed by our [Privacy Policy](https://harness.io/privacy).

If you would like us to stop processing your data, or if you have any other questions or requests concerning your data, please contact the [Harness Privacy Team](mailto:privacy@harness.io). For more information on how we process your data, go to our [Privacy Policy](https://harness.io/privacy).

### Azure Web Apps

For an overview of Harness' support for platforms, methodologies, and related technologies, go to [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### Can I deploy Azure Web Apps?

Yes. Harness can deploy a Docker image or non-containerized artifact for your Azure Web App. You can deploy to slots, perform traffic shifting, and swap slots. Harness supports common deployment strategies (basic, canary, and blue green).

For more information, go to [Azure Web Apps deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial).

#### What deployment strategies are supported?

Basic, canary, and blue green.

The Rolling strategy doesn't suit Azure Web App deployments, as they use slots for staging and production environments. The Rolling strategy uses a single environment and roll out a new app version incrementally.

#### What limitations are there?

- App Service on Linux isn't supported on [Shared](https://azure.microsoft.com/pricing/details/app-service/plans/) pricing tier.
- You can't mix Windows and Linux apps in the same App Service plan.
- Within the same resource group, you can't mix Windows and Linux apps in the same region.
- Harness uses the Azure SDK among other methods and Authenticated proxy is not supported for Azure SDK. Consequently, you cannot use Azure connections for artifacts, machine images, etc, that require proxy authentication. This is an Azure limitation, not a Harness limitation. This is a known Azure limitation with Java environment properties and their SDK.

### AWS ASG

For an overview of Harness' support for platforms, methodologies, and related technologies, go to [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### What is an ASG deployment?

Here's a summary of how Harness deploys new ASG versions:

1. First deployment:
   1. Harness takes the launch template and ASG configuration files you provide and creates a new ASG and its instances in your AWS account and region.
2. Subsequent deployments:
   1. Harness creates a new version of the launch template.
3. Harness uses the new version of the launch template to update the ASG. For example, if you increased the desired capacity (`desiredCapacity`) for the ASG in your ASG configuration file, Harness will create a new version of the ASG with the new desired capacity.
   1. Instance refresh is triggered (a rolling replacement of all or some instances in the ASG).

#### What do I need for an ASG deployment?

1. For the Harness ASG service.
   1. Launch template.
   2. ASG configuration.
   3. Scaling policies (optional).
   4. Scheduled update group action (optional).
   5. The AMI image to use for the ASG as an artifact.
2. Harness ASG environment.
   1. AWS region where you want to deploy.
3. Harness ASG pipeline execution.
   1. Deployment strategy (rolling, canary, blue green). Harness automatically creates the steps to deploy the new ASG.

#### What are the ASG deployment limitations?

AWS has the following limitations to keep in mind:

- You are limited to creating 5000 launch templates per region and 10000 versions per launch template. For more information, go to Launch an instance from a launch template from AWS.
- ASGs per region: 500.
- Launch configurations per region: 200.

### AWS ECS

For an overview of Harness' support for platforms, methodologies, and related technologies, go to [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### What is a Harness ECS deployment?

You can deploy images to your Amazon Elastic Container Service (ECS) cluster using rolling, canary, and blue green deployment strategies.

Harness supports standard ECS specifications:

* [RegisterTaskDefinition](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RegisterTaskDefinition.html)
* [CreateService](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_CreateService.html)
* [RegisterScalableTarget](https://docs.aws.amazon.com/autoscaling/application/APIReference/API_RegisterScalableTarget.html)
* [PutScalingPolicy](https://docs.aws.amazon.com/autoscaling/application/APIReference/API_PutScalingPolicy.html)
* [RunTask](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RunTask.html)



#### What file types can I use?

You can use both JSON and YAML for your task and service definitions.

#### Where can Harness pull files from?

- Harness File Store.
- AWS S3 buckets.
- Git providers.

#### Can I perform auto scaling?

Yes. The ECS service(s) you deploy with Harness can be configured to use AWS Service Auto Scaling to adjust its desired ECS service count up or down in response to CloudWatch alarms. For more information on using Auto Scaling with ECS, go to [Target Tracking Scaling Policies](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-autoscaling-targettracking.html) from AWS.

Before you set up Auto Scaling for the ECS service in Harness, you need to obtain the JSON for the Scalable Target and Scalable Policy resources from AWS.

The JSON format used in the **Auto Scaler Configurations** settings should match the AWS standards as described in [ScalableTarget](https://docs.aws.amazon.com/autoscaling/application/APIReference/API_ScalableTarget.html) and [ScalablePolicy](https://docs.aws.amazon.com/autoscaling/application/APIReference/API_ScalingPolicy.html).

#### Can I deploy the same number of service instances as the previous deployments?

Yes. The **Same as already running instances** setting in **ECS Rolling Deploy** sets the number of desired ECS service instances for this stage to the same number as the already running instances. Essentially, it ignores the desired count in the Service Definition of the new deployment.

#### Can I force a deployment?

Yes. By default, deployments aren't forced. You can use the **Force new deployment** setting in **ECS Rolling Deploy** to start a new deployment with no service definition changes. For example, you can update a service's tasks to use a newer Docker image with the same image/tag combination (`my_image:latest`) or to roll Fargate tasks onto a newer platform version.

#### How do ECS blue green deployments work?

<details>
<summary>ECS blue green deployments summary</summary>

ECS Blue/Green deployments use old and new versions of your service running behind the load balancer. Your ELB uses two listeners, Prod and Stage, each forwarding to a different target group where ECS services are run.

Blue/Green deployments are achieved by swapping listeners between the target groups, always pointing the Prod listener to the target group running the latest version.

In Harness, you identify which listeners are the Prod and Stage listeners. When Harness deploys, it uses the target group for the Stage listener (for example, target1) to test the deployment, verifies the deployment, and then swaps the Prod listener to use that target group. Next, the Stage listener now uses the old target group (target2).

When a new version of the service is deployed, the Stage listener and its target group (target2) are first used, then, after verification, the swap happens and the Prod listener forwards to target2 and the Stage listener now forwards to target1.

</details>

#### How does ECS rollback work?

When an ECS deployment fails, the service tasks it was deploying are scaled down to 0.

The service is scaled to its pre-setup number of tasks.

If ECS Service Auto Scaling is configured, it is attached to the last production service at the end of the rollback.

For multi-phase deployments (Canary), not all phases are rolled back at once.

Phases are rolled back in the standard, reverse order. For example, in a 2 phase deployment with 2 rollback phases, the order is P1 → P2 → R2 → R1.

Phases are rolled back in this order regardless of whether ECS Service Auto Scaling is used.

#### Can I run individual tasks separately?

Yes. In addition to deploying tasks as part of your standard ECS deployment, you can use the **ECS Run Task** step to run individual tasks separately as a step in your ECS stage.

The **ECS Run Task** step is available in all ECS strategy types.

An example of when you run a task separately is a one-time or periodic batch job that does not need to keep running or restart when it finishes.

#### Can I use AWS Service Discovery?

Yes. Harness ECS deployments supports deploying of ECS services with AWS Service Discovery.

AWS Service Discovery is a cloud service provided by AWS that makes it easy for microservices applications to discover and communicate with each other. It enables you to manage and discover the addresses of the services within your microservices application without the need for hard-coded IP addresses or hostnames.

You can use AWS Service Discovery as part of the ECS service definition in Harness.

#### Can I use ECS circuit breaker configurations?

Yes. Harness ECS rolling and canary deployments support AWS ECS circuit breaker configurations.

Circuit breaker configuration is implemented in the Harness ECS service **Service Definition**.

Harness deploys the tasks in the ECS service definition containing the circuit breaker configuration. Once deployed, the circuit breaker is activated.

During failure scenarios, ECS circuit breaker performs a rollback automatically based on the threshold configuration.

### AWS Lambda

For an overview of Harness' support for platforms, methodologies, and related technologies, go to [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### What is a Lambda deployment?

In Harness, you specify the location of the function definition, artifact, and AWS account. Harness will deploy the Lambda function and automatically route the traffic from the old version of the Lambda function to the new version on each deployment.

**Looking for Serverless.com Framework Lambda?** Harness also supports Serverless.com Framework Lambda deployments. For more information, go to [AWS Lambda deployments (Serverless.com Framework)](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/serverless-framework/serverless-lambda-cd-quickstart).

#### What are the limitations?

- Harness' support only deploys and updates Lambda functions. Harness does not update auxiliary event source triggers like the API Gateway, etc.
- Currently, Lambda functions can be packaged as ZIP files in S3 Buckets or as containers in AWS ECR.
  - If Harness were to support another repository, like Nexus, when the container is fetched by the API, AWS spins up AWS resources (S3, ECR) anyways, and so Harness has limited support to S3 and ECR.
  - The containers must exist in ECR. Containers are not supported in other repositories.

#### What are the function definition requirements?

Harness uses the AWS Lambda [Create Function API](https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html) to create a new Lambda function in the specified AWS account and region.

The API takes a JSON object as input that defines the configuration settings for the Lambda function, such as the function name, runtime environment, handler function, memory allocation, and IAM role. This allows you to use the function definition as a configuration file in your Harness pipelines.

In Harness, you use a JSON configuration file to define the AWS Lambda you wish to deploy. This configuration lets you define all the function settings supported by the Create Function API.

The minimal requirements for an AWS Lambda function definition are:

- Function Name (`FunctionName`): A unique name for your Lambda function.
- Runtime (`Runtime`): The programming language and version that your function code is written in. Lambda supports multiple programming languages, including Node.js, Python, Java, C#, and Go.
- Handler (`Handler`): The name of the function within your code that Lambda should call when the function is invoked.
- AWS IAM role (`Role`): The IAM role that the function should use to access other AWS services or resources. You can create an IAM role specifically for the Lambda function, or you can reuse an existing IAM role if it has the necessary permissions.

For a full list of supported fields, go to [AWS Lambda Create Function Request](https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html).

Harness supports all of the popular Git platforms for storing your function definition files.

### Spot Elastigroup

For an overview of Harness' support for platforms, methodologies, and related technologies, go to [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### What is a Spot deployment in Harness?

You can deploy AWS ASGs using Harness and the Spot Elastigroup management platform.

#### What are the limitations?

- Currently, Harness integrates with Spot only for Amazon Web Services (AWS) deployments by using Elastigroups.
- Spot Elastigroup deployments support AMI artifacts only.
- Spot Elastigroup deployments support only basic, canary, and blue green execution types.

### Google Cloud Functions

For an overview of Harness' support for platforms, methodologies, and related technologies, go to [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### What is a Google Cloud Function deployment?

Harness supports deploying Google Functions [1st gen and 2nd gen](https://cloud.google.com/blog/products/serverless/cloud-functions-2nd-generation-now-generally-available).

#### What is the 1st gen support?

Harness supports the following:

- Basic deployments.
  - Harness deploys the new function and terminates the old one by sending 100% of traffic to the new function.
- For rollback, Harness does not perform revision-based rollback. Instead, in case of deployment failure, Harness will take a snapshot of the last known good state of the function and reapply.

#### What is the 2nd gen support?

Harness supports the following:

- Basic, blue green, and canary deployments.
- Harness leverages the Cloud Run revisions capability that Google Cloud offers to configure rollback.

#### What are the limitations?

* For Google Cloud Functions 2nd gen, Harness does not support [Google Cloud Source Repository](https://cloud.google.com/functions/docs/deploy#from-source-repo) at this time. Only Google Cloud Storage is supported.
* For Google Cloud Functions 1st gen, Harness supports both Google Cloud Storage and Google Cloud Source.

### AWS Lambda (Serverless.com Framework)

For an overview of Harness' support for platforms, methodologies, and related technologies, go to [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### What is a Lambda Serverless.com Framework deployment?

You can deploy a Serverless Lambda application to AWS Lambda using Harness.

#### What is the Serverless.com Framework support?

- Harness supports Serverless framework 1.82 and later.
- Harness supports Serverless framework CLI versions 2.x.x and 3.x.x.
- Harness supports all language runtimes that Serverless supports.
- Harness supports ZIP files and Docker image artifacts only.
  - ZIP files are supported with JFrog Artifactory.
  - Docker images are supported with AWS ECR.

#### How is rollback managed?

In a Serverless CLI rollback (`serverless rollback --timestamp timestamp`), you'd have to manually identify and select the timestamp of the last successful deployment. This can be difficult because you need to know which timestamp to use. With multiple developers deploying, there's the possibility of rolling back to the wrong version.

Harness avoids this issue by automatically identifying the last successful deployment using its timestamp. During the event of a rollback, Harness will automatically rollback to that deployment.

#### How is versioning managed?

Serverless Lambda deployments are versioned using the timestamp of their deployment. This versioning has no relation to the versioning in AWS Lambda.

### Tanzu Application Services (TAS)

For an overview of Harness' support for platforms, methodologies, and related technologies, go to [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

### What is a TAS deployment?

You can deploy an image to your TAS space using a TAS manifest, vars files, and AutoScalar.

#### What are the requirements?

You must install the CF CLI v7, autoscaler, and Create-Service-Push plugins on the Harness delegates that perform deployment.

#### What deployment strategies are supported?

Basic, canary, blue green, and rolling.

### Traditional deployments

For an overview of Harness' support for platforms, methodologies, and related technologies, go to [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).


#### What are traditional deployments?

SSH and WinRM deployments of traditional packages such as WAR, TAR, JAR, RPM, and ZIP to your hosts running runtime environments such as Tomcat or IIS.

#### What deployment strategies are supported?

Blank canvas, basic, rolling, and canary.

#### How is authentication to the target hosts managed?

- SSH: SSH key or Kerberos.
- WinRM: Kerberos and Windows New Technology LAN Manager (NTLM).


### Uncommon deployment platforms

Harness provides deployment support for all of the major artifact, approval, provisioner, and cloud platforms.

Harness also supports uncommon, custom platforms using platform agnostic connectors and [custom triggers](../../platform/11_Triggers/trigger-deployments-using-custom-triggers.md).

For an overview of Harness' support for platforms, methodologies, and related technologies, see [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### What is a Harness custom deployment?

Harness provides deployment support for all of the major platforms.

In some cases, you might be using a platform that does not have first class support in Harness. For these situations, Harness provides a custom deployment option.

Custom deployments use shell scripts to connect to target platforms, obtain target host information, and execute deployment steps.

### Harness entities

For an overview of Harness entities, see [Learn Harness' key concepts](../../getting-started/learn-harness-key-concepts.md).

#### What are organizations and projects?

Harness organizations (orgs) allow you to group projects that share the same goal. For example, all projects for a business unit or division.

Within each org you can add several Harness projects.

A Harness project contains Harness pipelines, users, and resources that share the same goal. For example, a project could represent a business unit, division, or simply a development project for an app.

Think of projects as a common space for managing teams working on similar technologies. A space where the team can work independently and not need to bother account admins or even org admins when new entities like connectors, delegates, or secrets are needed.

Much like account-level roles, project members can be assigned project admin, member, and viewer roles

#### What is a Harness pipeline?

Typically, a pipeline is an end-to-end process that delivers a new version of your software. But a pipeline can be much more: a pipeline can be a cyclical process that includes integration, delivery, operations, testing, deployment, real-time changes, and monitoring.

For example, a pipeline can use the CI module to build, test, and push code, and then a CD module to deploy the artifact to your production infrastructure.

#### What's a Harness stage?

A stage is a subset of a pipeline that contains the logic to perform one major segment of the pipeline process. Stages are based on the different milestones of your pipeline, such as building, approving, and delivering.

![](./static/continuous-delivery-faqs-07.png)

Some stages, like a deploy stage, use strategies that automatically add the necessary steps.

![](./static/continuous-delivery-faqs-08.png)

#### What are services in Harness?

A service represents your microservices and other workloads logically.

A service is a logical entity to be deployed, monitored, or changed independently.

#### What are service definitions?

When a service is added to the stage in a pipeline, you define its service definition. Service definitions represent the real artifacts, manifests, and variables of a service. They are the actual files and variable values.

You can also propagate and override a service in subsequent stages by selecting its name in that stage's service settings.

#### What artifacts does Harness support?

Harness supports all of the common repos.

See [Connect to an artifact repo](/docs/platform/Connectors/Artifact-Repositories/connect-to-an-artifact-repo).

#### What's a Harness environment?

Environments represent your deployment targets logically (QA, production, and so on). You can add the same environment to as many stages as you need.

#### What are Harness infrastructure definitions?

Infrastructure definitions represent an environment's infrastructure physically. They are the actual clusters, hosts, and so on.

#### What are Harness connectors?

Connectors contain the information necessary to integrate and work with third-party tools.

Harness uses connectors at pipeline runtime to authenticate and perform operations with a third-party tool.

For example, a GitHub connector authenticates with a GitHub account and repo and fetches files as part of a build or deploy stage in a pipeline.

See Harness [Connectors how-tos](/docs/category/connectors).

### Secrets management

For an overview of Harness' support for platforms, methodologies, and related technologies, see [Supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md).

#### How does Harness manage secrets?

Harness includes built-in secrets management to store your encrypted secrets, such as access keys, and use them in your Harness account. Harness integrates will all popular secrets managers.

See [Harness secrets management overview](/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview).

### Harness variables expressions

Harness includes built-in expressions to identify settings.

See [Built-in Harness variables reference](../../platform/12_Variables-and-Expressions/harness-variables.md).

Most settings in Harness pipelines allow you to use fixed values, runtime inputs, and expressions.

See [Fixed values, runtime inputs, and expressions](/docs/platform/20_References/runtime-inputs.md).

#### Can I reference settings using expressions?

Yes. Everything in Harness can be referenced by a fully qualified name (FQN). The FQN is the path to a setting in the YAML definition of your pipeline.

See [Built-in Harness variables reference](../../platform/12_Variables-and-Expressions/harness-variables.md).

#### Can I enter values at runtime?

Yes. You can use runtime Inputs to set placeholders for values that will be provided when you start a pipeline execution.

See [Fixed values, runtime inputs, and expressions](/docs/platform/20_References/runtime-inputs.md).

#### Can I evaluate values at run time?

Yes. With expressions, you can use Harness input, output, and execution variables in a setting.

All of these variables represent settings and values in the pipeline before and during execution.

At run time, Harness will replace the variable with the runtime value.

See [Fixed Values, runtime inputs, and expressions](/docs/platform/20_References/runtime-inputs.md).

