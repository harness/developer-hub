---
title: Helm deployments overview
description: High-level view of Harness Helm deployments and Harness' options for users to perform Helm Deployments.
sidebar_position: 1
---


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


## Deploying Helm charts managed by Harness


Here's a summary of the process:

1. Harness fetches the manifests from your Helm repository onto the Harness delegate.
2. Harness unzips the chart and runs a `helm template` over the Kubernetes resources packaged in the Helm chart. 
3. On the same Harness delegate, or a delegate that has access to the target Kubernetes Cluster, Harness will proceed to deploy using the `kubectl apply -f <+kubernetes.resource.yml>`.  
4. After the deployment, Harness will manage and track the deployed Helm chart via the **Release Name**.


## Harness managed Helm charts deep dive

Harness' approach is great for users who are not fully invested into Helm and are not using its advanced features like Helm hooks, subcharts, and Helm dependencies. These users can focus on Helm packaging the Kubernetes resources for you and publishing it to a target source. 

Harness fetch the Helm chart and deploy it via `kubectl apply -f`. This approach gives you granular control on the Kubernetes resources and how they are applied. You can specify which files you wish to skip for deployment, and prioritize which are created before the deployment, etc. 

With more control over the Helm packaged Kubernetes resources, Harness has the luxury of orchestrating a canary deployment and blue green deployment and tracking the resources accordingly through Harness. 

Harness appends canary labels to a canary deployed service. Harness identifies the primary and stage services' Kubernetes objects deployed and manages the labels and selectors so the correct resources receive traffic.

This approach gives Harness further control to version your ConfigMaps and Secrets along with your deployed resources so you get the correct versions with your deployed resources. 

In the event of rollback, because Harness tracks and can control how the files are released, Harness can initiate a rollback based on a ConfigMap version Harness maintains that captures the state of your last successfully deployed service.


### Pros

- Harness can orchestrate the Helm chart to be deployed in a Canary and Blue Green strategy.
- Helm is now focused to package your resources, not deploy your resources. How you deploy and roll out your resources is now sequenced and managed by Harness.
- Versioning: Harness Kubernetes deployments version all objects, such as ConfigMaps and Secrets.
- Rollback: In the event of deployment failure, Harness Kubernetes deployments will roll back to the last successful version via the versioned ConfigMap generated by Harness.


###  Cons

- Helm Hooks are not supported. You will need to split those Helm hooks into jobs.


### Configuration in Harness for this option

1. Create a Harness service in your Harness project.
2. Configure the Kubernetes Deployment Type for the service.
3. Navigate to **Manifest Source** in your service and configure Git, OCI Helm, or HTTP Helm.
4. Ensure the Infrastructure Definition is configured as the Kubernetes Deployment Type.





## Deploying Helm Charts managed by Helm 

In this approach:

1. Harness fetches the manifests from your Helm repository on to the Harness delegate.
2. Harness unzips the chart, runs a `helm template` over the Kubernetes resources packaged in the Helm Chart. 
3. On the same Harness delegate, or a delegate that has access to the target Kubernetes cluster, Harness will proceed to deploy using the `helm install {YOUR_HELM_CHART}` or a `helm upgrade {YOUR HELM CHART}`.  
4. After the deployment, Harness, using the Helm client, will query the deployed instances for tracking.

### Harness Helm charts managed by Helm

This approach is great when you are first moving to Harness. This requires minimal changes to your Helm package and deploy process. Harness will just take your existing Helm chart and deploy it to the target Kubernetes cluster you specify for deployment. 

The more complex Helm charts with hooks, subcharts, and dependency charts are easier to deploy with this approach because you do not need to break down your chart and sequence out the dependency charts first before deploying the main Helm chart.

This approach also works well with the commodity Helm charts because you do not need to make any tweaks to the open source chart, just supply a values.yaml and Harness will perform the Helm fetch and Helm install. 

### Pros 

- Rollback: Harness does not perform rollback. Instead, Harness uses Helm's native rollback functionality. This is great for quickly adopting based of your existing setup.
- Harness will honor the user's pre and post install hooks configured in the Helm chart.


### Cons

- Versioning: Native Helm does not version deployments. 
- No progressive deployment support, no blue green or canary deployment types are supported (coming soon).


### Harness steps

1. Create a Harness service in your Harness project.
2. Configure a **Native Helm Deployment Type** for the service.
3. Navigate to **Manifest Source** in your service and configure Git, OCI Helm, or HTTP Helm.
4. The Harness **Infrastructure Definition** will also be a **Native Helm Deployment**.


## What is Supported in Both Approaches? 

