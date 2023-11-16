---
title: Helm Deployments Overview
description: High-level view of Harness Helm deployments and Harness' options for users to perform Helm Deployments.
sidebar_position: 1
---

## Introduction

Harness supports Helm deployments as part of its Kubernetes swimlane. You can deploy Helm charts and subcharts to your target infrastructure using all of the common chart and artifact repositories and cloud platforms. 

This topic summarizes Helm support in Harness and provides links to Helm-related topics.

For a quick tutorial, go to [Deploy using Helm Chart](/tutorials/cd-pipelines/kubernetes/helm-chart).

Learn [CD pipeline basics](/docs/continuous-delivery/get-started/key-concepts) before you review Helm deployment basics below.

<details>
<summary>Visual summary</summary>

Here's a quick video showing you how to add different types of manifests. It also describes how to add Helm charts and multiple values YAML files in the same repo as the chart, or in separate repos.


<!-- Video:
https://www.youtube.com/watch?v=Wvr52UKDOJQ-->
<docvideo src="https://www.youtube.com/watch?v=Wvr52UKDOJQ" />


</details>

## Helm pipeline summary

A Helm pipeline uses a Harness **Deploy** stage to deploy your Helm chart and artifact to your target cluster according to your steps.

Let's quickly review the main components of a Harness Helm pipeline.

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
               <li>Pick a strategy and Harness automatically adds the required steps.</li>
               <li>Add custom steps to perform other tasks.</li>
            </ul>
         </td>
		</tr>
	</tbody>
</table>


## Deploying Helm Charts managed by Harness


In this approach:

