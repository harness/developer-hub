---
title: Helm deployments overview
description: High-level view of Harness Helm deployments and Harness's options for users to perform Helm Deployments.
tags:
   - helm
   - helm-deployment
   - harness-managed-helm
   - native-helm
   - helm-charts
   - canary-deployment
   - blue-green-deployment
sidebar_position: 1
---

Harness supports Helm deployments as part of its Kubernetes swimlane. You can deploy Helm charts and subcharts to your target infrastructure using the common chart and artifact repositories and cloud platforms.

This topic explains Harness-managed Helm and Helm-managed Helm deployments, the advantages and disadvantages of both approaches, and which option is best suited for your requirements. 

## Helm pipeline components

A Helm pipeline uses a Harness **Deploy** stage to deploy your Helm chart and artifact to your target cluster according to your steps.

Let's review the main components of a Harness Helm pipeline.

:::note

For a detailed explanation of Helm deployments, go to [Deploy Helm charts](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts).

:::

<table>
	<tbody>
		<tr>
			<th></th>
			<th>Pipeline component</th>
			<th>Description</th>
		</tr>
		<tr>
			<td>What you want to deploy</td>
			<td>Service</td>
			<td>
            <ul>
               <li>The Helm chart and artifacts for your app.</li>
               <li>Harness connectors for your repositories.</li>
            </ul>
         </td>
		</tr>
		<tr>
			<td>Where you want to deploy</td>
			<td>Environment</td>
			<td>
            <ul>
               <li>The target cluster for your deployment.</li>
            </ul>
         </td>
		</tr>
		<tr>
			<td>How you want to deploy</td>
			<td>Execution steps</td>
			<td>
            <ul>
               <li>A <b>Deploy</b> stage includes the deployment strategy and steps.</li>
               <li>Pick a strategy, and Harness automatically adds the required steps.</li>
               <li>Add custom steps to perform other tasks.</li>
            </ul>
         </td>
		</tr>
	</tbody>
</table>

## Deploying Helm charts managed by Harness

In a Harness-managed Helm deployment, Harness fetches the Helm chart and deploys it using Kubernetes `kubectl apply -f` command. This deployment method is suitable for users who are not fully invested in Helm and are not using its advanced features like Helm hooks, subcharts, and Helm dependencies. Such users can focus on Helm packaging the Kubernetes resources for you and publishing them to a target source. This approach gives you granular control over the Kubernetes resources and their application. You can specify which files you wish to skip for deployment, prioritize which are created before the deployment, and so on. 

With more control over the Helm-packaged Kubernetes resources, Harness has the luxury of orchestrating Canary and Blue Green deployments and tracking the resources accordingly. Harness appends canary labels to a Canary-deployed service. Harness identifies the primary and stage services' Kubernetes objects deployed and manages the labels and selectors so that the correct resources receive traffic. This approach gives Harness further control to version your ConfigMaps and Secrets along with your deployed resources, so you get the correct versions with your deployed resources.

Because Harness tracks and controls how the files are released in the event of rollback, Harness can initiate a rollback based on the ConfigMap version that captures the state of your last successfully deployed service.

Here's a summary of the process:

1. Harness fetches the manifests from your Helm repository to the Harness Delegate.
   <details>
   <summary>Add different types of manifests</summary>

   Here's a tutorial showing you how to add different types of manifests. It also describes how to add Helm charts and multiple-value YAML files in the same repo as the chart or in separate repos.

   <!-- Video:
   https://www.youtube.com/watch?v=Wvr52UKDOJQ-->
   <DocVideo src="https://www.youtube.com/watch?v=Wvr52UKDOJQ" />

   </details>
2. Harness unzips the chart and runs a `helm template` over the Kubernetes resources in the Helm chart.
3. On the same Harness Delegate, or a delegate that has access to the target Kubernetes Cluster, Harness proceeds to deploy the Helm chart using the `kubectl apply -f <+kubernetes.resource.yml>` command.
4. Once deployed, Harness manages and tracks the deployed Helm chart using the **Release Name**.

### Configuring Helm charts managed by Harness