### Optional: Trigger pipelines on new Helm chart published or on a new artifact image defined within the Helm chart.

You can add a trigger to your Harness pipeline that will run the pipeline when the Helm chart or artifact version changes or is published to a repository.

For details, go to:

- [Trigger pipelines on new Helm chart](/docs/platform/Triggers/trigger-pipelines-on-new-helm-chart)
- [Trigger pipelines on a new artifact](/docs/platform/Triggers/trigger-on-a-new-artifact)
- [Triggers](/docs/category/triggers)

### Optional: Helm Chart to Manage Harness Delegates
   
Harness includes a Helm-based Harness delegate but you can use any delegate type for Helm deployments. 

Helm chart delegates are a great way to manage delegates at scale and via automation. The chart remains the same and you simply need to swap out the values.yaml for delegate installation. 

You can parameterize much of the Helm Chart via Go Templating and pass in parameters via the values.yaml. This makes the Helm installation consistent and, depending on the team's requirements, you can pass in a values.yaml to spin up the delegate. 

For steps on Helm delegates, go to [Delegate installation overview](/docs/platform/Delegates/install-delegates/overview).

If you select to build your own delegate and include only those tools needed for Helm deployments, go to [Delegate-required SDKs](/docs/platform/delegates/delegate-reference/delegate-required-sdks/) to see what Kubernetes and Helm-related binaries are required.


### Supported integrations with Helm

For details on supported Helm versions, tooling, limitations, and repositories, go to [Supported CD features and integrations](/docs/continuous-delivery/cd-integrations).


## General Helm Deployment FAQ 

### How can we deploy a specific resource in a helm chart as part of Harness managed Helm rolling deployment?

If it is a Helm deployment managed by Harness, you can use an Apply Step.

You can take a specific file from the manifest and execute it separately from the normal deployment (before or after). To prevent the file from being included in the main part of the deployment, you include `# harness.io/skip-file-for-deploy` at the top of the file.

### How do I run a Helm uninstall after a successful deployment?

To run Helm uninstall manually after a successful deployment, you can leverage the Shell Script step and run the `helm uninstall release-name` command from the delegate onto the cluster. To run the shell script onto the required cluster, you need to specify the Kubernetes cluster credentials for the delegate.

For this use case, within the shell script, you can simply reference credentials as `${HARNESS_KUBE_CONFIG_PATH}`:

`export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH} kubectl get pods -n pod-test`

With this method, even when running the shell script on the delegate host, it can refer to the credentials of the Kubernetes cloud provider used inside the infrastructure definition associated with the workflow.

### Can I override some values in the Helm chart during the deployment of a service in Kubernetes?

Yes, you can override values in the Helm chart during the service deployment in Kubernetes.

### How can I use values files to override Helm chart values during deployment?

You can define your input values in separate files, known as values files. These files can be stored and optionally tracked in Git. Harness allows you to specify these values files in the Harness service definition used during the deployment.

### What is the advantage of using values files over the '--set' option for Helm chart overrides?

Using values files provides a more organized and maintainable way to manage overrides in Helm charts. It is considered a best practice, and it allows you to easily track and version your input values for deployments.

### Does Harness have cache layer for the Helm chart repo index during deployment steps?

Harness uses a caching mechanism to create a cache folder (based on the Harness connector Id) and store the repositories.yaml file.

### How can we access the Helm repo name from the Helm connector?

Harness does not have a direct variable exposed for reading the repo name from the connector. The connector variable is only available in a Harness custom deployment template. 

For normal usage Harness can make an API call to get the connector details and get the repo name from the "helmRepoUrl" attribute.

### Can I use Helm charts from public repositories like Helm Hub with Harness?

Yes, you can use Helm charts from public Helm repositories like Helm Hub. Harness allows you to specify the Helm repository URL and chart version when configuring your deployment.

### Is it possible to use Helm hooks in Harness Helm deployments?

Yes, you can use Helm hooks in Helm deployments managed by Helm. This is available via the **Native Helm** service type. 

Helm hooks allow you to execute specific actions or scripts at different points in the Helm chart's lifecycle, such as before or after installing or upgrading a release. Harness supports the use of Helm hooks as part of your Helm deployment process. 

### What are deployment failed because the release name was invalid errors?

The "invalid release name" error is due to the length of the release name exceeding the maximum limit of 53 characters. 
 
This limitation is imposed by [Helm](https://helm.sh/docs/chart_template_guide/getting_started/#adding-a-simple-template-call). 

To resolve this issue, please ensure that your release name falls within the 53 character range. 

You can achieve this by using the following expression in **Release Name** to shorten the release name: `<+<+INFRA_KEY>.substring(0,7)>`.