1. Harness will fetch the manifests from your Helm Repository on to the Harness Delegate.
2. Harness will unzip the chart, run a `helm template` over the kubernetes resources packaged in the Helm Chart 
3. On the same Harness Delegate, or a delegate that has access to the target Kubernetes Cluster, Harness will proceed to deploy using the `kubectl apply -f <+kubernetes.resource.yml>.  
4. After the deployment, Harness will manage and track the deployed Helm Chart via the Release Name.


## Deep Dive into the Helm Charts managed By Harness

This approach is great for users who are not fully invested into Helm and are not using it's advanced features like Helm Hooks, Sub Charts, and Helm Dependencies. User's can focus on Helm packaging the Kubernetes Resources for you and publishing it to a target source. Harness will go and fetch the Helm Chart and Deploy via `kubectl apply -f`. This approach gives you granular control on the Kubernetes Resources and how they are applied. You can specify which files you wish to skip for deployment, prioritize to be created first before the deployment, etc. 

Because we have more control over the Helm packaged kubernetes resources we have the luxury of orchestrating a Canary Deployment and Blue Green Deployment and track the resources accordingly through Harness. We append Canary labels to a canary deployed service. We can identify the primary and stage services kubernetes objects deployed and manage the labels and selectors so the correct resources receive traffic.

This approach gives Harness further control to version your configmaps and secrets along with your deployed resources so you get the correct version configmap and secret with your deployed resources. In the event of rollback because we track and can control how the files are released we can initiate a rollback based of a configmap version we maintain that captures the state of your last successfully deployed service.


### Pros

- Harness can orchestrate the Helm Chart to be deployed in a Canary and Blue Green Fashion
- Helm is now focused to package your resources, not deploy your resources. How you deploy and roll out your resources is now sequenced and managed by Harness.
- Versioning: Harness Kubernetes deployments version all objects, such as ConfigMaps and Secrets.
- Rollback: In the event of deployment failure, Harness Kubernetes deployments will roll back to the last successful version via the versioned ConfigMap generated by Harness.


###  Cons

- Helm Hooks are not supported, you will need to split those Helm hooks into jobs


### Configuration in Harness for this option

1. Create a Service in your project
2. Configure a Kubernetes Deployment Type for the Service
3. Navigate to Manifest Source in your Service and configure Git, OCI Helm or HTTP Helm.
4. Infrastructure Definition will be configured as Kubernetes Deployment Type





## Deploying Helm Charts managed by Helm 


In this approach:

1. Harness will fetch the manifests from your Helm Repository on to the Harness Delegate.
2. Harness will unzip the chart, run a `helm template` over the kubernetes resources packaged in the Helm Chart 
3. On the same Harness Delegate, or a delegate that has access to the target Kubernetes Cluster, Harness will proceed to deploy using the `helm install {YOUR_HELM_CHART}` or a `helm upgrade` {YOUR HELM CHART}.  
4. After the deployment, Harness, using the Helm Client, will query the deployed instances to track.

### Deep Dive into the Helm charts managed by Harness

This approach is great when you are first moving to Harness. This requires minimal changes to your Helm package and Deploy process. Harness will just take your existing Helm Chart and deploy it to the target Kubernetes cluster you specify for Deployment. 

The more complex Helm Charts with hooks, subcharts and dependency charts are easier to deploy with this approach because you do not need to break down your chart and sequence out the dependency charts first before deploying the main Helm Chart.

It also works well with the commodity Helm Charts because you do not need to make any tweaks to the open source chart just supply a values.yaml and Harness will perform the Helm Fetch and Helm install. 

### Pros 

- Rollback: Harness does not perform rollback. Instead, Harness uses Helm's native rollback functionality. This is great for quickly adopting based of your existing setup.
- Harness will honor the user's Pre-Install and Post Install Hooks configured in the Helm Chart


### Cons

- Versioning: Native Helm does not version deployments. 
- No Progressive Deployment Support, No Blue-Green or Canary Deployment Types Supported (Coming Soon)


### Configuration in Harness for this option

1. Create a Service in your project
2. Configure a Native Helm Deployment Type for the Service
3. Navigate to Manifest Source in your Service and configure Git, OCI Helm or HTTP Helm
4. Infrastructure Definition will also be Native Helm Deployment



## What is Supported in Both Approaches? 

### Optional: Trigger pipelines on new Helm Chart Published or on an Artifact Image defined within the Helm Chart

You can add a trigger to your pipeline that will run the pipeline when the Helm chart or artifact version changes or published to a repository.

For details, go to:

- [Trigger pipelines on new Helm chart](/docs/platform/Triggers/trigger-pipelines-on-new-helm-chart)
- [Trigger pipelines on a new artifact](/docs/platform/Triggers/trigger-on-a-new-artifact)
- [Triggers](/docs/category/triggers)

### Optional: Helm Chart to Manage Harness Delegates
   
Harness includes a Helm-based Harness delegate but you can use any delegate type for Helm deployments. Helm Chart Delegates are a great way to manage delegates at scale and via Automation. The Chart remains the same and the user just needs to swap out the values.yaml for Delegate installation. You can parameterize via Go Templating a fair amount of the Helm Chart and pass in parameters via the values.yaml. This makes the helm installation consistent and depending on the team's requirements you can pass in a values.yaml to spin up the delegate. 

For steps on Helm delegates, go to [Delegate installation overview](/docs/platform/Delegates/install-delegates/overview).

If you select to build your own delegate and include only those tools needed for Helm deployments, go to [Delegate-required SDKs](/docs/platform/delegates/delegate-reference/delegate-required-sdks/) to see what Kubernetes and Helm-related binaries are required.


### Supported integrations with Helm

For details on supported Helm versions, tooling, limitations, and repositories, go to [Supported CD features and integrations](/docs/continuous-delivery/cd-integrations).


## General Helm Deployment FAQ 

*How can we deploy a specific resource in a helm chart as part of Harness managed Helm rolling deployment?*

If it is a Helm Deployment managed by Harness, you can use an Apply Step

You can take a specific file from the manifest and execute it separately (before or after) the normal deployment. To prevent the file from being included in the normal part of the deployment, you would include this # harness.io/skip-file-for-deploy at the top of the file.


*How do I run helm uninstall after a successful deployment?*

To run Helm uninstall manually after a successful deployment. you can leverage the shell script step and run the helm uninstall release-name command from the delegate onto the cluster. To run the shell script onto the required cluster, we need to specify the k8s cluster credentials to delegate.

For this use case within the shell script, you can simply reference credentials as `${HARNESS_KUBE_CONFIG_PATH}`

`export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH} kubectl get pods -n pod-test`

With this even when running the shell script on the delegate host, it can refer to the credentials of the K8s cloud provider which is used inside the infrastructure definition associated with the workflow.

*Can I override some values in the Helm chart during the deployment of a service in Kubernetes?*

Yes, you can override values in the Helm chart during the service deployment in Kubernetes.

*How can I use values files to override Helm chart values during deployment?*

You can define your input values in separate files, known as values files. These files can be stored and optionally tracked in Git. Harness allows you to specify these values files in your service definition, which will be used during the deployment.

*What is the advantage of using values files over '--set' option for Helm chart overrides?*

Using values files provides a more organized and maintainable way to manage overrides in Helm charts. It is considered a best practice, and it allows you to easily track and version your input values for deployments.

*Does Harness have cache layer for the Helm chart repo index during deployment steps?*

We have a caching mechanism where we create a cache folder (based on connectorID) and store the repositories.yaml file there.

*How can we access helm repo name from the helm connector?*

We do not have a direct variable exposed for reading the repo name from the connector. The connector variable is only available in custom deployment template. For normal usage we can make an api call to get the connector details and get the repo name from the "helmRepoUrl" attribute.

*Can I use Helm Charts from public repositories like Helm Hub with Harness Next-Gen?*

You can use Helm Charts from public Helm repositories like Helm Hub. Harness Next-Gen allows you to specify the Helm repository URL and Chart version when configuring your deployment.


*Is it possible to use Helm hooks in Harness Helm deployments?*

Yes, you can use Helm hooks in Helm Deployments managed by Helm. This is available via the Native Helm Service Type. Helm hooks allow you to execute specific actions or scripts at different points in the Helm chart's lifecycle, such as before or after installing or upgrading a release. Harness supports the use of Helm hooks as part of your Helm deployment process. 