1. Create a [Harness service](/docs/continuous-delivery/get-started/services-and-environments-overview#services) in your Harness project.
2. In service **Configuration**, under **Service Definition** > **Deployment Type**, select **Kubernetes**.
3. In **Manifests**, select **Add Manifest**, navigate to **Manifest Source** in your service, and configure Git, OCI Helm, or HTTP Helm.
4. Ensure that you have selected **Kubernetes** deployment type in your environment **Infrastructure Definition** as well.

For detailed steps on deploying Harness-managed Helm charts, go to [Deploy Helm charts](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts).

### Pros

- Harness can orchestrate the Helm chart deployment using a Canary and Blue Green strategy.
Helm is now focused on packaging your resources, not deploying them. How you deploy and roll out your resources is now sequenced and managed by Harness.
- Versioning: Harness Kubernetes deployments version all objects, such as ConfigMaps and Secrets.
- Rollback: In the event of deployment failure, Harness Kubernetes deployments will roll back to the last successful version via the versioned ConfigMap generated by Harness.

### Cons

- Helm Hooks are not supported. You might want to split the Helm hooks into jobs.

## Deploying Helm charts managed by Helm (Native Helm deployment)

This approach is excellent when you are first moving to Harness. This requires minimal changes to your Helm package and deployment process. Harness takes your Helm chart and deploys it to the target Kubernetes cluster you specify for deployment.

This approach is also suitable if you want to deploy complex Helm charts with hooks, subcharts, and dependency charts because you do not need to break down your chart and sequence out the dependency charts before deploying the main Helm chart.

This approach also works well with the commodity Helm charts because you need not tweak the open source chart. Just supply a values.yaml file, and Harness will perform the Helm fetch and Helm install.

Here's a summary of the process:  

1. Harness fetches the manifests from your Helm repository onto the Harness Delegate.
2. Harness unzips the chart and runs a `helm template` over the Kubernetes resources in the Helm Chart.
3. On the same Harness Delegate, or a delegate that has access to the target Kubernetes cluster, Harness will proceed to deploy using the `helm install {YOUR_HELM_CHART}` or a `helm upgrade {YOUR_HELM__CHART}`.
4. After the deployment, Harness queries the deployed instances for tracking using the Helm client.

For detailed steps on Native Helm deployment, go to [Native Helm deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-quickstart).

### Pros

- Rollback: Harness does not perform rollback. Instead, Harness uses Helm's native rollback functionality. This approach works well if you want to use your existing setup.
- Harness will honor the user's pre- and post-install hooks configured in the Helm chart.

### Cons

- Versioning: Native Helm does not version deployments.
- No progressive deployment support. Also, Blue/Green or Canary deployment types are not supported (coming soon).

### Configuring Native Helm 

1. Create a [Harness service](/docs/continuous-delivery/get-started/services-and-environments-overview#services) in your Harness project.
2. In service **Configuration**, under **Service Definition** > **Deployment Type**, select **Native Helm**.
3. In **Manifests**, select **Add Manifest**, navigate to **Manifest Source** in your service, and configure Git, OCI Helm, or HTTP Helm.
4. Ensure that you have selected **Native Helm** deployment type in your environment **Infrastructure Definition** as well.

## What is supported in both approaches?

### Optional: Trigger pipelines on a new Helm chart published or on a new artifact image defined within the Helm chart

You can add a trigger to your Harness pipeline that will run the pipeline when the Helm chart or artifact version changes or is published to a repository.

For details, go to:

- [Trigger pipelines on new Helm chart](/docs/platform/triggers/trigger-pipelines-on-new-helm-chart)
- [Trigger pipelines on a new artifact](/docs/platform/triggers/trigger-on-a-new-artifact)
- [Triggers](/docs/category/triggers)

### Optional: Helm Chart to Manage Harness Delegates

Harness includes a Helm-based Harness Delegate, but you can use any delegate type for Helm deployments.

Helm chart delegates are a great way to manage delegates at scale and via automation. The chart remains the same; you simply need to swap out the values. Use YAML for delegate installation.

You can parameterize much of the Helm Chart via Go Templating and pass in parameters via the values.yaml. This makes the Helm installation consistent, and, depending on the team's requirements, you can pass in a values.yaml to spin up the delegate.

For steps on Helm delegates, go to [Delegate installation overview](/docs/platform/delegates/install-delegates/overview).

If you select to build your own delegate and include only those tools needed for Helm deployments, go to [Delegate-required SDKs](/docs/platform/delegates/delegate-reference/delegate-required-sdks/) to see what Kubernetes and Helm-related binaries are required.

### Supported integrations with Helm

For details on supported Helm versions, tooling, limitations, and repositories, go to [Supported CD features and integrations](/docs/continuous-delivery/cd-integrations).

## See also

* [CD pipeline basics](/docs/continuous-delivery/get-started/key-concepts)
* [Deploy using Helm Chart](/docs/continuous-delivery/get-started/cd-tutorials/helm-chart)
* [Helm and Native Helm Deployment FAQs](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-deployment-faqs)
  



